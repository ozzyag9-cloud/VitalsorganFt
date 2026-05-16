import { StatusCard } from '@/components/StatusCard';

export default function ProofOfLifePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold text-white">Proof-of-life dashboard</h1>
      <p className="mt-3 text-slate-300">Submit liveness heartbeats, review validator confirmations, and monitor eligibility windows.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <StatusCard title="Last heartbeat" value="—" detail="Connect a wallet to read your most recent liveness proof." />
        <StatusCard title="Window" value="7 days" detail="The initial deployment script configures a one-week heartbeat window." tone="violet" />
        <StatusCard title="Eligibility" value="Unknown" detail="Eligibility requires verified identity and current liveness." tone="green" />
      </div>
    </div>
  );
}
