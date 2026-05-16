import { VerificationBadge } from './VerificationBadge';

export function IdentityCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Self-sovereign DID</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">did:pol:pending-wallet-connection</h2>
          <p className="mt-3 max-w-2xl text-slate-300">Your public dashboard displays only commitments, proof freshness, and credential status. Sensitive evidence remains encrypted off-chain.</p>
        </div>
        <VerificationBadge verified={false} />
      </div>
    </section>
  );
}
