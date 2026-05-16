import type { DomainId } from '../types.js';

export interface ExpertCouncilSeat {
  readonly title: string;
  readonly mandate: string;
  readonly appointmentModel: 'dao-election' | 'public-institution' | 'professional-body' | 'citizen-jury' | 'hybrid';
}

export interface DomainCouncil {
  readonly domain: DomainId;
  readonly mission: string;
  readonly seats: readonly ExpertCouncilSeat[];
  readonly requiredSafeguards: readonly string[];
}

export const domainCouncils: readonly DomainCouncil[] = [
  {
    domain: 'identity',
    mission: 'Define privacy-preserving identity, DID, recovery, and anti-Sybil standards.',
    seats: [
      { title: 'Decentralized identity architect', mandate: 'Own DID and credential interoperability.', appointmentModel: 'dao-election' },
      { title: 'Civil liberties counsel', mandate: 'Prevent surveillance and discriminatory identity use.', appointmentModel: 'professional-body' },
      { title: 'Registrar operations lead', mandate: 'Audit onboarding and recovery processes.', appointmentModel: 'hybrid' },
    ],
    requiredSafeguards: ['data minimization', 'right to appeal', 'guardian recovery checks'],
  },
  {
    domain: 'health',
    mission: 'Specify proof-of-health attestations without exposing medical records or biometrics.',
    seats: [
      { title: 'Physician or public-health expert', mandate: 'Validate medical safety requirements.', appointmentModel: 'professional-body' },
      { title: 'Healthcare privacy officer', mandate: 'Ensure HIPAA/GDPR-grade privacy controls.', appointmentModel: 'professional-body' },
      { title: 'Wearable device security engineer', mandate: 'Assess sensor and device attestation risk.', appointmentModel: 'dao-election' },
    ],
    requiredSafeguards: ['no raw medical data on-chain', 'explicit consent', 'clinical review'],
  },
  {
    domain: 'education',
    mission: 'Modernize credentials, skills, apprenticeships, and lifelong learning records.',
    seats: [
      { title: 'Education reform scholar', mandate: 'Design outcomes-based credential standards.', appointmentModel: 'professional-body' },
      { title: 'Vocational training leader', mandate: 'Represent practical and technical education.', appointmentModel: 'citizen-jury' },
      { title: 'Credential interoperability engineer', mandate: 'Integrate verifiable credentials and schemas.', appointmentModel: 'dao-election' },
    ],
    requiredSafeguards: ['portable learner records', 'anti-forgery checks', 'non-discriminatory access'],
  },
  {
    domain: 'welfare',
    mission: 'Validate benefit eligibility through transparent, privacy-preserving, appealable workflows.',
    seats: [
      { title: 'Social protection policy expert', mandate: 'Map lawful eligibility and humane safeguards.', appointmentModel: 'public-institution' },
      { title: 'Fraud analytics specialist', mandate: 'Design fraud-resistant but explainable risk controls.', appointmentModel: 'hybrid' },
      { title: 'Beneficiary advocate', mandate: 'Protect due process and access for vulnerable people.', appointmentModel: 'citizen-jury' },
    ],
    requiredSafeguards: ['human appeal path', 'explainable decisions', 'anti-exclusion audits'],
  },
  {
    domain: 'citizenship',
    mission: 'Model lawful citizenship and residency attestations under constitutional oversight.',
    seats: [
      { title: 'Constitutional law expert', mandate: 'Ensure policies comply with national constitutions and treaties.', appointmentModel: 'professional-body' },
      { title: 'Parliamentary or congressional liaison', mandate: 'Translate legal requirements into auditable protocol rules.', appointmentModel: 'public-institution' },
      { title: 'Human rights observer', mandate: 'Prevent statelessness, discrimination, and political abuse.', appointmentModel: 'hybrid' },
    ],
    requiredSafeguards: ['constitutional review', 'non-discrimination', 'judicial appeal compatibility'],
  },
];
