import assert from 'node:assert/strict';
import { buildLifeBlock, hashJson } from '../src/consensus/blockBuilder.js';
import type { LifeTransaction, ValidatorProfile } from '../src/types.js';

const validators: ValidatorProfile[] = Array.from({ length: 5 }, (_, index) => ({
  operator: hashJson(`validator-${index}`),
  stake: 1_000n,
  domains: ['welfare'],
  reputationScore: 75,
  publicKey: hashJson(`validator-key-${index}`),
}));

const transaction: LifeTransaction = {
  id: hashJson('tx'),
  type: 'VALIDATE_BENEFIT_ELIGIBILITY',
  domain: 'welfare',
  sender: hashJson('agency'),
  payloadHash: hashJson('encrypted-case-file'),
  attestations: [],
  nonce: 1,
  fee: 10_000n,
  createdAt: 1,
};

const block = buildLifeBlock({
  height: 1,
  previousHash: hashJson('genesis'),
  proposer: validators[0],
  validators,
  transactions: [transaction],
  timestamp: 1,
});

assert.equal(block.transactions.length, 1);
assert.equal(block.incentives.proposerReward, 2_500n);
assert.equal(block.incentives.validatorRewardPool, 5_500n);
assert.equal(block.incentives.publicGoodsTreasury, 1_500n);
console.log('chain tests passed');
