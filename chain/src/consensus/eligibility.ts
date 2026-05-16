import type { DomainId, LifeTransaction, ValidatorProfile } from '../types.js';

export interface EligibilityDecision {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
}

/**
 * Determines whether a validator may validate a transaction for a domain.
 * This is a policy engine placeholder for future stake, proof-of-life, reputation,
 * jurisdictional, and zero-knowledge checks.
 */
export function evaluateValidatorEligibility(validator: ValidatorProfile, transaction: LifeTransaction): EligibilityDecision {
  const reasons: string[] = [];
  if (validator.stake <= 0n) reasons.push('validator has no active stake');
  if (!validator.domains.includes(transaction.domain)) reasons.push(`validator is not approved for ${transaction.domain}`);
  if (validator.reputationScore < 50) reasons.push('validator reputation is below the minimum threshold');
  return { eligible: reasons.length === 0, reasons };
}

/**
 * Domain quorum is intentionally explicit so governments, DAOs, and auditors can
 * inspect how sensitive areas such as health, welfare, voting, and citizenship are governed.
 */
export function domainQuorum(domain: DomainId): number {
  const quorumByDomain: Record<DomainId, number> = {
    identity: 3,
    health: 5,
    education: 3,
    welfare: 5,
    security: 7,
    voting: 7,
    citizenship: 9,
    humanitarian_aid: 5,
  };
  return quorumByDomain[domain];
}
