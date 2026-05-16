export default function GovernancePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm uppercase tracking-[0.4em] text-protocol-cyan">DAO citizenship</p>
      <h1 className="mt-4 text-4xl font-bold text-white">Governance foundation</h1>
      <p className="mt-4 text-lg leading-8 text-slate-300">The initial DAO uses OpenZeppelin Governor with an IVotes token. Future milestones should gate proposals and voting through verified-human, soulbound, and proof-of-life freshness checks while preserving privacy with zero-knowledge membership proofs.</p>
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-slate-300">Proposal creation and voting modules will be connected after governance token and identity-gated policy decisions are finalized.</div>
    </div>
  );
}
