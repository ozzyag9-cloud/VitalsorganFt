import React from 'react';
import { Activity, Bot, CheckCircle2, FileJson, Lock, Mic, PlayCircle, Shield, Terminal, Wrench } from 'lucide-react';

type VitalOSApp = {
  id: string;
  name: string;
  prompt: string;
  status: string;
  riskLevel: string;
  createdAt: string;
  permissions: string[];
  screens: string[];
  automations: string[];
  agents: string[];
};

type VitalOSCapability = {
  id: string;
  label: string;
  domain: string;
  webAccess: string;
  nativeAccess: string;
  status: string;
};

type VitalOSPhase = {
  id: string;
  title: string;
  progress: number;
  deliverables: string[];
};

type VitalOSBlueprint = {
  capabilities: VitalOSCapability[];
  phases: VitalOSPhase[];
  generatedApps: VitalOSApp[];
  safeBuildPath: string[];
};

const fallbackBlueprint: VitalOSBlueprint = {
  capabilities: [
    { id: 'camera', label: 'Camera', domain: 'imaging', webAccess: 'prompted', nativeAccess: 'HAL camera provider', status: 'web-ready' },
    { id: 'microphone', label: 'Microphone', domain: 'audio', webAccess: 'prompted', nativeAccess: 'AudioFlinger / HAL', status: 'web-ready' },
    { id: 'gnss', label: 'GPS / GNSS', domain: 'location', webAccess: 'prompted', nativeAccess: 'GNSS HAL', status: 'web-ready' },
    { id: 'bluetooth', label: 'Bluetooth', domain: 'radio', webAccess: 'web bluetooth where supported', nativeAccess: 'Bluetooth stack', status: 'prototype' },
  ],
  phases: [
    { id: 'phase-1', title: 'Amplify Web Shell', progress: 70, deliverables: ['Static PWA deploy', 'Fullscreen shell', 'HTTPS hardware prompts'] },
    { id: 'phase-2', title: 'Agent API Backend', progress: 35, deliverables: ['Express/ECS backend', 'Provider adapters', 'Persistent generated apps'] },
    { id: 'phase-3', title: 'Native Device Agent', progress: 10, deliverables: ['AOSP image', 'Device HAL services', 'Owner vault'] },
  ],
  generatedApps: [
    {
      id: 'static-breath-guardian',
      name: 'Breath Guardian',
      prompt: 'Static fallback app for Amplify frontend-only deployments.',
      status: 'local-preview',
      riskLevel: 'medium',
      createdAt: new Date().toISOString(),
      permissions: ['microphone', 'gnss', 'notifications'],
      screens: ['Today', 'Risk Map', 'Audit Log'],
      automations: ['Prompt before protected sensor use', 'Keep logs local by default'],
      agents: ['claude', 'openai', 'gemini', 'deepcode', 'grok'],
    }
  ],
  safeBuildPath: [
    'Amplify can host the PWA shell, but /api endpoints need an Express container, Lambda, or ECS backend.',
    'Use HTTPS browser APIs for camera, microphone, location, Bluetooth, and motion prompts.',
    'Keep provider API keys in AWS environment variables or Secrets Manager, never in the client bundle.',
    'Move unrestricted hardware control to a native VitalOS device image later.'
  ]
};

const DEFAULT_PROMPT = 'Build me a private hydration, sleep, and heart-health assistant with reminders, wearable sync, and an audit log.';

