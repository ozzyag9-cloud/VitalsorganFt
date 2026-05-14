<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Vitals Dynamic NFT Platform

Vitals is a deployment-ready React/Express platform for a living biometric dynamic NFT certificate. The app presents a biometric certificate UI, exposes ERC-721 metadata and presale endpoints, and includes a standalone Solidity contract that can mint and evolve an NFT from oracle-verified wearable state. The recommended launch path is Base Sepolia testnet first, then Base mainnet after presale funding, audit, and treasury readiness.
Vitals is a deployment-ready React/Express platform for a living biometric dynamic NFT certificate. The app presents a biometric certificate UI, exposes ERC-721 metadata endpoints, and includes a standalone Solidity contract that can mint and evolve an NFT from oracle-verified wearable state.

## What changed for blockchain deployment

- `contracts/VitalsDynamicNFT.sol` is a standalone ERC-721-compatible contract with no package imports. It mints a certificate to a holder wallet and allows an oracle to evolve the NFT as health state changes.
- The contract stores only `bytes32` commitments for biometrics and holder details. Raw biometric data, health records, and identity documents must remain encrypted/off-chain.
- `server.ts` exposes metadata and deployment endpoints:
  - `GET /api/metadata/1` — ERC-721 metadata for the living certificate.
  - `GET /api/certificate/1` — certificate payload with holder and commitment fields.
  - `GET /api/deployment/manifest` — constructor args and first-mint inputs.
  - `POST /api/deployment/simulate` — records a local deployment receipt for demos.
- The Deployment Suite UI displays chain, contract, metadata URI, and biometric commitment details.

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and set your values.
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`.

## Build and validate

```bash
npm run lint
npm run build
```

## Deploying the dynamic NFT contract

The repository does not require a specific Solidity toolchain. Compile `contracts/VitalsDynamicNFT.sol` with Solidity `0.8.20` or newer using Foundry, Hardhat, Remix, or your preferred deployer.

Required environment values for a production deployer:

```bash
RPC_URL="https://your-chain-rpc"
DEPLOYER_PRIVATE_KEY="0x..."
VITALS_ORACLE_ADDRESS="0x..."
APP_URL="https://your-vitals-platform.example"
```

Recommended flow:

1. Start the platform and request `GET /api/deployment/manifest`.
2. Deploy `VitalsDynamicNFT` with:
   - `initialOracle`
   - `initialContractURI`
3. Call `mintLivingCertificate` from the holder wallet with:
   - `organType`
   - `biometricCommitment`
   - `holderProfileHash`
   - `certificateId`
   - `encryptedMetadataURI`
4. Configure marketplaces to read `/api/metadata/1` or pin the metadata JSON to IPFS.
5. Have the oracle call `evolveBiometrics` whenever verified wearable data changes.

## Privacy and safety note

A public blockchain is not an appropriate place for raw biometrics or personally identifying medical details. Vitals uses cryptographic commitments and encrypted off-chain metadata so the NFT can prove continuity without disclosing private health data.
