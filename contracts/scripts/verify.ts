import { run } from 'hardhat';

const contracts = [
  { name: 'IdentityRegistry', address: process.env.IDENTITY_REGISTRY_ADDRESS, args: [process.env.DEPLOYER_ADDRESS] },
  {
    name: 'SoulboundIdentity',
    address: process.env.SOULBOUND_IDENTITY_ADDRESS,
    args: [process.env.IDENTITY_REGISTRY_ADDRESS, process.env.DEPLOYER_ADDRESS],
  },
  {
    name: 'ProofOfLife',
    address: process.env.PROOF_OF_LIFE_ADDRESS,
    args: [process.env.IDENTITY_REGISTRY_ADDRESS, 604800, process.env.DEPLOYER_ADDRESS],
  },
  { name: 'AttestationRegistry', address: process.env.ATTESTATION_REGISTRY_ADDRESS, args: [process.env.DEPLOYER_ADDRESS] },
];

async function main() {
  for (const contract of contracts) {
    if (!contract.address || !contract.args.every(Boolean)) {
      console.log(`Skipping ${contract.name}: missing address or constructor arguments.`);
      continue;
    }
    await run('verify:verify', { address: contract.address, constructorArguments: contract.args });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
