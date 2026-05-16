# Architecture

## Protocol layers

1. **Identity layer** — `IdentityRegistry` stores wallet verification status, DID mappings, hashed identity commitments, validator roles, and future recovery guardian preferences.
2. **Credential layer** — `SoulboundIdentity` mints one non-transferable ERC-721 identity credential per verified human.
3. **Liveness layer** — `ProofOfLife` records self-submitted and validator-attested liveness heartbeats with configurable eligibility windows.
4. **Attestation layer** — `AttestationRegistry` stores typed attestations from trusted issuers using proof hashes and metadata references.
5. **Governance layer** — `GovernanceDAO` starts with OpenZeppelin Governor and an external IVotes token, then evolves toward proof-of-human voting controls.
6. **Proof of Life Chain / L3 layer** — `chain/` models blocks, domain-specific validator quorum, incentives, public-goods funding, expert councils, and policy guardrails for a future standalone chain or Layer 3.
7. **Application layer** — Next.js and Express expose human-readable dashboards, validator intake APIs, and integration points.
8. **ZK layer** — `zk/` is prepared for Semaphore, Circom, Noir, and zk-SNARK verifier artifacts.

## Contract relationships

- Validators register humans in `IdentityRegistry`.
- `SoulboundIdentity` checks `IdentityRegistry.isVerified` before minting.
- `ProofOfLife` checks `IdentityRegistry.isVerified` before recording heartbeats or validator attestations.
- `AttestationRegistry` accepts credentials only from trusted issuers.
- `GovernanceDAO` is independent in the first release and can later consume identity and liveness modules through custom counting, proposal, or eligibility extensions.

## Privacy model

The protocol should never store raw biometrics, medical records, identity documents, or sensitive demographic data on-chain. On-chain records are limited to:

- hashed identity commitments;
- DIDs and public metadata URIs;
- verification booleans;
- timestamps;
- proof hashes;
- issuer addresses;
- typed attestation categories.

Private data should remain encrypted off-chain, user-controlled where possible, and disclosed selectively through consent, verifiable credentials, or zero-knowledge proofs.

## Attestation model

Trusted issuers submit typed attestations that include a `proofHash`, issuer address, timestamp, type enum, revocation flag, and optional metadata URI. Healthcare providers, schools, aid agencies, and validators can each receive issuer roles with least privilege.

## Validator model

Validators are role-based in the initial contracts. The model is intentionally modular so centralized validator assumptions can be reduced over time through multi-validator thresholds, decentralized oracle networks, stake/slashing, reputation, and ZK proof verification.

## DAO governance

The starter DAO uses standard OpenZeppelin Governor primitives. Future governance should add:

- verified-human proposal gates;
- current proof-of-life voting eligibility;
- one-human-one-vote or quadratic policies;
- treasury timelocks;
- private membership proofs;
- anti-collusion and coercion-resistant voting research.

## Future ZK integrations

- **Semaphore** — private group membership and signal proofs for DAO citizenship.
- **Circom** — custom circuits for credential predicates and nullifier-based uniqueness.
- **Noir** — developer-friendly proof programs for liveness and identity predicates.
- **zk-SNARKs** — generic verifier and proving key artifact management.


## Proof of Life Chain and domain validation

The chain model treats proof-of-life and proof-of-health as transaction categories that can generate blocks when enough eligible validators attest to domain-specific validity. Health, education, welfare, security, voting, citizenship, and humanitarian-aid modules each require explicit quorum, safeguards, and expert review. The current implementation is a TypeScript devnet simulator rather than a production consensus client, which keeps the policy and economics testable while the team decides whether to launch as a Layer 3 rollup or a standalone chain.

## Expert councils and public-sector adoption

The protocol should be governed by a DAO plus domain councils. Councils include constitutional/legal experts, education reform specialists, welfare and social protection experts, healthcare privacy professionals, security and election-integrity specialists, token economists, government officials, citizen advocates, and auditors. Their role is to draft standards and risk assessments that become transparent governance proposals, not to secretly control citizens.
