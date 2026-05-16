import { ethers } from 'hardhat';

const ONE_WEEK_SECONDS = 7 * 24 * 60 * 60;

async function main() {
  const [deployer] = await ethers.getSigners();
  const governanceVotesToken = process.env.GOVERNANCE_VOTES_TOKEN ?? ethers.ZeroAddress;

  console.log(`Deploying Proof of Life Protocol contracts with ${deployer.address}`);

  const identityRegistry = await ethers.deployContract('IdentityRegistry', [deployer.address]);
  await identityRegistry.waitForDeployment();

  const soulboundIdentity = await ethers.deployContract('SoulboundIdentity', [
    await identityRegistry.getAddress(),
    deployer.address,
  ]);
  await soulboundIdentity.waitForDeployment();

  const proofOfLife = await ethers.deployContract('ProofOfLife', [
    await identityRegistry.getAddress(),
    ONE_WEEK_SECONDS,
    deployer.address,
  ]);
  await proofOfLife.waitForDeployment();

  const attestationRegistry = await ethers.deployContract('AttestationRegistry', [deployer.address]);
  await attestationRegistry.waitForDeployment();

  console.log('IdentityRegistry:', await identityRegistry.getAddress());
  console.log('SoulboundIdentity:', await soulboundIdentity.getAddress());
  console.log('ProofOfLife:', await proofOfLife.getAddress());
  console.log('AttestationRegistry:', await attestationRegistry.getAddress());

  if (governanceVotesToken !== ethers.ZeroAddress) {
    const governanceDAO = await ethers.deployContract('GovernanceDAO', [governanceVotesToken, 1, 45_818, 0, 4]);
    await governanceDAO.waitForDeployment();
    console.log('GovernanceDAO:', await governanceDAO.getAddress());
  } else {
    console.log('GovernanceDAO skipped: set GOVERNANCE_VOTES_TOKEN to deploy the DAO.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
