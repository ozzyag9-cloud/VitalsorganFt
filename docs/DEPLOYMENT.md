# Deployment

## Polygon Amoy

1. Copy `.env.example` to `.env`.
2. Set `POLYGON_AMOY_RPC_URL`, `DEPLOYER_PRIVATE_KEY`, and `POLYGONSCAN_API_KEY`.
3. Run `npm run build:contracts`.
4. Run `npm run deploy:amoy --workspace contracts`.
5. Export deployed addresses for verification and frontend configuration.
6. Run `npm run verify:amoy --workspace contracts`.

## Chain agnosticism

The contracts avoid chain-specific dependencies. To deploy on another EVM chain, add a Hardhat network entry, configure RPC and explorer settings, and reuse the same scripts.
