# Proof of Life Chain Blueprint

## Executive thesis

Proof of Life Protocol should evolve from an application protocol into a sovereign public-good network: either a standalone blockchain or an Ethereum/Polygon-aligned Layer 3. The chain's purpose is not to publish personal data. Its purpose is to order, validate, and incentivize privacy-preserving proofs about real human status, rights, eligibility, education, health, welfare, voting, security, and civic participation.

The long-term goal is a trust-minimized civic infrastructure layer that governments, DAOs, NGOs, schools, hospitals, and citizens can audit and use without surrendering personal sovereignty.

## Chain modes

### Mode A: Layer 3 rollup

A Layer 3 is the recommended first production path because it inherits security and bridge infrastructure from a stronger settlement layer while giving the protocol its own execution rules.

- Settlement: Polygon, Ethereum L2, or another EVM settlement layer.
- Data availability: modular DA provider or settlement-layer calldata depending on cost and sovereignty needs.
- Execution: Proof of Life virtual machine or EVM-compatible appchain modules.
- Finality: validator committee plus settlement-layer challenge or validity proofs.
- Upgrade path: governed protocol upgrades with public timelocks and emergency privacy pauses.

### Mode B: standalone chain

A standalone chain gives maximum sovereignty but requires more security, validator operations, bridging, and regulatory work.

- Consensus: proof-of-stake with proof-of-life-aware validator eligibility.
- Validators: institutions, professionals, citizen validators, NGOs, and technical operators.
- Blocks: generated from valid life, health, education, welfare, citizenship, voting, and governance transactions.
- Incentives: validator rewards, slashing, public-goods treasury, and domain-specific service fees.

## What generates blocks

A block is generated when a validator proposer packages transactions that have enough domain-specific attestations and validator quorum. Examples:

- proof-of-life heartbeat;
- proof-of-health commitment;
- education credential issuance;
- welfare eligibility validation;
- humanitarian aid eligibility;
- voting eligibility proof;
- birth, civil-status, or citizenship attestation where lawful;
- DAO governance signal;
- domain policy update.

Raw human data never belongs inside the block. Blocks should contain commitments, nullifiers, issuer signatures, proof hashes, validity windows, and protocol metadata.

## Incentive model

The chain should reward useful validation while discouraging surveillance and fraud.

- Validators earn rewards for validating legitimate domain transactions.
- Proposers earn a smaller reward for ordering valid transactions.
- A public-goods treasury funds audits, open-source development, education, legal review, and emergency response.
- Slashing reserves compensate victims and penalize malicious validators.
- Domain councils may tune fees for public-good cases such as healthcare, welfare, disaster relief, and education.

## Governance model: decentralized and institutionally supervised

The protocol should be decentralized in execution and auditability, but institutionally supervised for lawful public-sector use. This is not a single executive override. It is a checks-and-balances design:

1. DAO token holders and verified citizens govern protocol parameters.
2. Expert councils propose domain standards.
3. Public institutions can operate validators or issue attestations under transparent rules.
4. Courts, auditors, ombuds offices, and appeal boards remain compatible with off-chain legal due process.
5. Emergency powers must be narrow, logged, time-limited, and reviewable.

## Civic and government use cases

- **Health:** proof-of-health credentials, wearable attestations, public-health eligibility, and privacy-preserving care coordination.
- **Education:** verifiable credentials, skills passports, apprenticeships, continuing education, and fraud-resistant certificates.
- **Welfare:** eligibility validation, duplicate-claim prevention, benefit routing, and appealable fraud controls.
- **Security:** access rights, background-check attestations, disaster-response credentials, and sensitive-site authorization.
- **Voting:** voter eligibility, one-human constraints, privacy-preserving ballots, and auditable election participation.
- **Citizenship:** lawful civil registry proofs, birth registration, residency attestations, and constitutional eligibility checks.

Citizenship and migration modules require jurisdiction-specific legal review and must not be deployed as generalized exclusion tools. They must respect constitutions, treaties, equal protection, non-discrimination, and appeal rights.

## Mauritius pilot framing

Mauritius can be framed as a high-trust national pilot for digital public infrastructure:

1. Start with voluntary education and professional credentials.
2. Add healthcare and proof-of-life attestations for consent-based public services.
3. Pilot welfare duplicate-claim prevention with human appeal paths.
4. Add DAO-style citizen consultation for policy proposals.
5. Publish open audits and privacy impact assessments before any sensitive national deployment.

## Near-term engineering path

1. Keep the EVM contracts as settlement and compatibility modules.
2. Build the chain simulator and domain policy engine.
3. Add validator staking, slashing, and reward accounting.
4. Add ZK nullifier proofs for uniqueness without identity disclosure.
5. Add institution-grade issuer onboarding and revocation registries.
6. Add governance timelocks, emergency review, and public audit dashboards.
