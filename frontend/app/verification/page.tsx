import { VerificationBadge } from '@/components/VerificationBadge';

export default function VerificationPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold text-white">Verification status</h1>
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <VerificationBadge verified={false} />
        <h2 className="mt-6 text-2xl font-semibold text-white">Validator review required</h2>
        <p className="mt-3 text-slate-300">This page will connect to registry reads, validator attestations, and future ZK proof verification. No raw biometric, healthcare, or document data should be shown here.</p>
      </div>
    </div>
  );
}