export function VitalOSBuilder() {
  const [blueprint, setBlueprint] = React.useState<VitalOSBlueprint | null>(null);
  const [prompt, setPrompt] = React.useState(DEFAULT_PROMPT);
  const [inputMode, setInputMode] = React.useState<'text' | 'voice'>('text');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [agentTrace, setAgentTrace] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const loadBlueprint = React.useCallback(async () => {
    const res = await fetch('/api/vitalos/blueprint');

    if (!res.ok) {
      throw new Error('VitalOS API backend is not connected. Showing Amplify-safe local preview mode.');
    }

    const data = await res.json();
    setBlueprint(data);
  }, []);

  React.useEffect(() => {
    loadBlueprint().catch((err) => {
      setBlueprint(fallbackBlueprint);
      setError(err instanceof Error ? err.message : 'Unable to load VitalOS blueprint. Showing Amplify-safe local preview mode.');
    });
  }, [loadBlueprint]);

  const generateApp = async () => {
    setIsGenerating(true);
    setError(null);
    setAgentTrace([]);

    try {
      const res = await fetch('/api/vitalos/apps/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, inputMode })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Unable to generate app');
      }

      setAgentTrace(data.agentTrace || []);
      await loadBlueprint();
    } catch (err) {
      const localApp: VitalOSApp = {
        id: `local-${Date.now()}`,
        name: prompt.split(/\s+/).slice(0, 3).join(' ') || 'Local VitalOS App',
        prompt,
        status: 'local-preview',
        riskLevel: 'medium',
        createdAt: new Date().toISOString(),
        permissions: ['notifications', inputMode === 'voice' ? 'microphone' : 'health-vault'],
        screens: ['Home', 'Signals', 'Permissions', 'Audit Log'],
        automations: ['Run in Amplify frontend preview mode until the API backend is connected'],
        agents: ['claude', 'openai', 'gemini', 'deepcode', 'grok']
      };

      setBlueprint((current) => ({
        ...(current || fallbackBlueprint),
        generatedApps: [localApp, ...((current || fallbackBlueprint).generatedApps || [])]
      }));
      setAgentTrace([
        { provider: 'amplify-static', mode: 'local-preview', action: 'Generated a client-side manifest because the /api backend is unavailable.' }
      ]);
      setError(err instanceof Error ? `${err.message} Generated a local preview instead.` : 'API unavailable. Generated a local preview instead.');
    } finally {
      setIsGenerating(false);
    }
  };

  const installApp = async (appId: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/vitalos/apps/${appId}/install`, { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Unable to install app');
      }

      await loadBlueprint();
    } catch (err) {
      setBlueprint((current) => current ? {
        ...current,
        generatedApps: current.generatedApps.map((app) => app.id === appId ? { ...app, status: 'installed-local' } : app)
      } : current);
      setError(err instanceof Error ? `${err.message} Marked as locally installed in preview mode.` : 'API unavailable. Marked as locally installed in preview mode.');
    }
  };

  return (
    <section className="space-y-6" id="vitalos-builder">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8">
        <div className="vitalos-window p-5 md:p-7 space-y-5">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[10px] text-indigo-300 font-black uppercase tracking-[0.5em]">Building Phase</p>
              <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter text-white mt-2">Agent app factory</h2>
              <p className="text-sm text-slate-500 leading-relaxed mt-4 max-w-2xl">
                This is the first working layer: describe an app, route it through the provider mesh, infer permissions, generate a local manifest, and stage it in the VitalOS sandbox before install.
              </p>
            </div>
            <Bot className="w-10 h-10 text-indigo-300 shrink-0" strokeWidth={1.5} />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {(['text', 'voice'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInputMode(mode)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${inputMode === mode ? 'bg-white text-slate-950 border-white' : 'bg-black/30 text-slate-400 border-white/10 hover:text-white'}`}
                >
                  {mode === 'voice' ? <Mic className="inline w-3 h-3 mr-2" /> : <Terminal className="inline w-3 h-3 mr-2" />}
                  {mode} intent
                </button>
              ))}
            </div>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="w-full min-h-[150px] bg-slate-950 border border-white/10 rounded-3xl p-5 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 transition-colors"
              placeholder="Describe the app you want VitalOS to build..."
            />
            {error && <p className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4">{error}</p>}
            <button
              onClick={generateApp}
              disabled={isGenerating}
              className="w-full md:w-auto px-8 py-4 bg-white text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-[0.35em] flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              <PlayCircle className="w-4 h-4" />
              {isGenerating ? 'Generating Manifest...' : 'Generate Local App'}
            </button>
          </div>
        </div>

        <div className="vitalos-window p-5 md:p-7 space-y-5">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-300" strokeWidth={1.5} />
            <div>
              <p className="text-[10px] text-emerald-300 font-black uppercase tracking-[0.4em]">Safe local path</p>
              <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white">Owner-authorized build rules</h3>
            </div>
          </div>
          <div className="space-y-3">
            {(blueprint?.safeBuildPath || []).map((rule) => (
              <div key={rule} className="flex gap-3 items-start p-4 rounded-2xl bg-black/30 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-500 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8">
        <div className="vitalos-window p-5 md:p-7 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white">Build progress</h3>
            <Wrench className="w-6 h-6 text-indigo-300" strokeWidth={1.5} />
          </div>
          {(blueprint?.phases || []).map((phase) => (
            <div key={phase.id} className="space-y-3">
              <div className="flex justify-between gap-4 text-xs font-black uppercase tracking-widest">
                <span className="text-slate-300">{phase.title}</span>
                <span className="text-indigo-300">{phase.progress}%</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${phase.progress}%` }} />
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed">{phase.deliverables.join(' • ')}</p>
            </div>
          ))}
        </div>

        <div className="vitalos-window p-5 md:p-7 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white">Generated apps</h3>
            <FileJson className="w-6 h-6 text-indigo-300" strokeWidth={1.5} />
          </div>
          <div className="space-y-4 max-h-[560px] overflow-y-auto pr-2">
            {(blueprint?.generatedApps || []).map((app) => (
              <div key={app.id} className="p-5 rounded-3xl bg-black/30 border border-white/5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">{app.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2 max-w-2xl">{app.prompt}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[9px] font-black uppercase tracking-widest">{app.status}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {app.permissions.map((permission) => (
                    <span key={permission} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                      <Lock className="inline w-3 h-3 mr-1" />
                      {permission}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px] text-slate-500 leading-relaxed">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5"><span className="text-slate-300 font-black uppercase">Screens:</span> {app.screens.join(', ')}</div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5"><span className="text-slate-300 font-black uppercase">Automations:</span> {app.automations.join(' • ')}</div>
                </div>
                <button
                  onClick={() => installApp(app.id)}
                  className="px-5 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500/20 transition-colors"
                >
                  {app.status === 'installed-local' ? 'Installed Locally' : 'Install in Sandbox'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <div className="vitalos-window p-5 md:p-7 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white">Hardware access matrix</h3>
            <Activity className="w-6 h-6 text-indigo-300" strokeWidth={1.5} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(blueprint?.capabilities || []).map((capability) => (
              <div key={capability.id} className="p-4 rounded-2xl bg-black/30 border border-white/5">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h4 className="text-sm text-white font-black uppercase tracking-widest">{capability.label}</h4>
                  <span className="text-[8px] text-amber-300 font-black uppercase tracking-widest">{capability.status}</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">Web: {capability.webAccess}</p>
                <p className="text-[10px] text-slate-500 leading-relaxed">Native: {capability.nativeAccess}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="vitalos-window p-5 md:p-7 space-y-5">
          <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white">Latest agent trace</h3>
          {agentTrace.length ? (
            <div className="space-y-3">
              {agentTrace.map((trace) => (
                <div key={trace.provider} className="p-4 rounded-2xl bg-black/30 border border-white/5">
                  <div className="flex justify-between gap-4 mb-2">
                    <span className="text-xs text-white font-black uppercase tracking-widest">{trace.provider}</span>
                    <span className="text-[8px] text-indigo-300 font-black uppercase tracking-widest">{trace.mode}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{trace.action}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 leading-relaxed">Generate a local app to see each provider's planned responsibility and whether it is running in API-ready or stubbed mode.</p>
          )}
        </div>
      </div>
    </section>
  );
}
