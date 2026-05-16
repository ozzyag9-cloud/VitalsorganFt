import Link from 'next/link';
import { StatusCard } from '@/components/StatusCard';

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-protocol-cyan">Decentralized human verification</p>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-7xl">Privacy-first proof of human life.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Proof of Life Protocol combines self-sovereign identity, soulbound credentials, validator attestations, and future zero-knowledge proofs to enable fraud-resistant DAO citizenship, healthcare credentials, aid delivery, and AI-resistant governance.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/connect" className="rounded-full bg-protocol-cyan px-6 py-3 font-semibold text-slate-950 hover:bg-white">Connect wallet</Link>
            <Link href="/dashboard" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white hover:border-protocol-cyan hover:text-protocol-cyan">View dashboard</Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-protocol-cyan/15 to-protocol-violet/15 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Protocol layers</p>
          <ul className="mt-6 space-y-4 text-slate-200">
            {['Identity registry', 'Soulbound citizenship', 'Liveness heartbeats', 'Typed attestations', 'DAO governance', 'ZK-ready privacy layer'].map((item) => <li key={item} className="rounded-2xl bg-white/5 px-4 py-3">{item}</li>)}
          </ul>
        </div>
      </section>
      <section className="mt-20 grid gap-6 md:grid-cols-3">
        <StatusCard title="Privacy" value="Commitments" detail="On-chain state stores hashes, timestamps, and status only." />
        <StatusCard title="Target chain" value="Amoy" detail="Polygon Amoy first, with chain-agnostic contract boundaries." tone="violet" />
        <StatusCard title="Future ZK" value="Ready" detail="Folder architecture prepared for Semaphore, Circom, Noir, and SNARKs." tone="green" />
      </section>
    </div>
  );
}
