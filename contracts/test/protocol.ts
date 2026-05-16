import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Proof of Life Protocol', function () {
  async function deployFixture() {
    const [admin, human, validator, outsider] = await ethers.getSigners();
    const registry = await ethers.deployContract('IdentityRegistry', [admin.address]);
    const soulbound = await ethers.deployContract('SoulboundIdentity', [await registry.getAddress(), admin.address]);
    const proofOfLife = await ethers.deployContract('ProofOfLife', [await registry.getAddress(), 604800, admin.address]);
    const attestations = await ethers.deployContract('AttestationRegistry', [admin.address]);

    await registry.grantRole(await registry.VALIDATOR_ROLE(), validator.address);
    await proofOfLife.grantRole(await proofOfLife.LIVENESS_VALIDATOR_ROLE(), validator.address);
    await attestations.grantRole(await attestations.TRUSTED_ISSUER_ROLE(), validator.address);

    return { admin, human, validator, outsider, registry, soulbound, proofOfLife, attestations };
  }

  it('registers a human and mints one soulbound identity', async function () {
    const { human, outsider, registry, soulbound } = await deployFixture();
    const commitment = ethers.keccak256(ethers.toUtf8Bytes('human-commitment'));

    await registry.registerHuman(human.address, commitment, 'did:pol:human-1');
    await expect(soulbound.mint(human.address, 'ipfs://metadata')).to.emit(soulbound, 'SoulboundIdentityMinted');
    await expect(soulbound.mint(human.address, 'ipfs://metadata-2')).to.be.revertedWithCustomError(
      soulbound,
      'IdentityAlreadyMinted',
    );
    await expect(soulbound.mint(outsider.address, 'ipfs://metadata')).to.be.revertedWithCustomError(
      soulbound,
      'HumanNotVerified',
    );
  });

  it('blocks soulbound transfers', async function () {
    const { human, outsider, registry, soulbound } = await deployFixture();
    await registry.registerHuman(human.address, ethers.keccak256(ethers.toUtf8Bytes('human-transfer')), 'did:pol:human-2');
    await soulbound.mint(human.address, 'ipfs://metadata');

    await expect(soulbound.connect(human).transferFrom(human.address, outsider.address, 1)).to.be.revertedWithCustomError(
      soulbound,
      'SoulboundTransferBlocked',
    );
  });

  it('records self-submitted and validator-attested liveness', async function () {
    const { human, validator, registry, proofOfLife } = await deployFixture();
    await registry.registerHuman(human.address, ethers.keccak256(ethers.toUtf8Bytes('human-live')), 'did:pol:human-3');

    const selfEvidence = ethers.keccak256(ethers.toUtf8Bytes('self-proof'));
    await expect(proofOfLife.connect(human).submitHeartbeat(selfEvidence)).to.emit(proofOfLife, 'LifeProofSubmitted');
    expect(await proofOfLife.isEligible(human.address)).to.equal(true);

    const validatorEvidence = ethers.keccak256(ethers.toUtf8Bytes('validator-proof'));
    await expect(proofOfLife.connect(validator).validatorAttest(human.address, validatorEvidence)).to.emit(
      proofOfLife,
      'LifeProofAttested',
    );
  });

  it('stores typed attestations from trusted issuers only', async function () {
    const { human, validator, outsider, attestations } = await deployFixture();
    const proofHash = ethers.keccak256(ethers.toUtf8Bytes('healthcare-attestation'));

    await expect(attestations.connect(outsider).issueAttestation(human.address, proofHash, 2, 'ipfs://encrypted')).to.be.reverted;
    await expect(attestations.connect(validator).issueAttestation(human.address, proofHash, 2, 'ipfs://encrypted')).to.emit(
      attestations,
      'AttestationIssued',
    );

    const ids = await attestations.getAttestationsBySubject(human.address);
    expect(ids.length).to.equal(1);
  });
});
