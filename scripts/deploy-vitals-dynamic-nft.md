# Vitals Dynamic NFT Deployment Runbook

This repository now includes a standalone Solidity contract at `contracts/VitalsDynamicNFT.sol` for a living biometric dynamic NFT certificate.

## Privacy-first deployment rule

Never publish raw biometrics, legal identity documents, health records, or unencrypted holder details to a public chain. The contract accepts:

- `biometricCommitment`: a bytes32 hash commitment to the encrypted biometric packet.
- `holderProfileHash`: a bytes32 hash commitment to the holder profile/certificate packet.
- `encryptedMetadataURI`: an HTTPS or IPFS URI for encrypted off-chain metadata.

## Required environment variables

```bash
CHAIN_ID="84532"
CHAIN_NAME="Base Sepolia"
RPC_URL="https://sepolia.base.org"
BLOCK_EXPLORER_URL="https://sepolia.basescan.org"
APP_URL="https://vitalsdynft.fly.dev"
VITALS_ORACLE_ADDRESS="0x..."
TREASURY_ADDRESS="0x..."
DEPLOYER_PRIVATE_KEY="0x..."
```

## Deployment flow

1. Use Base Sepolia for the testnet presale. The contract is EVM/Solidity-native, so Base is the fastest launch path; keep Solana as a later bridge/channel rather than delaying launch.
2. Compile `contracts/VitalsDynamicNFT.sol` with your Solidity toolchain (`solc`, Foundry, Hardhat, or Remix) using Solidity `0.8.20` or newer.
3. Deploy with constructor arguments:
   - `initialOracle`: the oracle signer allowed to evolve biometric state.
   - `initialContractURI`: `${APP_URL}/api/metadata/contract` or your collection-level metadata URI.
4. Call `mintLivingCertificate` with the holder wallet connected:
   - `organType`
   - `biometricCommitment`
   - `holderProfileHash`
   - `certificateId`
   - `encryptedMetadataURI`
5. Configure the app with the deployed contract address and chain details.
6. Use the oracle to call `evolveBiometrics` whenever verified wearable data changes the certificate state.
7. Treat any private key pasted into chat, logs, or tickets as compromised. Replace it before transferring funds or launching mainnet.

## Local API helpers

- `GET /api/deployment/status` returns readiness checks without exposing secrets.
- `GET /api/presale` returns marketing copy, tier pricing, supply, and Base Sepolia launch details.
- `GET /api/deployment/manifest` returns constructor arguments and first-mint commitments.
- `POST /api/deployment/simulate` records a deployment receipt in local state for UI/demo verification.
- `GET /api/metadata/1` returns ERC-721 metadata with certificate, holder, chain, and privacy fields.
