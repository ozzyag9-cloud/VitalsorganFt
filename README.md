# Proof of Life Protocol

Proof of Life Protocol is a privacy-preserving decentralized identity and liveness infrastructure for proof of human existence, proof of liveness, DAO citizenship, fraud-resistant verification, healthcare attestations, educational credentials, humanitarian aid verification, welfare fraud reduction, and AI-resistant governance.

The repository is a production-grade starter monorepo with Solidity contracts, a Next.js app, an Express API, protocol documentation, and zero-knowledge integration placeholders.

## Architecture overview

- `contracts/` — Hardhat project using Solidity `0.8.24`, OpenZeppelin Contracts, TypeChain, and Ethers v6.
- `chain/` — standalone chain / Layer 3 protocol simulator for blocks, validator eligibility, incentives, expert councils, and policy guardrails.
- `frontend/` — Next.js + TypeScript + TailwindCSS interface with RainbowKit, wagmi, and viem.
- `backend/` — Express API with PostgreSQL and Redis connection layers.
- `zk/` — future proof system workspace for Semaphore, Circom, Noir, and generic zk-SNARK artifacts.
- `governance/`, `oracles/`, `mobile/` — integration workspaces for protocol expansion.
- `docs/` — architecture, security, government adoption, expert council, and case-study documentation.

## Install dependencies

```bash
npm install
```

## Environment setup

Copy the example environment file and fill in production values before deployments:

```bash
cp .env.example .env
```

Key variables:

- `POLYGON_AMOY_RPC_URL` — Polygon Amoy RPC endpoint.
- `DEPLOYER_PRIVATE_KEY` — deployment wallet private key.
- `POLYGONSCAN_API_KEY` — verification API key.
- `GOVERNANCE_VOTES_TOKEN` — IVotes-compatible governance token address.
- `DATABASE_URL` — PostgreSQL connection string.
- `REDIS_URL` — Redis connection string.
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — WalletConnect project ID for RainbowKit.
- `NEXT_PUBLIC_*_ADDRESS` — deployed contract addresses consumed by the frontend.

## Local development

Run each layer independently:

```bash
npm run dev:frontend
npm run dev:backend
npm run build:contracts
npm run dev:chain
```

The frontend defaults to `http://localhost:3000`. The backend defaults to `http://localhost:4000`.

## Proof of Life Chain / L3

The `chain/` workspace models the future standalone chain or Layer 3. It includes typed life transactions, domain-specific validator quorum, block building, incentive allocation, expert council definitions, and constitutional guardrails.

```bash
npm run dev:chain
npm run build:chain
```

The first version is a deterministic devnet simulator so protocol economics, policy rules, and validator design can mature before a production consensus client is selected.

## Contracts

Compile and test:

```bash
npm run build:contracts
npm test
```

Deploy to Polygon Amoy after setting `.env`:

```bash
npm run deploy:amoy --workspace contracts
```

Verify deployed contracts after exporting deployed addresses and constructor arguments:

```bash
npm run verify:amoy --workspace contracts
```

## Backend API

Start the API:

```bash
npm run dev:backend
```

Available starter endpoints:

- `GET /` — API identity.
- `GET /health` — API, PostgreSQL, and Redis health check.
- `POST /api/attestations/validator` — validator attestation intake placeholder.

## Frontend

Start the app:

```bash
npm run dev:frontend
```

Pages included:

- Landing page.
- Wallet connection page.
- Identity dashboard.
- Verification status page.
- Proof-of-life dashboard.
- DAO governance placeholder.

## Deployment guide

1. Configure `.env` with Polygon Amoy RPC, deployer key, and explorer API key.
2. Compile contracts with `npm run build:contracts`.
3. Run tests with `npm test`.
4. Deploy contracts with `npm run deploy:amoy --workspace contracts`.
5. Copy deployed addresses into frontend and backend environment variables.
6. Verify contracts with `npm run verify:amoy --workspace contracts`.
7. Deploy the frontend and backend to the preferred cloud environment.

## Roadmap

1. Add identity-gated frontend reads and writes using generated ABIs.
2. Implement validator service authorization, queueing, and on-chain relay policies.
3. Introduce encrypted off-chain credential storage and DID document resolution.
4. Add Semaphore membership proofs for private DAO citizenship.
5. Add Circom and Noir circuits for liveness and credential predicates.
6. Complete Governor treasury and identity-aware voting modules.
7. Expand the Proof of Life Chain devnet into a rollup or appchain prototype.
8. Form expert councils for constitutional law, education, welfare, health, security, economics, and government adoption.
9. Prepare the Mauritius pilot package with legal memo, privacy impact assessment, and phased public-sector sandbox.
10. Commission external smart contract, backend, chain, ZK, policy, and privacy audits.
