import { WalletButton } from '@/components/WalletButton';

export default function ConnectPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.4em] text-protocol-cyan">Wallet connection</p>
      <h1 className="mt-4 text-4xl font-bold text-white">Connect your wallet to begin identity verification.</h1>
      <p className="mt-4 text-slate-300">RainbowKit and wagmi are configured for Polygon Amoy. Production verification should use wallet signatures plus validator or ZK-backed evidence.</p>
      <div className="mt-8"><WalletButton /></div>
    </div>
  );
}
