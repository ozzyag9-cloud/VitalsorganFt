import { buildLifeBlock, hashJson } from '../consensus/blockBuilder.js';
import type { LifeTransaction, ValidatorProfile } from '../types.js';

const validators: ValidatorProfile[] = Array.from({ length: 9 }, (_, index) => ({
  operator: hashJson(`validator-${index}`),
  stake: 10_000n,
  domains: ['identity', 'health', 'welfare', 'citizenship', 'voting'],
  reputationScore: 80 + index,
  jurisdiction: index < 5 ? 'MU' : 'GLOBAL',
  publicKey: hashJson(`validator-public-key-${index}`),
}));

const transactions: LifeTransaction[] = [
  {
    id: hashJson('tx-1'),
    type: 'SUBMIT_LIFE_PROOF',
    domain: 'identity',
    sender: hashJson('human-wallet-1'),
    payloadHash: hashJson('encrypted-life-proof-reference'),
    attestations: [],
    nonce: 1,
    fee: 1_000n,
    createdAt: Date.now(),
  },
  {
    id: hashJson('tx-2'),
    type: 'VALIDATE_BENEFIT_ELIGIBILITY',
    domain: 'welfare',
    sender: hashJson('agency-relayer-1'),
    payloadHash: hashJson('encrypted-benefit-eligibility-reference'),
    attestations: [],
    nonce: 1,
    fee: 2_500n,
    createdAt: Date.now(),
  },
];

const block = buildLifeBlock({
  height: 1,
  previousHash: hashJson('genesis'),
  proposer: validators[0],
  validators,
  transactions,
});

console.log(JSON.stringify(block, (_key, value) => (typeof value === 'bigint' ? value.toString() : value), 2));
