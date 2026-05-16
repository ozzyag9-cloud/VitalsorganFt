import { createHash } from 'node:crypto';
import { calculateBlockIncentives } from '../economics/incentives.js';
import { domainQuorum, evaluateValidatorEligibility } from './eligibility.js';
import type { Hex, LifeBlock, LifeTransaction, ValidatorProfile } from '../types.js';

export interface BuildBlockInput {
  readonly height: number;
  readonly previousHash: Hex;
  readonly proposer: ValidatorProfile;
  readonly validators: readonly ValidatorProfile[];
  readonly transactions: readonly LifeTransaction[];
  readonly timestamp?: number;
}

export function buildLifeBlock(input: BuildBlockInput): LifeBlock {
  const validatedTransactions = input.transactions.filter((transaction) => {
    const eligibleValidators = input.validators.filter((validator) => evaluateValidatorEligibility(validator, transaction).eligible);
    return eligibleValidators.length >= domainQuorum(transaction.domain);
  });

  const attestationsRoot = hashJson(validatedTransactions.flatMap((transaction) => transaction.attestations));
  const stateRoot = hashJson(validatedTransactions.map((transaction) => [transaction.id, transaction.payloadHash]));

  return {
    header: {
      height: input.height,
      previousHash: input.previousHash,
      proposer: input.proposer.operator,
      stateRoot,
      attestationsRoot,
      timestamp: input.timestamp ?? Date.now(),
    },
    transactions: validatedTransactions,
    validatorSignatures: input.validators.map((validator) => signaturePlaceholder(validator.operator, stateRoot)),
    incentives: calculateBlockIncentives(validatedTransactions),
  };
}

export function hashJson(value: unknown): Hex {
  return `0x${createHash('sha256').update(JSON.stringify(value, bigintReplacer)).digest('hex')}`;
}

function signaturePlaceholder(operator: Hex, stateRoot: Hex): Hex {
  return hashJson({ operator, stateRoot, purpose: 'devnet-signature-placeholder' });
}

function bigintReplacer(_key: string, value: unknown) {
  return typeof value === 'bigint' ? value.toString() : value;
}
