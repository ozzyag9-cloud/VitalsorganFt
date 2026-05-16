import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-verify';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { config as loadEnv } from 'dotenv';
import type { HardhatUserConfig } from 'hardhat/config';

loadEnv({ path: '../.env' });
loadEnv();

const amoyRpcUrl = process.env.POLYGON_AMOY_RPC_URL ?? 'https://rpc-amoy.polygon.technology';
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
const accounts = deployerPrivateKey && !deployerPrivateKey.endsWith('0000') ? [deployerPrivateKey] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true,
    },
  },
  networks: {
    hardhat: { chainId: 31337 },
    polygonAmoy: {
      url: amoyRpcUrl,
      chainId: 80002,
      accounts,
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY ?? '',
    },
    customChains: [
      {
        network: 'polygonAmoy',
        chainId: 80002,
        urls: {
          apiURL: 'https://api-amoy.polygonscan.com/api',
          browserURL: 'https://amoy.polygonscan.com',
        },
      },
    ],
  },
  typechain: { outDir: 'typechain-types', target: 'ethers-v6' },
  gasReporter: { enabled: process.env.REPORT_GAS === 'true', currency: 'USD' },
};

export default config;
