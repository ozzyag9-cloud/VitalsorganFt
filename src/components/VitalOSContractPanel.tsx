import React from 'react';
import { CheckCircle2, Coins, ExternalLink, KeyRound, RadioTower, Rocket, ShieldCheck, Wallet } from 'lucide-react';
import { apiFetch } from '../lib/api';

type ProviderStatus = {
  id: string;
  name: string;
  envKey: string;
  configured: boolean;
  keyVisibility: string;
};

type DeploymentManifest = {
  contract: string;
  source: string;
  targetChain: { chainId: number; name: string };
  constructorArgs: Record<string, string>;
  firstMint: Record<string, string>;
  requiredEnv: string[];
  privacyNotice: string;
};

type ContractReceipt = {
  contractAddress?: string;
  transactionHash?: string | null;
  chainName?: string;
  metadataUri?: string;
};

const shortValue = (value?: string | null) => {
  if (!value) return '—';
  if (value.length <= 18) return value;
  return `${value.slice(0, 10)}…${value.slice(-6)}`;
};

export function VitalOSContractPanel() {
  const [providers, setProviders] = React.useState<ProviderStatus[]>([]);
  const [manifest, setManifest] = React.useState<DeploymentManifest | null>(null);
  const [receipt, setReceipt] = React.useState<ContractReceipt | null>(null);
  const [status, setStatus] = React.useState('Ready to connect Amplify to the VitalOS API backend.');
  const [isBusy, setIsBusy] = React.useState(false);

  const loadProviderStatus = async () => {
    setIsBusy(true);
    setStatus('Checking backend API keys and provider readiness...');

    try {
      const res = await apiFetch('/api/vitalos/agent-providers');
      if (!res.ok) throw new Error('Provider endpoint unavailable. Deploy the Express API on App Runner, ECS, EC2, or Lambda and set VITE_API_URL in Amplify.');
      const data = await res.json();
      setProviders(data.providers || []);
      setStatus('Provider readiness loaded from backend. Secrets remain server-side.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to check provider readiness.');
    } finally {
      setIsBusy(false);
    }
  };

  const loadManifest = async () => {
    setIsBusy(true);
    setStatus('Loading smart-contract deployment manifest...');

    try {
      const res = await apiFetch('/api/deployment/manifest');
      if (!res.ok) throw new Error('Deployment manifest unavailable. Connect the Express API backend first.');
      const data = await res.json();
      setManifest(data);
      setStatus('Manifest loaded. Constructor args and first mint payload are ready.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to load deployment manifest.');
    } finally {
      setIsBusy(false);
    }
  };

  const simulateContractTrigger = async () => {
    setIsBusy(true);
    setStatus('Triggering backend contract simulation and first-mint receipt...');

    try {
      const ethereum = (window as any).ethereum;
      let walletAddress = '0x7f2a00000000000000000000000000000088cc11';

      if (ethereum?.request) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' }) as string[];
        walletAddress = accounts?.[0] || walletAddress;
      }

      const res = await apiFetch('/api/deployment/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, web3Domain: 'vitalos.aws' })
      });

      if (!res.ok) throw new Error('Contract simulation failed. Check the backend API logs.');
      const data = await res.json();
      setReceipt(data.receipt);
      setStatus('Contract trigger complete. The backend produced a deployment/mint receipt.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to trigger contract simulation.');
    } finally {
      setIsBusy(false);
    }
  };

  React.useEffect(() => {
    loadProviderStatus();
  }, []);

  const configuredCount = providers.filter((provider) => provider.configured).length;

  return (
    <section className="vitalos-window p-5 md:p-7 space-y-6" id="vitalos-contract">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-100">
            <RadioTower className="h-3.5 w-3.5" />
            Backend + contract bridge
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter text-white">AWS activation panel</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
            Amplify secrets only affect backend/server runtimes. This panel checks the API backend, verifies provider keys are visible server-side, loads the dNFT deployment manifest, and triggers the current contract simulation flow.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-relaxed text-slate-300 xl:max-w-xl">
          <p className="font-black uppercase tracking-widest text-white mb-2">Status</p>
          {status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <button onClick={loadProviderStatus} disabled={isBusy} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-left hover:bg-white/[0.06] transition disabled:opacity-50">
          <KeyRound className="mb-4 h-6 w-6 text-cyan-200" />
          <p className="text-sm font-black uppercase tracking-widest text-white">Check API Keys</p>
          <p className="mt-2 text-xs text-slate-500">{providers.length ? `${configuredCount}/${providers.length} providers configured` : 'Load provider readiness'}</p>
        </button>
        <button onClick={loadManifest} disabled={isBusy} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-left hover:bg-white/[0.06] transition disabled:opacity-50">
          <ShieldCheck className="mb-4 h-6 w-6 text-emerald-200" />
          <p className="text-sm font-black uppercase tracking-widest text-white">Load Manifest</p>
          <p className="mt-2 text-xs text-slate-500">Read constructor args and first mint payload</p>
        </button>
        <button onClick={simulateContractTrigger} disabled={isBusy} className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5 text-left hover:bg-cyan-300/20 transition disabled:opacity-50">
          <Rocket className="mb-4 h-6 w-6 text-cyan-100" />
          <p className="text-sm font-black uppercase tracking-widest text-white">Trigger Contract</p>
          <p className="mt-2 text-xs text-cyan-100/70">Run backend deployment/mint simulation</p>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-white">Provider readiness</h3>
            <span className="text-[10px] text-cyan-200 font-mono">server-only</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(providers.length ? providers : [
              { id: 'openai', name: 'OpenAI', envKey: 'OPENAI_API_KEY', configured: false, keyVisibility: 'server-only' },
              { id: 'claude', name: 'Claude', envKey: 'ANTHROPIC_API_KEY', configured: false, keyVisibility: 'server-only' },
              { id: 'gemini', name: 'Gemini', envKey: 'GEMINI_API_KEY', configured: false, keyVisibility: 'server-only' },
              { id: 'grok', name: 'Grok', envKey: 'XAI_API_KEY', configured: false, keyVisibility: 'server-only' },
            ]).map((provider) => (
              <div key={provider.id} className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-widest text-white">{provider.name}</span>
                  {provider.configured ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Coins className="h-4 w-4 text-amber-300" />}
                </div>
                <p className="mt-2 text-[10px] font-mono text-slate-500 break-all">{provider.envKey}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-white">Smart contract payload</h3>
            <ExternalLink className="h-4 w-4 text-cyan-200" />
          </div>
          <div className="space-y-3 text-xs text-slate-400">
            <p><span className="text-slate-200 font-black uppercase">Contract:</span> {manifest?.contract || 'Load manifest'}</p>
            <p><span className="text-slate-200 font-black uppercase">Chain:</span> {manifest?.targetChain?.name || receipt?.chainName || '—'}</p>
            <p><span className="text-slate-200 font-black uppercase">Oracle:</span> {shortValue(manifest?.constructorArgs?.initialOracle)}</p>
            <p><span className="text-slate-200 font-black uppercase">Commitment:</span> {shortValue(manifest?.firstMint?.biometricCommitment)}</p>
            <p><span className="text-slate-200 font-black uppercase">Receipt:</span> {shortValue(receipt?.transactionHash)}</p>
            <p><span className="text-slate-200 font-black uppercase">Address:</span> {shortValue(receipt?.contractAddress)}</p>
          </div>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3 text-[10px] leading-relaxed text-amber-100">
            Real on-chain writes require a wallet/provider and deployed contract address. This button currently exercises the repo's backend receipt flow so Amplify + API wiring is testable now.
          </div>
        </div>
      </div>
    </section>
  );
}
