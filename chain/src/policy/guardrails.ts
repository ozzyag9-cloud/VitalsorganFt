import type { DomainId } from '../types.js';

export interface PolicyGuardrail {
  readonly domain: DomainId | 'all';
  readonly rule: string;
  readonly rationale: string;
}

export const constitutionalGuardrails: readonly PolicyGuardrail[] = [
  {
    domain: 'all',
    rule: 'The protocol stores commitments, attestations, and eligibility proofs; it must not store raw biometric, medical, education, welfare, or citizenship records on-chain.',
    rationale: 'Public ledgers are permanent and globally replicated, so human data must remain private and consent-governed.',
  },
  {
    domain: 'welfare',
    rule: 'Automated welfare decisions must include an appeal workflow, human review, and transparent reason codes.',
    rationale: 'Fraud reduction must not become wrongful exclusion of legitimate beneficiaries.',
  },
  {
    domain: 'citizenship',
    rule: 'Citizenship and migration-related modules require jurisdiction-specific legal review before activation.',
    rationale: 'Nationality, residency, and birthright citizenship are constitutional and human-rights matters, not purely technical settings.',
  },
  {
    domain: 'voting',
    rule: 'Voting modules must support coercion resistance, eligibility audits, and privacy-preserving one-human constraints.',
    rationale: 'Democratic legitimacy depends on secrecy, eligibility, auditability, and protection from capture.',
  },
];
