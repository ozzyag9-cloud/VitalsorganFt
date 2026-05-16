import { IdentityCard } from '@/components/IdentityCard';
import { StatusCard } from '@/components/StatusCard';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold text-white">Identity dashboard</h1>
      <p className="mt-3 text-slate-300">Track DID status, soulbound identity readiness, and public protocol commitments.</p>
      <div className="mt-8"><IdentityCard /></div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <StatusCard title="Soulbound ID" value="Not minted" detail="Mint becomes available after registry verification." />
        <StatusCard title="DID mapping" value="Pending" detail="No decentralized identifier has been linked yet." tone="violet" />
        <StatusCard title="Recovery" value="Prepared" detail="Guardian scaffolding is included in the identity registry." tone="green" />
      </div>
    </div>
  );
}
