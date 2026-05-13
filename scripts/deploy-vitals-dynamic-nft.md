# Vitals Dynamic NFT Deployment Runbook

This repository now includes a standalone Solidity contract at `contracts/VitalsDynamicNFT.sol` for a living biometric dynamic NFT certificate.

## Privacy-first deployment rule

Never publish raw biometrics, legal identity documents, health records, or unencrypted holder details to a public chain. The contract accepts:

- `biometricCommitment`: a bytes32 hash commitment to the encrypted biometric packet.
- `holderProfileHash`: a bytes32 hash commitment to the holder profile/certificate packet.
- `encryptedMetadataURI`: an HTTPS or IPFS URI for encrypted off-chain metadata.

## Required environment variables

```bash
RPC_URL="https://your-chain-rpc"
DEPLOYER_PRIVATE_KEY="0x..."
VITALS_ORACLE_ADDRESS="0x..."
APP_URL="https://your-vitals-platform.example"
```

## Deployment flow

1. Compile `contracts/VitalsDynamicNFT.sol` with your Solidity toolchain (`solc`, Foundry, Hardhat, or Remix) using Solidity `0.8.20` or newer.
2. Deploy with constructor arguments:
   - `initialOracle`: the oracle signer allowed to evolve biometric state.
   - `initialContractURI`: `${APP_URL}/api/metadata/contract` or your collection-level metadata URI.
3. Call `mintLivingCertificate` with the holder wallet connected:
   - `organType`
   - `biometricCommitment`
   - `holderProfileHash`
   - `certificateId`
   - `encryptedMetadataURI`
4. Configure the app with the deployed contract address and chain details.
5. Use the oracle to call `evolveBiometrics` whenever verified wearable data changes the certificate state.

## Local API helpers

- `GET /api/deployment/manifest` returns constructor arguments and first-mint commitments.
- `POST /api/deployment/simulate` records a deployment receipt in local state for UI/demo verification.
- `GET /api/metadata/1` returns ERC-721 metadata with certificate, holder, chain, and privacy fields.
