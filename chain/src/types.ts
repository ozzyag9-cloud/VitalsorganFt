/**
 * Core protocol primitives for a future standalone Proof of Life Chain or L3.
 * The implementation deliberately models commitments and attestations, not raw human data.
 */
export type Hex = `0x${string}`;

export type DomainId =
  | 'identity'
  | 'health'
  | 'education'
  | 'welfare'
  | 'security'
  | 'voting'
  | 'citizenship'
  | 'humanitarian_aid';

export type TransactionType =
  | 'REGISTER_IDENTITY_COMMITMENT'
  | 'SUBMIT_LIFE_PROOF'
  | 'SUBMIT_HEALTH_PROOF'
  | 'ISSUE_ATTESTATION'
  | 'VALIDATE_BENEFIT_ELIGIBILITY'
  | 'CAST_GOVERNANCE_SIGNAL'
  | 'UPDATE_DOMAIN_POLICY';

export interface AttestationEnvelope {
  readonly subjectCommitment: Hex;
  readonly issuer: Hex;
  readonly domain: DomainId;
  readonly proofHash: Hex;
  readonly nullifier?: Hex;
  readonly issuedAt: number;
  readonly expiresAt?: number;
}

export interface LifeTransaction {
  readonly id: Hex;
  readonly type: TransactionType;
  readonly domain: DomainId;
  readonly sender: Hex;
  readonly payloadHash: Hex;
  readonly attestations: readonly AttestationEnvelope[];
  readonly nonce: number;
  readonly fee: bigint;
  readonly createdAt: number;
}

export interface ValidatorProfile {
  readonly operator: Hex;
  readonly stake: bigint;
  readonly domains: readonly DomainId[];
  readonly reputationScore: number;
  readonly jurisdiction?: string;
  readonly publicKey: Hex;
}

export interface LifeBlockHeader {
  readonly height: number;
  readonly previousHash: Hex;
  readonly proposer: Hex;
  readonly stateRoot: Hex;
  readonly attestationsRoot: Hex;
  readonly timestamp: number;
}

export interface LifeBlock {
  readonly header: LifeBlockHeader;
  readonly transactions: readonly LifeTransaction[];
  readonly validatorSignatures: readonly Hex[];
  readonly incentives: BlockIncentiveSummary;
}

export interface BlockIncentiveSummary {
  readonly proposerReward: bigint;
  readonly validatorRewardPool: bigint;
  readonly publicGoodsTreasury: bigint;
  readonly slashingReserve: bigint;
}
