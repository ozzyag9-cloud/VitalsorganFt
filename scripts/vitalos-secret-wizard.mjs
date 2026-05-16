#!/usr/bin/env node
import fs from 'node:fs';
import readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (question, fallback = '') => new Promise((resolve) => {
  rl.question(`${question}${fallback ? ` (${fallback})` : ''}: `, (answer) => resolve(answer.trim() || fallback));
});

const askSecret = (question) => new Promise((resolve) => {
  const stdin = process.stdin;
  const stdout = process.stdout;
  stdout.write(`${question}: `);
  let value = '';
  const onData = (char) => {
    char = char.toString();
    if (char === '\n' || char === '\r' || char === '\u0004') {
      stdin.setRawMode?.(false);
      stdin.pause();
      stdin.removeListener('data', onData);
      stdout.write('\n');
      resolve(value.trim());
      return;
    }
    if (char === '\u0003') process.exit(1);
    if (char === '\b' || char === '\u007f') {
      value = value.slice(0, -1);
      return;
    }
    value += char;
    stdout.write('*');
  };
  stdin.resume();
  stdin.setRawMode?.(true);
  stdin.on('data', onData);
});

const quote = (value) => JSON.stringify(value || '');

console.log('\nVitalOS AWS secret/env wizard');
console.log('This writes local .env files only. Do not commit them; .gitignore already excludes .env* files.\n');

const appUrl = await ask('Amplify frontend URL / APP_URL', 'https://your-amplify-domain.amplifyapp.com');
const apiUrl = await ask('VitalOS backend API base / VITE_API_URL', 'https://your-api-domain.example.com/api');
const corsOrigin = await ask('Backend CORS_ORIGIN', appUrl);
const rpcUrl = await ask('Base Sepolia RPC_URL', 'https://sepolia.base.org');
const oracleAddress = await ask('VITALS_ORACLE_ADDRESS', '0x0000000000000000000000000000000000000000');
const treasuryAddress = await ask('TREASURY_ADDRESS', '0x0000000000000000000000000000000000000000');

const gemini = await askSecret('GEMINI_API_KEY');
const anthropic = await askSecret('ANTHROPIC_API_KEY');
const openai = await askSecret('OPENAI_API_KEY');
const deepcode = await askSecret('DEEPCODE_API_KEY');
const xai = await askSecret('XAI_API_KEY / Grok');
const deployer = await askSecret('DEPLOYER_PRIVATE_KEY for testnet deploys only');

rl.close();

const frontendEnv = `APP_URL=${quote(appUrl)}\nVITE_API_URL=${quote(apiUrl)}\n`;
const backendEnv = `NODE_ENV="production"\nPORT="8080"\nAPP_URL=${quote(appUrl)}\nCORS_ORIGIN=${quote(corsOrigin)}\nVITE_API_URL=${quote(apiUrl)}\n\nCHAIN_ID="84532"\nCHAIN_NAME="Base Sepolia"\nRPC_URL=${quote(rpcUrl)}\nBLOCK_EXPLORER_URL="https://sepolia.basescan.org"\nVITALS_CONTRACT_ADDRESS="0x0000000000000000000000000000000000000000"\nVITALS_ORACLE_ADDRESS=${quote(oracleAddress)}\nTREASURY_ADDRESS=${quote(treasuryAddress)}\nDEPLOYER_PRIVATE_KEY=${quote(deployer)}\n\nGEMINI_API_KEY=${quote(gemini)}\nANTHROPIC_API_KEY=${quote(anthropic)}\nOPENAI_API_KEY=${quote(openai)}\nDEEPCODE_API_KEY=${quote(deepcode)}\nXAI_API_KEY=${quote(xai)}\n`;

fs.writeFileSync('.env.vitalos.frontend', frontendEnv, { mode: 0o600 });
fs.writeFileSync('.env.vitalos.backend', backendEnv, { mode: 0o600 });

console.log('\nCreated:');
console.log('  .env.vitalos.frontend  -> use for Amplify public frontend env vars');
console.log('  .env.vitalos.backend   -> use for App Runner/ECS/EC2 backend runtime env vars');
console.log('\nNext commands:');
console.log('  npm run lint');
console.log('  npm run build');
console.log('\nAmplify frontend needs only these values:');
console.log(frontendEnv);
console.log('Backend runtime needs the values in .env.vitalos.backend. Keep that file private.');
