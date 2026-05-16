# Security

## Security philosophy

Proof of Life Protocol must protect human dignity, privacy, and safety before optimizing for growth. The default design posture is minimum disclosure, least privilege, defense in depth, and auditability.

## Attack surface considerations

- Sybil registration by malicious validators.
- Validator key compromise.
- DID takeover or wallet loss.
- Replay of old liveness evidence.
- Metadata deanonymization through public URIs.
- Correlation attacks across attestations.
- Governance capture by plutocratic or fake-human voting power.
- Backend relayer abuse and queue poisoning.
- Oracle manipulation from wearable or mobile integrations.

## Privacy principles

- Never place raw biometrics, healthcare data, documents, or private liveness artifacts on-chain.
- Prefer commitments, nullifiers, selective disclosure, and encrypted off-chain references.
- Separate identity, attestation, and governance contexts to reduce linkability.
- Make consent explicit for every disclosure pathway.
- Design future ZK proofs so validators can verify claims without seeing source evidence.

## Smart contract security checklist

- Use OpenZeppelin primitives for roles, tokens, and governance.
- Keep role administration explicit and minimal.
- Emit events for all state-changing protocol actions.
- Use custom errors for auditable revert behavior.
- Keep identity and liveness state compact.
- Treat upgradeability as a migration design until proxy governance is fully specified.
- Write unit tests for access control, uniqueness, soulbound restrictions, heartbeat windows, and revocation.
- Run static analysis and coverage before audit.

## Audit requirements

Before mainnet deployment, commission independent reviews covering:

- Solidity contracts and deployment scripts;
- validator and issuer operational security;
- frontend wallet transaction safety;
- backend API authentication and rate limiting;
- privacy threat model and ZK circuit soundness;
- governance and treasury controls.
