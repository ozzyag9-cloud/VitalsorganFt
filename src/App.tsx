import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Brain, Zap, Droplets, Activity, Gauge, Flame, Wallet, Trophy, User, ArrowRight, X, Shield, Fingerprint, Calendar, Lock, LineChart, Cpu, Coins, Search, Hourglass, BarChart2, Globe, ExternalLink, Star, Phone, MessageSquare, Video, Music2, MessageCircle, Camera, Instagram, Facebook, Youtube, Play, Layout, ShoppingBag, Store, HardDrive, AppWindow, Radio, Settings, Terminal, ShieldCheck, Bluetooth, Wifi, Smartphone, Monitor, Database, Code, Brackets, Ghost, Radar, Dna, Moon, Layers, FlaskConical, Twitter, Share2, Binary, Puzzle, Key, RefreshCw, Layers3, Briefcase, BookOpen, Mail } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useVitals } from './hooks/useVitals';
import { cn, formatNumber } from './lib/utils';
import { BiometricCertificate } from './components/BiometricCertificate';
import { HealthState, CertificateTier, OrganType } from './types';
import { PhotorealisticRing } from './components/PhotorealisticRing';

// --- Data ---
const stepsData = [
  { day: 'Mon', steps: 8432 },
  { day: 'Tue', steps: 10234 },
  { day: 'Wed', steps: 9120 },
  { day: 'Thu', steps: 12402 },
  { day: 'Fri', steps: 11000 },
  { day: 'Sat', steps: 14500 },
  { day: 'Sun', steps: 13200 },
];

const sleepData = [
  { day: 'Mon', hours: 7.2 },
  { day: 'Tue', hours: 6.8 },
  { day: 'Wed', hours: 7.5 },
  { day: 'Thu', hours: 8.1 },
  { day: 'Fri', hours: 7.0 },
  { day: 'Sat', hours: 9.2 },
  { day: 'Sun', hours: 8.5 },
];

// --- Components ---

const Navbar = ({ view, setView, balance, user, connectWallet }: { view: string, setView: (v: string) => void, balance: number, user: any, connectWallet: () => void }) => (
  <nav className="max-w-7xl mx-auto flex justify-between items-center mb-6 bg-toxic/5 border border-toxic/20 rounded-2xl p-4 sticky top-6 z-50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,255,65,0.05)]">
    <div className="flex items-center gap-6">
      <div 
        onClick={() => setView('landing')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-toxic rounded-lg flex items-center justify-center font-black text-xl shadow-lg shadow-toxic/20 group-hover:rotate-12 transition-transform text-black">V</div>
        <div>
          <h1 className="text-xl font-display font-black tracking-tight uppercase leading-none text-white text-glow-toxic">VITALS</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[8px] text-toxic/50 font-mono tracking-[0.2em] leading-none uppercase">Gen-0 Protocol</span>
            <span className="text-[7px] bg-toxic/10 text-toxic border border-toxic/20 px-1 py-0.5 rounded font-black uppercase tracking-widest leading-none">Pre-sale Pending</span>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-400">
        <button onClick={() => setView('landing')} className={cn("hover:text-toxic transition-colors uppercase", view === 'landing' && "text-toxic")}>Protocol</button>
        <button onClick={() => setView('launchpad')} className={cn("hover:text-toxic transition-colors uppercase", view === 'launchpad' && "text-toxic")}>Launchpad</button>
        <button onClick={() => setView('mint')} className={cn("hover:text-toxic transition-colors uppercase", view === 'mint' && "text-toxic")}>Minting</button>
        <button onClick={() => setView('dashboard')} className={cn("hover:text-toxic transition-colors uppercase", view === 'dashboard' && "text-toxic")}>VitalOS</button>
        <button onClick={() => { setView('landing'); setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100); }} className="hover:text-rose-400 transition-colors uppercase border-l border-white/5 pl-6">Mission Registry</button>
      </div>
    </div>

    <div className="flex gap-4">
      {user?.walletConnected ? (
        <div className="flex items-center gap-4">
           <div className="hidden md:flex bg-slate-950 px-4 py-1.5 rounded-xl border border-white/5 flex-col justify-center">
             <span className="text-[8px] text-slate-500 uppercase font-black leading-none mb-0.5 tracking-tighter">$VITAL Balance</span>
             <span className="text-xs font-mono font-bold text-white leading-none">{formatNumber(balance)}</span>
           </div>
           <div className="bg-toxic/5 px-4 py-2 rounded-xl border border-toxic/20 flex items-center gap-3 shadow-[0_0_20px_rgba(0,255,65,0.05)]">
              <div className="w-2 h-2 rounded-full bg-toxic shadow-[0_0_8px_rgba(0,255,65,1)]" />
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">Identity Node</span>
                <span className="text-[8px] font-mono text-toxic font-bold uppercase opacity-60">0x8a7...f1e</span>
              </div>
           </div>
        </div>
      ) : (
        <button 
          onClick={connectWallet}
          className="bg-toxic hover:bg-white text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-toxic/20 transition-all active:scale-95 flex items-center gap-2"
        >
          <Wallet className="w-3.5 h-3.5" />
          Seize Identity
        </button>
      )}
    </div>
  </nav>
);

const Sablier = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = new Date(targetDate).getTime() - new Date().getTime();
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 items-center">
      <div className="relative">
         <Hourglass className="w-12 h-12 text-toxic animate-pulse" strokeWidth={1} />
         <div className="absolute inset-0 bg-toxic/20 blur-xl rounded-full" />
      </div>
      <div className="flex gap-8">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((unit, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl font-mono font-bold text-white tabular-nums leading-none mb-1">{String(unit.value).padStart(2, '0')}</p>
            <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest leading-none">{unit.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const GuideModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#05070c] border border-white/10 p-12 rounded-[50px] max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-12 relative shadow-2xl"
      >
        <div className="flex justify-between items-start sticky top-0 bg-[#05070c]/80 backdrop-blur-md pb-6 z-20 border-b border-white/5">
           <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter leading-none">VitalOS Sovereign Deployment</h2>
              </div>
              <p className="text-[12px] text-toxic uppercase tracking-[0.4em] font-black italic">Production Orchestration & Governance Protocol</p>
           </div>
           <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-full text-slate-500 transition-colors">
              <X className="w-6 h-6" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-4">
                    <div className="w-8 h-8 bg-toxic/10 rounded-xl flex items-center justify-center text-xs text-toxic border border-toxic/20">01</div>
                    Anchor & Smart Contracts
                 </h3>
                 <div className="bg-black/40 p-8 rounded-3xl border border-white/5 space-y-4 font-mono text-[11px] text-slate-400">
                    <p className="text-white font-bold italic">// Initialization</p>
                    <p>sh -c "$(curl -sSfL https://release.solana.com/stable/install)"</p>
                    <p className="text-white font-bold italic mt-4">// Clone VitalOS Core Program</p>
                    <p>git clone https://github.com/vitalos/core-program</p>
                    <p>cd core-program && anchor build</p>
                    <p className="text-white font-bold italic mt-4">// Deploy to Devnet (Novice Test)</p>
                    <p className="text-emerald-500">solana airdrop 2</p>
                    <p>anchor deploy --provider.cluster devnet</p>
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-4">
                    <div className="w-8 h-8 bg-toxic/10 rounded-xl flex items-center justify-center text-xs text-toxic border border-toxic/20">02</div>
                    Token & DAO Deployment
                 </h3>
                  <div className="bg-obsidian p-8 rounded-3xl border border-toxic/20 space-y-6">
                    <div className="space-y-4">
                       <div className="flex gap-4">
                          <Coins className="w-5 h-5 text-toxic shrink-0" />
                          <div className="space-y-2">
                             <p className="text-[12px] text-white font-black leading-none uppercase">$VITAL Minting Protocol</p>
                             <p className="text-[10px] text-slate-500 leading-relaxed">
                                Use the <code className="text-toxic font-bold">spl-token create-token</code> command to initialize the fixed 1.0B supply. For the DAO, deploy a Realms (Open-source) governance shell to manage the treasury.
                             </p>
                          </div>
                       </div>
                       <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-2">
                          <p className="text-[9px] text-amber-500 font-black uppercase tracking-widest leading-none">Security Warning</p>
                          <p className="text-[10px] text-slate-400">Multi-sig (Squads/Realms) is MANDATORY for mainnet launch. Never use a single private key for the DAO treasury.</p>
                       </div>
                    </div>
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-black text-rose-500 uppercase tracking-[0.4em] flex items-center gap-4">
                    <div className="w-8 h-8 bg-rose-500/10 rounded-xl flex items-center justify-center text-xs text-rose-400 border border-rose-500/20">05</div>
                    Key Custody & Security (Novice Guide)
                 </h3>
                 <div className="bg-rose-500/5 p-8 rounded-3xl border border-rose-500/20 space-y-4">
                    <p className="text-[11px] text-white font-bold uppercase tracking-widest">Where to store credentials:</p>
                    <ul className="space-y-3">
                       <li className="flex gap-3 text-[10px] text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                          <span>**DO NOT** store seed phrases or private keys in email, cloud notes, or as photos on your phone.</span>
                       </li>
                       <li className="flex gap-3 text-[10px] text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                          <span>**Hard Copy**: Write down your DAO and Token keys on paper. Store in a fireproof safe or multiple physical locations.</span>
                       </li>
                       <li className="flex gap-3 text-[10px] text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                          <span>**Hardware Wallets**: Use Ledger or Trezor for all administrative actions on the $VITAL token contract.</span>
                       </li>
                    </ul>
                 </div>
              </section>
           </div>

           <div className="space-y-12">
              <section className="space-y-6">
                 <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-4">
                    <div className="w-8 h-8 bg-toxic/10 rounded-xl flex items-center justify-center text-xs text-toxic border border-toxic/20">03</div>
                    Hardware Identity (UID)
                 </h3>
                 <div className="bg-black/40 p-8 rounded-3xl border border-white/5 space-y-6">
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                       Every physical Vitals Ring contains a <span className="text-white font-bold">Secure Enclave (A7X Chipset)</span>. The Serial Number is the public key derived from the enclave.
                    </p>
                    <div className="flex items-center gap-4 p-4 border border-indigo-500/30 rounded-2xl bg-indigo-500/5">
                       <ShieldCheck className="w-6 h-6 text-indigo-400" />
                       <div className="space-y-1">
                          <p className="text-[10px] text-white font-black uppercase leading-none tracking-widest">Anti-Counterfeit</p>
                          <p className="text-[9px] text-slate-500">Authenticated via ZK-Proofs at every boot.</p>
                       </div>
                    </div>
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-4">
                    <div className="w-8 h-8 bg-indigo-500/10 rounded-xl flex items-center justify-center text-xs text-indigo-400 border border-indigo-500/20">04</div>
                    Manufacturing & OEM Image
                 </h3>
                 <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950 p-8 rounded-3xl border border-indigo-500/20 space-y-6">
                    <p className="text-xs text-slate-400 leading-relaxed">
                       To flash VitalOS on OEM unlocked hardware (e.g., Pixel 8/9), build the <code className="text-white">v-image.iso</code> using our Open-Source Linux script.
                    </p>
                    <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all">
                       <HardDrive className="w-4 h-4" />
                       Build OS Distribution Package
                    </button>
                    <p className="text-[9px] text-slate-600 italic text-center">Requires unlocked bootloader & ARMv9 architecture.</p>
                 </div>
              </section>
           </div>
        </div>

        <section className="bg-indigo-600/10 border border-indigo-500/30 p-10 rounded-[40px] space-y-6">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
                 <Globe className="w-8 h-8 text-indigo-400" />
              </div>
              <div className="space-y-2">
                 <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Global Domain Integration (VitalOS.space)</h4>
                 <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">Digital-Physical Mapping Protocol</p>
              </div>
           </div>
           <p className="text-sm text-slate-400 leading-relaxed">
              Domain <span className="text-white font-bold">vitalos.space</span> has been secured. Link your Program ID to the A-Record via DNS-Web3 integration. This ensures the landing page acts as the global primary node for user onboarding and biological asset verification.
           </p>
        </section>

        <div className="flex gap-4">
           <button 
             onClick={onClose}
             className="flex-1 py-6 bg-white text-slate-950 rounded-3xl font-black uppercase tracking-[0.4em] text-[12px] hover:bg-slate-200 transition-all shadow-2xl shadow-white/5"
           >
             Protocol Acknowledged
           </button>
           <button className="px-8 py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-800 transition-all border border-white/5">
              Print Manifesto
           </button>
        </div>
      </motion.div>
    </div>
  );
};

const SignupSection = ({ user }: { user: any }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, walletAddress: user?.walletAddress })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch (e) {
      setStatus('error');
      setMessage('Synchronization failed. Please try again.');
    }
  };

  return (
    <section className="py-32 bg-indigo-600/5 -mx-6 px-12 border-y border-white/5 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(99,102,241,0.1)_0%,_transparent_50%)]" />
       <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-8 text-left">
             <div className="space-y-4">
                <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.6em]">Holder Registry</p>
                <h2 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">Join the <br/> Sovereign Grid</h2>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                   Subscribe to the VitalOS holder network for priority access to Hardware Batch-02, exclusive tokenomics updates, and governance voting notifications.
                </p>
             </div>
             <div className="flex gap-10">
                <div className="space-y-1">
                   <p className="text-2xl font-mono font-bold text-white">4.2K+</p>
                   <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest leading-none">Registered Members</p>
                </div>
                <div className="space-y-1">
                   <p className="text-2xl font-mono font-bold text-indigo-400">Gen-0</p>
                   <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest leading-none">Priority Access</p>
                </div>
             </div>
          </div>

          <div className="bg-[#05070c] border border-white/10 p-10 rounded-[40px] shadow-2xl relative">
             {status === 'success' ? (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center space-y-6 py-10"
                >
                   <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                      <Zap className="w-8 h-8 text-emerald-500 shadow-lg shadow-emerald-500/20" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-2xl font-display font-black text-white px-2">Mission Acknowledged</h4>
                      <p className="text-sm text-slate-500 max-w-xs mx-auto">{message}</p>
                   </div>
                   <button 
                     onClick={() => setStatus('idle')}
                     className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                   >
                      Register Another
                   </button>
                </motion.div>
             ) : (
                <form onSubmit={handleSignup} className="space-y-6">
                   <div className="space-y-3">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Universal Identifier (Email)</label>
                      <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sovereign@vitalos.space"
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white font-mono placeholder:text-slate-800 focus:outline-none focus:border-indigo-500/50 transition-colors"
                      />
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Identity Protocol</label>
                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                         <span className="text-[10px] text-slate-600 font-mono italic">{user?.walletAddress || 'Waiting for Wallet Identity...'}</span>
                         {user?.walletConnected ? (
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
                         ) : (
                            <button type="button" className="text-[8px] text-indigo-500 font-black uppercase border border-indigo-500/30 px-2 py-1 rounded">Connect First</button>
                         )}
                      </div>
                   </div>

                   <button 
                     disabled={status === 'loading'}
                     className={cn(
                        "w-full py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] transition-all flex items-center justify-center gap-3",
                        status === 'loading' ? "bg-white/10 text-slate-600 cursor-not-allowed" : "bg-white text-slate-950 hover:bg-slate-200 shadow-xl shadow-white/5"
                     )}
                   >
                      {status === 'loading' ? 'Encrypting...' : 'Begin Synchronization'}
                      <ArrowRight className="w-3 h-3" />
                   </button>

                   {status === 'error' && (
                      <p className="text-[10px] text-rose-500 text-center font-bold">{message}</p>
                   )}

                   <p className="text-[9px] text-slate-600 text-center leading-relaxed italic">
                      By entering the grid, you agree to the Biological Sovereignty Agreement and local data encryption standards.
                   </p>
                </form>
             )}
          </div>
       </div>
    </section>
  );
};

const IdentityModal = ({ isOpen, onClose, onConnect, activateHardware }: { isOpen: boolean, onClose: () => void, onConnect: (domain: string) => void, activateHardware: (s: string) => void }) => {
  const [domain, setDomain] = useState('');
  const [serial, setSerial] = useState('');
  const [activeTab, setActiveTab] = useState<'domain' | 'wallet' | 'hardware'>('wallet');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-[#05070c] border border-white/10 p-10 rounded-[40px] max-w-md w-full space-y-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-rose-500" />
          
          <div className="flex justify-between items-start">
             <div className="space-y-2">
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none">Access Protocol</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Sync your biological identity to the grid</p>
             </div>
             <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 transition-colors">
                <X className="w-5 h-5" />
             </button>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
             <button 
               onClick={() => setActiveTab('wallet')}
               className={cn(
                 "flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                 activeTab === 'wallet' ? "bg-white text-slate-950" : "text-slate-500"
               )}
             >
               Wallet
             </button>
             <button 
               onClick={() => setActiveTab('domain')}
               className={cn(
                 "flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                 activeTab === 'domain' ? "bg-white text-slate-950 mx-1" : "text-slate-500"
               )}
             >
               Domain
             </button>
             <button 
               onClick={() => setActiveTab('hardware')}
               className={cn(
                 "flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                 activeTab === 'hardware' ? "bg-white text-slate-950" : "text-slate-500"
               )}
             >
               Serial
             </button>
          </div>

          <div className="space-y-6">
             {activeTab === 'wallet' && (
               <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'phantom', name: 'Phantom', icon: 'https://phantom.app/favicon.ico' },
                    { id: 'metamask', name: 'MetaMask', icon: 'https://metamask.io/favicon.ico' },
                    { id: 'walletconnect', name: 'WalletConnect', icon: 'https://walletconnect.com/favicon.ico' }
                  ].map(wallet => (
                    <button 
                      key={wallet.id}
                      onClick={() => onConnect('')}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-indigo-500/50 transition-all group"
                    >
                       <div className="flex items-center gap-4">
                          <img src={wallet.icon} alt={wallet.name} className="w-6 h-6 rounded-lg" referrerPolicy="no-referrer" />
                          <span className="text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-white">{wallet.name}</span>
                       </div>
                       <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
               </div>
             )}
             
             {activeTab === 'domain' && (
               <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] text-indigo-500 font-black uppercase tracking-widest ml-1">Domain Resolver</label>
                    <div className="relative group">
                       <input 
                         type="text" 
                         value={domain}
                         onChange={(e) => setDomain(e.target.value)}
                         placeholder="vital.nft"
                         className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white font-mono placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 transition-colors"
                       />
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                          {['.nft', '.eth', '.sol'].map(ext => (
                             <button 
                               key={ext}
                               onClick={() => { if(!domain.includes('.')) setDomain(domain + ext) }}
                               className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[8px] text-slate-600 uppercase font-black hover:text-white transition-colors"
                             >
                                {ext}
                             </button>
                          ))}
                       </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onConnect(domain)}
                    className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-200 active:scale-95 transition-all shadow-xl shadow-white/5"
                  >
                    Synchronize Domain
                  </button>
               </div>
             )}

             {activeTab === 'hardware' && (
               <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] text-rose-500 font-black uppercase tracking-widest ml-1">Hardware Serial Verify</label>
                    <div className="relative group">
                       <input 
                         type="text" 
                         value={serial}
                         onChange={(e) => setSerial(e.target.value)}
                         placeholder="V-ID_XXXX_XXXX"
                         className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white font-mono placeholder:text-slate-700 focus:outline-none focus:border-rose-500/50 transition-colors"
                       />
                       <Cpu className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                    </div>
                  </div>
                  <button 
                    onClick={() => { activateHardware(serial); onClose(); }}
                    className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-200 active:scale-95 transition-all shadow-xl shadow-white/5"
                  >
                    Verify Hardware ID
                  </button>
               </div>
             )}

             <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-2xl flex gap-4 items-start">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                   <Shield className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed italic">
                   All biological telemetry is encrypted end-to-end. Your private metrics only exist within the sovereign hardware enclave linked to your identity.
                </p>
             </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const LandingPage = ({ onEnter, onOpenGuide, user }: { onEnter: (v: string) => void, onOpenGuide: () => void, user: any }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 text-center space-y-16 flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none scale-110">
           <img 
             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
             alt="Deep Tech Background" 
             className="w-full h-full object-cover blur-[1px]"
             referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 bg-slate-950/80" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 mb-12"
        >
          <div className="absolute inset-0 bg-toxic/20 blur-[150px] rounded-full -z-10" />
          <PhotorealisticRing tier={CertificateTier.Sovereign} size={420} className="drop-shadow-[0_0_100px_rgba(0,255,65,0.2)] hover:scale-110 transition-transform duration-1000" />
        </motion.div>

        <div className="space-y-8 relative z-10 max-w-4xl">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-toxic/30 backdrop-blur-2xl"
          >
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">VITALOS.SPACE IS LIVE • GEN-0 SEEDING</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-8xl md:text-[10rem] font-display italic text-white tracking-tighter leading-[0.8]"
          >
            Biological <br /> 
            <span className="text-toxic not-italic font-sans font-black tracking-[-0.05em] uppercase text-7xl md:text-9xl">Sovereignty</span>
          </motion.h1>

          <p className="text-toxic/60 max-w-2xl mx-auto text-xl md:text-2xl font-light tracking-wide leading-relaxed">
            The world's first decentralized biological OS. Secure your health via <span className="text-white font-bold italic tracking-tighter text-glow-toxic">VitalOS</span>, bridge your legacy email to Web3, and run high-bandwidth on-chain media.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-10 pt-10 relative z-10"
        >
          <button 
            onClick={() => onEnter('mint')} 
            className="group relative px-16 py-7 bg-toxic rounded-none overflow-hidden flex items-center gap-6 shadow-[0_30px_60px_-15px_rgba(0,255,65,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-sm font-black uppercase tracking-[0.6em] text-slate-950">Seize Access</span>
            <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-2 transition-transform" />
          </button>

          <button 
            onClick={() => onEnter('dashboard')} 
            className="group relative px-16 py-7 border border-toxic/10 rounded-none overflow-hidden bg-white/5 hover:bg-white/10 transition-all hover:scale-105 active:scale-95 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
          >
            <span className="text-sm font-black uppercase tracking-[0.6em] text-white italic">Access VitalOS</span>
          </button>
        </motion.div>

        {/* Feature Grid - Detailed */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-32 relative z-10 w-full max-w-7xl text-left">
           {[
             { title: "V-Codec Engine", icon: Binary, desc: "A proprietary nano-format algorithm. Media is compressed beyond traditional physics and minted directly to the ledger in real-time." },
             { title: "Hybrid Kernel", icon: Smartphone, desc: "Seamlessly layer VitalOS over Android or iOS. Real-time system synchronization with full root access to your native hardware enclaves." },
             { title: "Sovereign ID Bridge", icon: Key, desc: "Link your standard email directly to a blockchain address. One identity for email, TikTok, X, and the decentralized web." },
             { title: "On-Chain Apps", icon: AppWindow, desc: "A new generation of lightweight apps live directly on-chain. Zero installation, zero privacy leaks, fully sovereign execution." }
           ].map((f, i) => (
             <div key={i} className="space-y-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl">
                   <f.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-display font-black text-white uppercase tracking-tighter">{f.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{f.desc}</p>
             </div>
           ))}
        </div>

        <button 
           onClick={onOpenGuide}
           className="relative z-10 text-[10px] text-slate-600 hover:text-indigo-400 font-black uppercase tracking-[0.4em] transition-colors flex items-center gap-3 mt-8"
        >
           <Search className="w-3 h-3" />
           Project Deployment Manifesto (Guide)
        </button>
      </section>

      {/* Stats Section */}
      <section className="py-32 grid grid-cols-2 md:grid-cols-4 gap-px bg-toxic/10 border border-toxic/20 rounded-[40px] overflow-hidden">
         {[
           { label: "V-ID Minted Nodes", val: "882K", sub: "Global Identity Mesh" },
           { label: "Core Sync Speed", val: "1ms", sub: "Liquid Protocol" },
           { label: "Bandwidth Offset", val: "99%", sub: "V-Codec Efficient" },
           { label: "Trial Conversion", val: "15D", sub: "Trial to dNFT Loop" }
         ].map((stat, i) => (
           <div key={i} className="bg-obsidian p-12 text-center hover:bg-toxic/[0.03] transition-colors group">
              <p className="text-4xl font-mono font-bold text-white mb-2 group-hover:text-toxic transition-colors uppercase tracking-tighter text-glow-toxic">{stat.val}</p>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-[8px] text-slate-700 font-mono tracking-widest uppercase">{stat.sub}</p>
           </div>
         ))}
      </section>

      {/* Detailed Mission Section */}
      <section className="py-40 space-y-32">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-10">
               <div className="space-y-6">
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.8em]">Phygital Loop</p>
                  <h2 className="text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">Your Body, <br/> Bio-Personalized</h2>
               </div>
               <p className="text-slate-400 text-lg font-light leading-relaxed">
                  The <span className="text-white font-bold italic">Vital Protocol</span> connects your real-time biological data to custom supplement batches. AI analyzes your telemetry to adjust your stack, ensuring you perform at peak frequency every single day.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl space-y-4">
                     <FlaskConical className="w-8 h-8 text-emerald-500" />
                     <h4 className="text-sm font-black text-white uppercase tracking-widest">Custom Batching</h4>
                     <p className="text-xs text-slate-500 leading-relaxed font-light">Bespoke formulations delivered monthly, perfectly synced to your V-ID profile.</p>
                  </div>
                  <div className="p-8 bg-blue-500/5 border border-blue-500/20 rounded-3xl space-y-4">
                     <Brain className="w-8 h-8 text-blue-500" />
                     <h4 className="text-sm font-black text-white uppercase tracking-widest">AI Adaptation</h4>
                     <p className="text-xs text-slate-500 leading-relaxed font-light">As your heart rate and sleep patterns evolve, your supplement stack evolves with you.</p>
                  </div>
               </div>
            </div>
            <div className="relative group">
               <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full group-hover:bg-emerald-500/30 transition-all duration-1000" />
               <div className="relative bg-slate-900/50 border border-white/10 p-12 rounded-[60px] backdrop-blur-3xl overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  <div className="space-y-8">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Current Stack #8842</span>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                     </div>
                     <div className="space-y-4">
                        {[
                           { name: "Cognitive Mesh", dose: "Morning", val: "250mg" },
                           { name: "Circadian Lock", dose: "Evening", val: "100mg" },
                           { name: "Grid Recovery", dose: "Post-Workout", val: "Unit 1" }
                        ].map((item, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center">
                              <div className="space-y-1">
                                 <p className="text-xs font-bold text-white uppercase">{item.name}</p>
                                 <p className="text-[10px] text-slate-500 font-bold uppercase">{item.dose}</p>
                              </div>
                              <span className="text-[10px] text-emerald-500 font-mono font-bold tracking-widest">{item.val}</span>
                           </div>
                        ))}
                     </div>
                     <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                        <p className="text-[10px] text-emerald-400 font-bold uppercase leading-relaxed text-center italic">
                           "Protocol optimized: HRV increased 12%. +10VTL Yield."
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-10">
               <div className="space-y-6">
                  <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.8em]">Core Infrastructure</p>
                  <h2 className="text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">The Biological <br/> Insurance Layer</h2>
               </div>
               <p className="text-slate-400 text-lg font-light leading-relaxed">
                  Traditional health insurance is a reactive, opaque system of risk pooling. <span className="text-white font-bold italic">VitalOS</span> flips the model. We provide a decentralized biological ledger where your health consistency directly compounds into productive assets.
               </p>
               <div className="space-y-6">
                  {[
                    "Zero-Knowledge Biological Telemetry",
                    "Decentralized Oracle Synchronization",
                    "Phygital Asset Reconciliation",
                    "Sovereign Yield Distribution"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
                       <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 group-hover:text-white transition-colors">{feat}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="relative group">
               <div className="absolute inset-0 bg-indigo-500/10 blur-[150px] rounded-full group-hover:bg-indigo-500/20 transition-colors" />
               <div className="bg-[#05070c] border border-white/10 p-1 rounded-[40px] relative z-10 overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1200" 
                    alt="Biological Tech" 
                    className="w-full h-full object-cover rounded-[38px] opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-12 flex flex-col justify-end">
                     <p className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none">Global Sink Protocol</p>
                     <p className="text-[10px] text-indigo-500 font-mono tracking-widest mt-2">0x442...VITAL_RESERVE</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Tokenomics Deep Dive */}
      <section className="py-40 border-t border-white/5 space-y-32">
         <div className="text-center max-w-4xl mx-auto space-y-6">
            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.8em]">Economic Engine</p>
            <h2 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">$VITAL Tokenomics</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed max-w-2xl mx-auto">
               A sustainable, performance-driven economy designed to incentivize long-term biological improvement across the global grid.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
               { title: "Sync Mining", pct: "45%", desc: "Reserved for long-term health synchronization rewards over 10 years." },
               { title: "Liquidity", pct: "15%", desc: "DEX/CEX liquidity and stability reserves (Locked for 24 months)." },
               { title: "Team & Advisors", pct: "10%", desc: "Vested linearly over 48 months with a 12-month cliff." },
               { title: "Public Launch", pct: "30%", desc: "Genesis Whitelist and Public Sale distribution phases." }
            ].map((token, i) => (
               <div key={i} className="bg-white/[0.02] border border-white/5 p-10 rounded-[40px] space-y-6 hover:bg-white/[0.05] transition-all group">
                  <div className="flex justify-between items-start">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <Coins className="w-6 h-6 text-indigo-400" />
                     </div>
                     <span className="text-3xl font-mono font-bold text-white">{token.pct}</span>
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">{token.title}</h3>
                     <p className="text-xs text-slate-500 leading-relaxed font-light">{token.desc}</p>
                  </div>
               </div>
            ))}
         </div>

         {/* Architecture Section */}
         <div className="bg-slate-950 border border-white/10 rounded-[60px] p-20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-10">
                  <div className="space-y-4">
                     <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.5em]">The Sovereign Kernel</p>
                     <h2 className="text-5xl font-display font-black text-white uppercase tracking-tighter">Everything is Open. <br/> Nothing is Hidden.</h2>
                  </div>
                  <p className="text-slate-500 text-lg font-light leading-relaxed">
                     Unlike traditional mobile operating systems, VitalOS runs as a series of ZK-proven instructions on-chain. Each app is a smart contract attached to your sovereign V-Pass (Email-to-Wallet Bridge). No "hidden settings"—every hardware hook is open for configuration.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                     {[
                        { label: "Hardware Hooks", val: "OPEN", icon: Cpu },
                        { label: "Entropy Feed", val: "RAW", icon: RefreshCw },
                        { label: "Kernel Buffers", icon: Layers3, val: "MAPPED" },
                        { label: "Identity Hash", icon: Fingerprint, val: "ZK-ID" }
                     ].map((box, i) => (
                        <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-2 group-hover:bg-white/[0.04] transition-colors">
                           <box.icon className="w-5 h-5 text-indigo-500" />
                           <div className="space-y-0.5">
                              <p className="text-sm font-black text-white">{box.val}</p>
                              <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">{box.label}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full animate-pulse" />
                  <div className="relative bg-black/60 border border-white/10 rounded-[40px] p-8 font-mono text-[10px] space-y-4 shadow-2xl">
                     <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex gap-1.5">
                           <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                           <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                        </div>
                        <span className="text-slate-500 italic">kernel_log_init.sys</span>
                     </div>
                     <div className="space-y-1 text-indigo-400">
                        <p><span className="text-emerald-500">[OK]</span> V-Kernel Bootstrap Success...</p>
                        <p><span className="text-indigo-300">#</span> Mounting Solana Enclave at 0x77...88</p>
                        <p><span className="text-indigo-300">#</span> Initializing Bio-Personalized Buffer (128MB)</p>
                        <p><span className="text-indigo-300">#</span> Attaching Twitter ID: @Vital_Founder</p>
                        <p><span className="text-amber-500">[WARN]</span> External Android Layer Detected (Hybrid Mode)</p>
                        <p><span className="text-emerald-500">[OK]</span> Handshake with Hardware Secure Element: PAIRED</p>
                        <p className="animate-pulse">_ OS Environment READY</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Team & Governance Section */}
      <section className="py-40 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
           <div className="space-y-12">
              <div className="space-y-6">
                 <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.8em]">Founders & Council</p>
                 <h2 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">The Biological <br/> Cabinet</h2>
              </div>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                 A multidisciplinary team of engineers, neuroscientists, and protocol architects unified by the mission of sovereign biological identity.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                   { name: "Dr. Aris V.", role: "Lead Neurochemist", bio: "Ex-CERN biological telemetry specialist with focus on neural signal encryption." },
                   { name: "Sector 7", role: "Protocol Arch", bio: "Anonymous distributed ledger veteran. Architect of the Sovereign Handshake logic." },
                   { name: "Iara Kim", role: "Hardware Lead", bio: "Pioneered the Gen-1 Bio-Ring sensor suite at MIT Media Lab." },
                   { name: "Nova One", role: "Ecosystem Growth", bio: "Tokenomics specialist behind three top-tier DeFi protocols." }
                 ].map((member, i) => (
                   <div key={i} className="space-y-3 p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-indigo-500/30 transition-all group">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-black text-xs uppercase group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                         {member.name[0]}
                      </div>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">{member.name}</h4>
                      <p className="text-[8px] text-indigo-500 font-black uppercase tracking-[0.4em] mb-4 leading-none">{member.role}</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-light italic">{member.bio}</p>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-slate-900 border border-indigo-500/10 rounded-[50px] p-16 space-y-12 relative overflow-hidden h-fit lg:sticky lg:top-32">
              <div className="absolute top-0 right-0 p-12 opacity-[0.05]">
                 <Shield className="w-48 h-48 text-indigo-500" />
              </div>
              <div className="space-y-6 relative z-10">
                 <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter">Governance Protocol</h3>
                 <p className="text-slate-500 text-sm leading-relaxed font-light">
                    The VitalOS Council governs the biological rewards frequency, hardware manufacturing schedules, and treasury diversification.
                 </p>
              </div>
              <div className="space-y-8 relative z-10">
                 {[
                   { label: "Quorum Required", val: "66.7%" },
                   { label: "Proposal Fee", val: "50K $VITAL" },
                   { label: "Voting Period", val: "7 Days" }
                 ].map((gov, i) => (
                   <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{gov.label}</span>
                      <span className="text-xl font-mono text-white font-bold">{gov.val}</span>
                   </div>
                 ))}
                 <button className="w-full py-6 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-white transition-all">
                    Access DAO Portal
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Holder Signup */}
      <SignupSection user={user} />

      {/* Roadmap Section */}
      <section className="py-40 border-t border-white/5 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-32 space-y-6">
           <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.6em]">Protocol Evolution</p>
           <h2 className="text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">The Sovereign <br/> Roadmap</h2>
        </div>

        <div className="relative">
           <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 pointer-events-none hidden md:block" />
           <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 md:bg-transparent">
              {[
                { phase: "PHASE 01", title: "Genesis Seeding", date: "June 2026", items: ["Whitelist Launch", "Pulse Minting", "Solana Testnet Bridge"] },
                { phase: "PHASE 02", title: "Hardware Drop", date: "October 2026", items: ["Batch 01 Shipping", "Enclave Pairing Live", "Reward Cycles"] },
                { phase: "PHASE 03", title: "Sovereign Link", date: "January 2027", items: ["ZK-Telemetry V2", "Marketplace Launch", "Evasion Protocols"] },
                { phase: "PHASE 04", title: "Grid Council", date: "July 2027", items: ["DAO Governance", "Ecosystem Grants", "Mainnet Migration"] }
              ].map((phase, i) => (
                <div key={i} className="bg-slate-950 p-12 space-y-8 relative group hover:bg-white/[0.02] transition-colors">
                   <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-white/20 absolute -top-2 left-12 z-10 hidden md:flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                      <div className="w-1 h-1 rounded-full bg-indigo-500 scale-0 group-hover:scale-100 transition-transform" />
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.4em]">{phase.phase}</p>
                      <h4 className="text-2xl font-display font-black text-white uppercase tracking-tight">{phase.title}</h4>
                      <p className="text-[8px] text-slate-600 font-mono tracking-widest uppercase">{phase.date}</p>
                   </div>
                   <ul className="space-y-4">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-xs text-slate-500 font-light">
                           <div className="w-1 h-1 rounded-full bg-slate-700" />
                           {item}
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Platform Hosting Logic Guide */}
      <section className="py-20 border-t border-white/5 opacity-50 hover:opacity-100 transition-opacity">
         <div className="max-w-2xl mx-auto p-12 bg-black/40 border border-white/5 rounded-[40px] text-center space-y-8">
            <Globe className="w-10 h-10 text-indigo-500 mx-auto" strokeWidth={1} />
            <div className="space-y-4">
               <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Global Deployment Strategy</h3>
               <p className="text-xs text-slate-500 leading-relaxed font-light">
                  For the <span className="text-indigo-400 italic">vitalos.space</span> domain, we recommend deploying the app via **Vercel** or **Cloudflare Pages** (Free Tiers available). Simply link your GitHub repository, and these platforms will automatically handle SSL certificates, edge distribution, and high-availability routing for your marketing campaign.
               </p>
            </div>
            <button className="text-[10px] font-black text-white uppercase tracking-[0.4em] hover:text-indigo-400 transition-colors">
               Read Deployment Docs
            </button>
         </div>
      </section>
    </div>
  );
};

const MintingPage = ({ user, buy, connectWallet }: { user: any, buy: (id: string) => void, connectWallet: () => void }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'USDT' | 'ETH' | 'SOL'>('USDT');
  
  const getPrice = (cert: any) => {
    if (selectedCurrency === 'ETH') return `${cert.priceEth} ETH`;
    if (selectedCurrency === 'SOL') return `${cert.priceSol} SOL`;
    return `${cert.priceUsdt} USDT`;
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-4 px-4 py-1.5 bg-toxic/10 border border-toxic/20 rounded-full">
             <div className="w-1.5 h-1.5 rounded-full bg-toxic animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-toxic/80">Genesis Founder Mint Live</span>
          </div>
          <h1 className="text-7xl font-display font-black uppercase tracking-tighter leading-none text-white">Secure <br/> Your Link</h1>
          <p className="text-slate-500 text-lg max-w-xl font-light leading-relaxed">
            Mint your Protocol Tier to begin decentralized biological synchronization. All founding certificates include a Genesis Founder badge and prioritized hardware allocation.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-6 w-full lg:w-auto">
           <div className="bg-white/5 border border-white/10 p-2 rounded-xl flex gap-2 w-full lg:w-auto">
              {['USDT', 'ETH', 'SOL'].map((curr) => (
                <button 
                  key={curr}
                  onClick={() => setSelectedCurrency(curr as any)}
                  className={cn(
                    "flex-1 lg:px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                    selectedCurrency === curr ? "bg-white text-slate-950 shadow-xl" : "text-slate-500 hover:text-white"
                  )}
                >
                  {curr}
                </button>
              ))}
           </div>
           {!user?.walletConnected && (
             <button 
               onClick={connectWallet}
               className="w-full lg:w-auto bg-amber-500/10 border border-amber-500/30 text-amber-500 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all flex items-center gap-3"
             >
               <Wallet className="w-4 h-4" />
               Connect Wallet to Mint
             </button>
           )}
        </div>
      </div>

      <div className="hidden lg:block mb-24 p-12 bg-indigo-500/5 border border-indigo-500/10 rounded-[40px] relative overflow-hidden">
         <div className="flex justify-between items-center relative z-10">
            <div className="space-y-2">
               <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none">Public Launch Countdown</h3>
               <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black leading-none">Founder Whitelist ends in</p>
            </div>
            <Sablier targetDate="2026-06-30T00:00:00Z" />
            <div className="text-right">
               <p className="text-3xl font-mono font-bold text-white tabular-nums">442/1000</p>
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Left at Whitelist Price</p>
            </div>
         </div>
         <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
            <Hourglass className="w-64 h-64 text-white" strokeWidth={1} />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {user.availableCertificates.map((cert: any) => (
          <div key={cert.id} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 via-transparent to-rose-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#05070c] border border-white/5 p-8 rounded-3xl space-y-10 flex flex-col h-full hover:border-white/20 transition-all">
                <div className="flex justify-between items-start">
                   <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.2)_0%,_transparent_70%)] animate-pulse" />
                      {cert.organ === 'Heart' && <Heart className="w-6 h-6 text-indigo-400 relative z-10" />}
                      {cert.organ === 'Brain' && <Brain className="w-6 h-6 text-indigo-400 relative z-10" />}
                      {cert.organ === 'Lungs' && <Activity className="w-6 h-6 text-indigo-400 relative z-10" />}
                      {cert.organ === 'Skin' && <Shield className="w-6 h-6 text-indigo-400 relative z-10" />}
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest leading-none">Multiplier</p>
                      <p className="text-xl font-mono text-white font-bold leading-none mt-1">{cert.multiplier.toFixed(1)}x</p>
                      <div className="mt-2 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-[7px] text-indigo-400 font-black uppercase tracking-widest leading-none inline-block">4K Precision</div>
                   </div>
                </div>

                <div className="space-y-4 flex-1">
                   <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter leading-none">{cert.tier}</h3>
                   <div className="flex flex-wrap gap-2">
                       {cert.traits.map((t: string) => (
                         <span key={t} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[8px] text-slate-500 uppercase font-black tracking-widest leading-none">{t}</span>
                       ))}
                   </div>
                   <p className="text-sm text-slate-500 leading-relaxed font-light">
                      Professional focus on biological {cert.organ} synchronization. Rendered in ultra-high fidelity via Nano Banana Pro imaging suite. Enables Apex Link software emulation protocols.
                   </p>
                </div>

                <div className="space-y-6 pt-10 border-t border-white/5">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] text-indigo-500 font-black uppercase tracking-widest leading-none">Price</span>
                      <span className="text-2xl font-mono font-bold text-white tabular-nums leading-none">{getPrice(cert)}</span>
                   </div>
                   <button 
                     disabled={!user.walletConnected || cert.isOwned}
                     onClick={() => buy(cert.id)}
                     className={cn(
                       "w-full py-5 rounded-xl font-black uppercase tracking-[0.4em] text-[10px] transition-all",
                       cert.isOwned 
                         ? "bg-slate-900 text-slate-700 border border-slate-800"
                         : "bg-white text-slate-950 hover:bg-slate-200 active:scale-95 disabled:opacity-20"
                     )}
                   >
                     {cert.isOwned ? "Already Owned" : "Request Protocol Lock"}
                   </button>
                </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 p-12 bg-white/[0.02] border border-white/5 rounded-[40px] flex flex-col items-center text-center space-y-8">
         <div className="space-y-2">
            <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none">Pre-Sale Event Countdown</h3>
            <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black leading-none">Official Mint Window begins 30th June 2026</p>
         </div>
         <div className="scale-150 py-12">
            <Sablier targetDate="2026-06-30T00:00:00Z" />
         </div>
         <p className="max-w-xl text-slate-600 text-xs italic leading-relaxed">
            * Early participants receive the Genesis Founder trait and accelerated hardware shipping priority. All pre-sale certificates include the unique biological thumbprint encoding interaction.
         </p>
      </div>
    </div>
  );
};

const TargetEngine = ({ targets, setTarget, logProgress, user, organType }: { targets: any[], setTarget: (t: string, g: number) => void, logProgress: (id: string, v: number) => void, user: any, organType: string }) => {
  const [showAdd, setShowAdd] = React.useState(false);
  const [newTarget, setNewTarget] = React.useState({ type: 'Steps', goal: 10000 });
  const [logValue, setLogValue] = React.useState(0);
  const [activeLogId, setActiveLogId] = React.useState<string | null>(null);

  const getTargetOptions = () => {
    switch (organType) {
      case 'Heart': return [
        { value: 'Steps', label: 'Steps (Activity)', goal: 10000 },
        { value: 'RestingBPM', label: 'Resting heart rate', goal: 65 },
        { value: 'Sleep', label: 'Sleep (Recovery)', goal: 8 },
        { value: 'Hydration', label: 'Hydration (Intake)', goal: 2500 }
      ];
      case 'Brain': return [
        { value: 'DeepSleep', label: 'Deep Sleep %', goal: 25 },
        { value: 'Stress', label: 'Stress Level (1-10)', goal: 2 },
        { value: 'Focus', label: 'Focus Minutes', goal: 90 },
        { value: 'ScreenTime', label: 'Screen Time (Hours)', goal: 4 }
      ];
      case 'Lungs': return [
        { value: 'Cardio', label: 'Cardio Minutes', goal: 45 },
        { value: 'Breathwork', label: 'Breathwork Minutes', goal: 15 },
        { value: 'AirQuality', label: 'Air Quality (AQI)', goal: 50 },
        { value: 'SmokeFree', label: 'Smoke-Free streak', goal: 1 }
      ];
      case 'Gut': return [
        { value: 'MealQuality', label: 'Meal quality (1-10)', goal: 8 },
        { value: 'Fibre', label: 'Fibre servings', goal: 5 },
        { value: 'Probiotics', label: 'Probiotic intake', goal: 1 },
        { value: 'Alcohol', label: 'Alcohol units', goal: 0 }
      ];
      case 'Skin': return [
        { value: 'Hydration', label: 'Water intake (ml)', goal: 2500 },
        { value: 'SPF', label: 'SPF Application', goal: 1 },
        { value: 'Sleep', label: 'Sleep hours', goal: 8 },
        { value: 'Sugar', label: 'Added sugar (g)', goal: 20 }
      ];
      default: return [{ value: 'Steps', label: 'Steps', goal: 10000 }];
    }
  };

  const options = getTargetOptions();

  return (
    <section className="max-w-7xl mx-auto mt-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tighter">Consistency Stakes</h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Maintain targets to secure Vitals-T yield</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
        >
          {showAdd ? 'Cancel' : 'New Target Slot'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {showAdd && (
          <GlassCard className="p-6 border-indigo-500/40 bg-indigo-500/5 flex flex-col justify-between min-h-[200px]">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Initialize New Stake</h4>
              <div className="space-y-2">
                <label className="text-[8px] text-slate-500 uppercase font-black uppercase tracking-widest">Type</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  value={newTarget.type}
                  onChange={(e) => {
                    const type = e.target.value;
                    const opt = options.find(o => o.value === type);
                    setNewTarget({ type, goal: opt?.goal || 10000 });
                  }}
                >
                  {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] text-slate-500 uppercase font-black uppercase tracking-widest">Daily Goal</label>
                <input 
                  type="number"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                  value={newTarget.goal}
                  onChange={(e) => setNewTarget({...newTarget, goal: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <button 
              onClick={() => {
                setTarget(newTarget.type, newTarget.goal);
                setShowAdd(false);
              }}
              className="mt-6 w-full bg-white text-slate-950 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest"
            >
              Commit Streak
            </button>
          </GlassCard>
        )}

        {targets.map((target, i) => (
          <GlassCard key={target.id} className="p-6 relative group overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase tracking-tight">{target.type} Streak</h4>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(target.targetStreak)].map((_, idx) => (
                      <div 
                        key={idx} 
                        className={cn(
                          "w-1 h-3 rounded-full transition-all",
                          idx < target.streak ? "bg-indigo-500" : "bg-slate-800"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">{target.streak}/{target.targetStreak} DAYS</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[8px] text-slate-500 uppercase font-black uppercase tracking-widest">Est. Reward</div>
                <div className="text-xs font-mono font-bold text-emerald-400">+{target.pointsReward} VT-T</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                <span className="text-slate-400">Goal: {target.goal} {target.unit}</span>
                <span className="text-slate-200">{target.currentValue} current</span>
              </div>
              <ProgressBar progress={(target.currentValue / target.goal) * 100} color="bg-indigo-500" />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Auto-Burn on Fault: ENABLED</span>
                <div className={cn("px-2 py-0.5 rounded text-[8px] font-bold uppercase", target.isMet ? "bg-emerald-500/10 text-emerald-500" : "bg-indigo-500/10 text-indigo-400")}>
                  {target.isMet ? "TARGET MET today" : "PENDING DATA"}
                </div>
              </div>
              
              {['Hydration', 'Mindfulness'].includes(target.type) && !target.isMet && (
                <div className="flex gap-2">
                  {activeLogId === target.id ? (
                    <div className="flex w-full gap-2 mt-1">
                      <input 
                        type="number"
                        value={logValue}
                        onChange={(e) => setLogValue(Number(e.target.value))}
                        className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                        placeholder={target.unit}
                      />
                      <button 
                        onClick={() => { logProgress(target.id, logValue); setActiveLogId(null); setLogValue(0); }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors"
                      >
                        Log
                      </button>
                      <button 
                        onClick={() => setActiveLogId(null)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-400 px-3 py-2 rounded-lg transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setActiveLogId(target.id)}
                      className="w-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all"
                    >
                      Update Manual Log
                    </button>
                  )}
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

const StakingVault = ({ stakedAmount, balance, apy, stake, unstake }: { stakedAmount: number, balance: number, apy: number, stake: (a: number) => void, unstake: (a: number) => void }) => {
  const [amount, setAmount] = React.useState(0);
  
  return (
    <section className="max-w-7xl mx-auto mt-6">
      <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] -z-10"></div>
        
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-6 flex-1">
            <div>
              <h3 className="text-3xl font-bold uppercase tracking-tighter">VT-T Staking Vault</h3>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Lock biological assets to amplify protocol yield</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Total Staked</p>
                <p className="text-2xl font-mono font-bold text-white tracking-tighter">{formatNumber(stakedAmount)} VT-T</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Estimated APY</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-mono font-bold text-emerald-400 tracking-tighter">{apy}%</p>
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-1 py-0.5 rounded font-bold uppercase tracking-widest">Dynamic</span>
                </div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Daily Accrual</p>
                <p className="text-2xl font-mono font-bold text-indigo-400 tracking-tighter">+{((stakedAmount * (apy/100)) / 365).toFixed(2)} VT-T</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl w-full md:w-80 space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Amount</span>
              <span className="text-[10px] text-slate-400">Available: {formatNumber(balance)} VT-T</span>
            </div>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="0.00"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-lg font-mono focus:border-indigo-500 focus:outline-none transition-colors"
            />
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => stake(amount)}
                disabled={amount <= 0 || amount > balance}
                className="bg-white text-slate-950 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-20"
              >
                Stake Tokens
              </button>
              <button 
                onClick={() => unstake(amount)}
                disabled={amount <= 0 || amount > stakedAmount}
                className="bg-slate-800 text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all disabled:opacity-20"
              >
                Unstake
              </button>
            </div>
            <p className="text-[8px] text-slate-600 text-center uppercase tracking-widest font-bold">Unstaking period: Instant during Genesis Phase</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricCard = ({ title, value, sub, icon: Icon, color, className }: { title: string, value: string | number, sub: string, icon: any, color: string, className?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className={cn("bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col justify-between", className)}
  >
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{title}</span>
      <div className={cn("p-2 rounded-xl bg-opacity-10", color)}>
        <Icon className={cn("w-4 h-4", color.replace('bg-', 'text-'))} />
      </div>
    </div>
    <div className="mt-auto">
      <div className="text-3xl font-mono text-slate-100">{value}</div>
      <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{sub}</div>
    </div>
  </motion.div>
);

const GlassCard = ({ children, className, ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div className={cn("bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden", className)} {...props}>
    {children}
  </div>
);

const ProgressBar = ({ progress, color }: { progress: number, color: string }) => (
  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className={cn("h-full", color)} 
    />
  </div>
);

// --- Pages ---

const Dashboard = ({ nft, user, sync, claim, evolve, activate, pairWearable, activateHardware, setTarget, swapVitals, stakeVitals, unstakeVitals, logProgress, activeTabOverride }: any) => {
  const [serialInput, setSerialInput] = React.useState('');
  const [swapAmount, setSwapAmount] = React.useState(100);
  const [activeTab, setActiveTab] = React.useState(activeTabOverride || 'overview');

  useEffect(() => {
    if (activeTabOverride) {
      setActiveTab(activeTabOverride);
    }
  }, [activeTabOverride]);
  const [isGeneratingManifest, setIsGeneratingManifest] = React.useState(false);
  const [manifestProgress, setManifestProgress] = React.useState(0);
  const [privacyMasks, setPrivacyMasks] = React.useState({
    heart: true,
    neural: false,
    respiratory: true
  });

  const generateManifest = () => {
    setIsGeneratingManifest(true);
    setManifestProgress(0);
    const interval = setInterval(() => {
      setManifestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsGeneratingManifest(false), 2000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleHardwareLink = () => {
    if (serialInput.length >= 5) {
      activateHardware(serialInput);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* System Status Banner */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-stretch">
        {/* ... existing header content ... */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between overflow-hidden relative group">
           <div className="absolute inset-0 bg-indigo-500/5 transition-opacity opacity-0 group-hover:opacity-100" />
           <div className="flex items-center gap-6 relative z-10">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                 <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                 <h2 className="text-xl font-display font-black uppercase tracking-tighter">System Continuity</h2>
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-500 font-mono font-black uppercase tracking-widest">Protocol Version 0.4.2</span>
                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-[10px] text-emerald-400 font-mono font-black tracking-widest">{nft.isActivated ? "Live Link Established" : "Awaiting Authorization"}</span>
                 </div>
              </div>
           </div>
           <div className="hidden lg:flex items-center gap-8 relative z-10">
              <div className="text-right">
                 <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1">Neural Frequency</p>
                 <p className="text-lg font-mono font-bold text-white tracking-tighter">42.8 Hz</p>
              </div>
              <div className="text-right">
                 <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1">Latency</p>
                 <p className="text-lg font-mono font-bold text-indigo-400 tracking-tighter">0.02ms</p>
              </div>
           </div>
        </div>

        <div className="w-full md:w-80 bg-slate-950 border border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-center gap-2">
           <div className="flex justify-between items-center">
              <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Total Yield</span>
              <span className="text-[10px] text-slate-500 font-mono">ESTIMATED (24H)</span>
           </div>
           <p className="text-3xl font-mono font-bold text-white uppercase tabular-nums">
              +{formatNumber(nft.unclaimedVital * 1.2)} <span className="text-xs text-indigo-500">$VITAL</span>
           </p>
        </div>
      </div>

      {/* Dashboard Tabs Dashboard */}
      {!activeTabOverride && (
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8 border-b border-white/5 pb-4">
            {[
              { id: 'overview', label: 'Biometric Overview' },
              { id: 'assets', label: 'Protocol Assets' },
              { id: 'deploy', label: 'Sovereign Deployment' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.3em] transition-all relative pb-4",
                  activeTab === tab.id ? "text-white" : "text-slate-600 hover:text-slate-400"
                )}
              >
                {tab.label}
                {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'overview' && (
        <>
          <main className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
        {/* Main Certificate Visual */}
        <div className="col-span-12 lg:col-span-12 xl:col-span-8 bg-[#020408] border border-white/5 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-2xl p-4 min-h-[500px]">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          
          {!nft.isActivated && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl">
              <div className="text-center p-12 max-w-lg">
              <div className="w-24 h-24 bg-toxic/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-toxic/30 relative">
                  <div className="absolute inset-0 bg-toxic/20 blur-xl animate-pulse rounded-full" />
                  <Fingerprint className="w-10 h-10 text-toxic relative" strokeWidth={1} />
              </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Authorize Biometric Stream</h3>
                <p className="text-slate-500 text-sm mb-10 leading-relaxed italic uppercase tracking-tight">
                  Your encrypted {nft.certificateTier} hardware link is dormant. authorize software emulation to begin biological synchronization protocols.
                </p>
                <button 
                  onClick={activate}
                  className="bg-white text-slate-950 px-12 py-5 rounded-sm font-black tracking-[0.4em] text-[10px] uppercase shadow-2xl border border-white/20 transition-all hover:bg-slate-200"
                >
                  Confirm Physical Presence
                </button>
              </div>
            </div>
          )}

          {nft.isActivated && (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <BiometricCertificate 
                certificateId={nft.certificateId}
                tier={nft.certificateTier as CertificateTier}
                organ={nft.organType as OrganType}
                issueDate="MAY 27, 2025"
                traits={nft.earnedTraits.length > 0 ? nft.earnedTraits : ["System Calibrating..."]}
                ownerName={user.web3Domain || user.walletAddress || "SECURE_HOLDER"}
              />
              
              <div className="mt-8 flex gap-3">
                 {Object.values(privacyMasks).some(v => v) && (
                   <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[8px] text-emerald-400 font-black uppercase tracking-widest flex items-center gap-2">
                      <Shield className="w-3 h-3" />
                      ZK-Verified Masking Active
                   </div>
                 )}
                 <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded text-[8px] text-indigo-400 font-black uppercase tracking-widest flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    {user.web3Domain || "Unlinked Identity"}
                 </div>
              </div>
              
              <div className="mt-12 w-full max-w-3xl flex justify-between gap-12 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-sm">
                 <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Protocol Stability</span>
                       <span className="text-[10px] text-white font-mono font-bold">{nft.healthScore}%</span>
                    </div>
                    <ProgressBar progress={nft.healthScore} color={nft.healthScore > 80 ? "bg-indigo-500" : "bg-rose-500"} />
                 </div>
                 <div className="w-48 space-y-2 border-l border-white/10 pl-12 flex flex-col justify-center">
                    <p className="text-[8px] text-slate-600 font-black uppercase tracking-[0.4em]">Hardware Lock</p>
                    <p className="text-xs font-mono font-bold text-white uppercase">
                       {nft.isHardwareBound ? nft.hardwareSerial : "Virtual Emulation"}
                    </p>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Diagnostics Sidebar */}
        <div className="col-span-12 lg:col-span-12 xl:col-span-4 flex flex-col gap-4">
          <GlassCard className="flex-1 p-6 flex flex-col gap-6 bg-[#04060a] border border-white/5">
            <div className="flex justify-between items-center">
               <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Live Integration Logs</h3>
               <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            </div>
            
            <div className="flex-1 font-mono text-[10px] space-y-3 overflow-hidden opacity-80">
               {[
                 { time: "16:20:44", msg: "SYNC_PKT_RECEIVED [72.4KB]", type: "info" },
                 user.web3Domain 
                   ? { time: "16:20:45", msg: `IDENTITY_RESOLVED [${user.web3Domain}]`, type: "success" }
                   : { time: "16:20:45", msg: "BIOMETRIC_HASH_VERIFIED", type: "success" },
                 { time: "16:20:45", msg: "HARDWARE_ENCLAVE_READY", type: "info" },
                 { time: "16:20:46", msg: "METADATA_UPDATE_COMPLETE", type: "success" },
                 { time: "16:20:47", msg: "STREAMING_VITALS_CYCLE_882", type: "info" },
                 { time: "16:20:48", msg: "NEURAL_LINK_INTEGRITY: 99.2%", type: "info" },
                 { time: "16:20:49", msg: "VT-T_YIELD_CALCULATED [0.082]", type: "reward" },
               ].map((log, i) => (
                 <div key={i} className="flex gap-4 items-start group">
                    <span className="text-slate-700 whitespace-nowrap">[{log.time}]</span>
                    <span className={cn(
                      "transition-colors",
                      log.type === 'success' ? "text-emerald-500" :
                      log.type === 'reward' ? "text-indigo-400 font-bold" : "text-slate-400"
                    )}>
                      {log.msg}
                    </span>
                 </div>
               ))}
               <div className="pt-4 mt-4 border-t border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-600">ENCRYPTION_MODE</span>
                    <span className="bg-white/5 px-2 py-0.5 border border-white/10 text-white rounded-sm">AES-256GCM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">CONNECTION_STRENGTH</span>
                    <div className="flex gap-1 h-3 items-end">
                       {[1,2,3,4,5].map(b => (
                         <div key={b} className={cn("w-1 rounded-t-sm", b <= 4 ? "bg-indigo-500" : "bg-slate-800")} style={{ height: `${b * 20}%` }} />
                       ))}
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={sync}
                disabled={!nft.isActivated}
                className="w-full py-5 bg-white text-slate-950 rounded-sm font-black uppercase tracking-[0.5em] text-[10px] hover:bg-slate-200 transition-all disabled:opacity-20"
              >
                Force Biological Sync
              </button>
              
              {!nft.isHardwareBound && nft.isActivated && (
                <button 
                  onClick={pairWearable}
                  className="w-full py-5 bg-transparent border border-white/10 text-slate-300 rounded-sm font-black uppercase tracking-[0.5em] text-[10px] hover:bg-white/5 transition-all"
                >
                  Pair Virtual Bridge
                </button>
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-slate-950 border border-white/5">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Organ Ecosystem</span>
                <span className="text-[8px] text-slate-600 font-mono tracking-widest">CYCLE_STATUS: ACTIVE</span>
             </div>
             
             <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: Heart, color: "text-rose-500", label: "Heart" },
                  { icon: Brain, color: "text-indigo-400", label: "Brain" },
                  { icon: Zap, color: "text-amber-500", label: "Neural" },
                  { icon: Activity, color: "text-emerald-500", label: "Active" }
                ].map((org, i) => (
                  <div key={i} className="aspect-square bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center gap-2 group hover:bg-white/[0.04] transition-colors rounded-xl">
                     <org.icon className={cn("w-4 h-4", org.color)} strokeWidth={1} />
                     <span className="text-[7px] font-black uppercase tracking-widest text-slate-600">{org.label}</span>
                  </div>
                ))}
             </div>
          </GlassCard>
        </div>
      </main>

      {/* Reward & Consistency Panels */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 mt-6">
         <div className="flex-1">
            <TargetEngine targets={user.activeTargets} setTarget={setTarget} logProgress={logProgress} user={user} organType={nft.organType} />
         </div>
         
         <div className="w-full lg:w-[450px] space-y-6">
            <div className="bg-[#04060a] border border-white/5 p-8 rounded-3xl space-y-8">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-display font-black uppercase tracking-tighter">Protocol Assets</h3>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Yield management dashboard</p>
                  </div>
                  <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                    <Trophy className="w-5 h-5 text-indigo-500" />
                  </div>
               </div>
               
               <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Liquid Balance</span>
                       <span className="text-lg font-mono font-bold text-white tracking-tighter">{formatNumber(nft.unclaimedVital)} <span className="text-[10px] text-indigo-400">$VITAL</span></span>
                    </div>
                    <button 
                      onClick={claim}
                      disabled={nft.unclaimedVital <= 0}
                      className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-[9px] shadow-xl shadow-indigo-900/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20"
                    >
                      Harvest $VITAL Yield
                    </button>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4">
                       <span className="text-slate-600">Asset Evolution</span>
                       <span className={cn("text-emerald-400", nft.healthScore < 70 && "text-amber-500")}>
                          {nft.healthScore >= 70 ? "Ready to Evolve" : "Insufficient Vitality"}
                       </span>
                    </div>
                    <button 
                      onClick={evolve}
                      disabled={nft.healthScore < 70}
                      className="w-full py-4 bg-transparent border border-white/10 text-white rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-white/5 transition-all disabled:opacity-20"
                    >
                      Evolve Biometric Layer
                    </button>
                  </div>
               </div>
            </div>
            
            {/* Swap Panel Mini */}
            <div className="bg-slate-950 border border-white/5 p-8 rounded-3xl space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500/10 border border-indigo-500/30 rounded-lg flex items-center justify-center">
                     <Zap className="w-4 h-4 text-indigo-500" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400">Yield Accelerator</h4>
               </div>
               <div className="space-y-4">
                  <div className="space-y-1">
                     <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-600">
                        <span>Swap Input</span>
                        <span>Available: {formatNumber(user.totalVitalEarned)}</span>
                     </div>
                     <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center">
                        <span className="font-mono text-xl font-bold">{swapAmount}</span>
                        <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">$VITAL</span>
                     </div>
                  </div>
                  <input 
                    type="range" min="100" max={Math.floor(user.totalVitalEarned)} step="100" 
                    value={swapAmount} onChange={(e) => setSwapAmount(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <button 
                    onClick={() => swapVitals(swapAmount)}
                    disabled={user.totalVitalEarned < 100}
                    className="w-full py-4 bg-white text-slate-950 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-200 transition-all disabled:opacity-20"
                  >
                    Swap for Vitals-T ({swapAmount / 10})
                  </button>
               </div>
            </div>
         </div>
      </div>

      <StakingVault stakedAmount={user.vitalsTStaked} balance={user.vitalsTBalance} apy={user.stakingApy} stake={stakeVitals} unstake={unstakeVitals} />

      {/* Historical Context Charts */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <GlassCard className="p-8 border-white/5 bg-[#04060a]">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-1">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Biological Throughput</h3>
              <p className="text-[10px] text-indigo-500 font-mono italic">AGGREGATED ACTIVITY METRICS • 7D WINDOW</p>
            </div>
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stepsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }} dy={10} />
                <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} contentStyle={{ backgroundColor: '#020408', border: '1px solid #1e293b', borderRadius: '4px', fontSize: '10px' }} />
                <Bar dataKey="steps" fill="#6366f1" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-8 border-white/5 bg-[#04060a]">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-1">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Neural Sync Restoration</h3>
              <p className="text-[10px] text-indigo-500 font-mono italic">RECOVERY DYNAMICS • 7D WINDOW</p>
            </div>
            <Brain className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sleepData}>
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF41" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00FF41" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }} dy={10} />
                <Tooltip contentStyle={{ backgroundColor: '#020408', border: '1px solid #1e293b', borderRadius: '4px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="hours" stroke="#00FF41" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </section>
      </>
      )}

      {activeTab === 'deploy' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12">
           <div className="bg-[#05070c] border border-white/10 p-10 rounded-[40px] space-y-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Globe className="w-32 h-32 text-indigo-500" />
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/50 via-rose-500/50 to-indigo-500/50" />
              
              <div className="space-y-4">
                 <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.6em]">Node Registry</p>
                 <h2 className="text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">Domain <br/> Mapping</h2>
                 <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-light">
                   Establish your sovereign endpoint. Map your biometric hash to a permanent Web3 domain or custom NS records.
                 </p>
              </div>

              <div className="space-y-8 pt-8 border-t border-white/5">
                 <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-6">
                    <div className="flex justify-between items-center text-white">
                       <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Sovereign Domain</span>
                       <span className="text-sm font-mono font-bold text-indigo-400">{user.web3Domain || "NO_DOMAIN_ATTACHED"}</span>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="flex justify-between items-center text-white">
                       <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">IPFS Manifest CID</span>
                       <span className="text-[10px] font-mono font-bold text-white uppercase select-all truncate ml-4">
                          {isGeneratingManifest ? `GENERATING... ${manifestProgress}%` : (user.web3Domain ? "QmXp9V...authenticated...8Zp2" : "AWAITING_DOMAIN_LINK")}
                       </span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <button 
                      onClick={generateManifest}
                      disabled={isGeneratingManifest}
                      className="w-full py-6 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.4em] text-xs hover:bg-slate-200 active:scale-95 transition-all shadow-xl shadow-white/5 leading-none disabled:opacity-50"
                    >
                       {isGeneratingManifest ? 'Indexing Bio-Hash...' : 'Generate New IPFS CID'}
                    </button>

                <div className="bg-toxic/10 border border-toxic/20 p-8 rounded-3xl space-y-4">
                       <h4 className="text-xs font-black uppercase tracking-widest text-white">Handshake Instructions</h4>
                       <ol className="text-[11px] text-slate-400 space-y-3 list-decimal ml-4 font-light">
                          <li>Click the <span className="text-white font-bold">Settings (Gear) icon</span> in the top-right corner of the AI Studio interface.</li>
                          <li>Select <span className="text-white font-bold">Export to ZIP</span> to download the full protocol codebase to your machine.</li>
                          <li>Open your terminal in the exported folder and run <code className="bg-black/50 px-1 rounded text-indigo-400">npm install && npm run build</code>.</li>
                          <li>Upload the resulting <code className="text-indigo-400">dist/</code> folder to an IPFS provider (Pinata, Fleek, or your own node).</li>
                          <li>Copy the CID and paste it into the <span className="text-white font-bold">Website / Content Hash</span> field in your domain dashboard (e.g. Unstoppable Domains or ENS).</li>
                       </ol>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-6">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Biometric Masking (ZK-Privacy)</span>
                          <Lock className="w-3 h-3 text-indigo-500" />
                       </div>
                       <div className="space-y-4">
                          {[
                            { id: 'heart', label: 'Cardiac Mask', active: privacyMasks.heart },
                            { id: 'neural', label: 'Neural Mask', active: privacyMasks.neural },
                            { id: 'respiratory', label: 'Lung Mask', active: privacyMasks.respiratory }
                          ].map(mask => (
                            <div key={mask.id} className="flex justify-between items-center">
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{mask.label}</span>
                               <button 
                                 onClick={() => setPrivacyMasks(prev => ({ ...prev, [mask.id]: !mask.active }))}
                                 className={cn(
                                   "w-10 h-5 rounded-full relative transition-colors border",
                                   mask.active ? "bg-indigo-500 border-indigo-400" : "bg-slate-900 border-slate-800"
                                 )}
                               >
                                  <div className={cn(
                                    "absolute top-1 w-3 h-3 rounded-full bg-white transition-all",
                                    mask.active ? "left-6" : "left-1"
                                  )} />
                               </button>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-12">
              <div className="bg-[#05070c] border border-white/10 p-10 rounded-[40px] space-y-8 shadow-2xl relative">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">Handshake Logs</h3>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-75" />
                    </div>
                 </div>
                 <div className="bg-black/50 p-8 rounded-2xl border border-white/5 font-mono text-[10px] text-slate-400 space-y-4 min-h-[300px]">
                    <div className="flex gap-4">
                       <span className="text-slate-700">14:02:11</span>
                       <span className="text-toxic/80">&gt;&gt; RUNNING_VITALS_BUILD_6.4.2</span>
                    </div>
                    <div className="flex gap-4">
                       <span className="text-slate-700">14:02:15</span>
                       <span>&gt;&gt; CALCULATING_CHUNK_HASHES...</span>
                    </div>
                    <div className="flex gap-4">
                       <span className="text-slate-700">14:02:22</span>
                       <span className="text-emerald-500">&gt;&gt; [SUCCESS] CID: QmYp9V...8Zp2</span>
                    </div>
                    <div className="flex gap-4">
                       <span className="text-slate-700">14:02:23</span>
                       <span>&gt;&gt; DNSLINK_RECORDS_MAPPED: .nft / .sol</span>
                    </div>
                    <div className="flex gap-4">
                       <span className="text-slate-700">14:02:24</span>
                       <span className="text-white">&gt;&gt; AWAITING_MANUAL_HANDSHAKE_READY</span>
                    </div>
                 </div>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/10 p-10 rounded-[40px] flex gap-8 items-start hover:bg-emerald-500/10 transition-colors">
                 <div className="p-5 bg-emerald-500/20 rounded-3xl border border-emerald-500/30">
                    <Globe className="w-8 h-8 text-emerald-400" />
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-xl font-display font-black text-white uppercase tracking-widest">Traditional DNS Setup</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-light">
                       If you have custom **NS (Name Server)** details from a registrar, you should enter them in your domain management dashboard (e.g. Unstoppable Domains or your DNS provider). This allows you to route traffic to traditional CDN nodes or custom servers instead of IPFS.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'assets' && (
        <div className="max-w-7xl mx-auto space-y-12 pt-12">
           <div className="bg-[#05070c] border border-white/10 p-12 rounded-[50px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                 <Coins className="w-64 h-64 text-indigo-500" />
              </div>
              <div className="max-w-xl space-y-8 relative z-10">
                 <div className="space-y-4">
                    <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.4em]">Protocol Yield</p>
                    <h2 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">Vault Management</h2>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Liquid Balance</p>
                       <p className="text-4xl font-mono font-bold text-white tracking-tighter">{formatNumber(nft.unclaimedVital || 0)} <span className="text-xs text-indigo-500">$VITAL</span></p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Total Sovereign Stake</p>
                       <p className="text-4xl font-mono font-bold text-indigo-400 tracking-tighter">{formatNumber(user.vitalsTStaked || 0)} <span className="text-xs text-indigo-500">$VT-T</span></p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <button onClick={claim} className="flex-1 py-6 bg-white text-slate-950 text-xs font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-slate-200 transition-all shadow-xl shadow-white/5">Harvest Rewards</button>
                    <button onClick={stakeVitals} className="flex-1 py-6 border border-white/10 text-white text-xs font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-white/5 transition-all">Stake Suite</button>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Network Multiplier', val: '2.84x', col: 'text-indigo-400' },
                { label: 'Burn Rate (24h)', val: '12.4K', col: 'text-rose-500' },
                { label: 'Active Oracles', val: '1,442', col: 'text-emerald-400' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl space-y-4">
                   <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{stat.label}</p>
                   <p className={cn("text-3xl font-mono font-bold uppercase", stat.col)}>{stat.val}</p>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'Sovereign': return 'text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-amber-500/5';
    case 'Nexus': return 'text-toxic border-toxic/30 bg-toxic/10 shadow-toxic/5';
    case 'Pulse': return 'text-rose-400 border-red-500/30 bg-red-500/10 shadow-red-500/5';
    default: return 'text-slate-400 border-slate-700 bg-slate-800/10';
  }
};

const getStateColor = (state: string) => {
  switch (state) {
    case 'Immortal': return 'text-cyan-400';
    case 'Ascendant': return 'text-purple-400';
    case 'Thriving': return 'text-amber-400';
    case 'Resilient': return 'text-blue-400';
    case 'Vital': return 'text-emerald-400';
    case 'Stressed': return 'text-orange-500';
    case 'Critical': return 'text-red-500';
    default: return 'text-slate-500';
  }
};

const OrganIcon = ({ organ, className }: { organ: string, className?: string }) => {
  switch (organ) {
    case 'Heart': return <Heart className={className} />;
    case 'Brain': return <Brain className={className} />;
    case 'Lungs': return <Activity className={className} />;
    case 'Gut': return <Flame className={className} />;
    case 'Skin': return <Droplets className={className} />;
    default: return <Zap className={className} />;
  }
};

const BioGraph = () => {
  return (
    <div className="w-full h-16 relative overflow-hidden group">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <motion.path
          d="M 0 32 Q 50 10 100 32 T 200 32 T 300 32 T 400 32"
          fill="none"
          stroke="rgba(0, 255, 65, 0.5)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: 1,
            d: [
              "M 0 32 Q 50 10 100 32 T 200 32 T 300 32 T 400 32",
              "M 0 32 Q 50 50 100 32 T 200 32 T 300 32 T 400 32",
              "M 0 32 Q 50 10 100 32 T 200 32 T 300 32 T 400 32"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 40 Q 50 20 100 40 T 200 40 T 300 40 T 400 40"
          fill="none"
          stroke="rgba(16, 185, 129, 0.3)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: 1,
            d: [
              "M 0 40 Q 50 20 100 40 T 200 40 T 300 40 T 400 40",
              "M 0 40 Q 50 60 100 40 T 200 40 T 300 40 T 400 40",
              "M 0 40 Q 50 20 100 40 T 200 40 T 300 40 T 400 40"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-black/40" />
    </div>
  );
};

const VitalOS = ({ nft, user, sync, claim, evolve, activate, pairWearable, activateHardware, buy, setTarget, swapVitals, stakeVitals, unstakeVitals, logProgress, setView }: any) => {
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [battery, setBattery] = useState(88);
  const [hardwareBattery, setHardwareBattery] = useState(92);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [isHardwareSynced, setIsHardwareSynced] = useState(nft.isHardwareBound || false);
  const [networkSignal, setNetworkSignal] = useState(4);
  const [dialedNumber, setDialedNumber] = useState('');
  const [isScanningGuardian, setIsScanningGuardian] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isScanningGuardian) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanningGuardian(false);
            addNotification('Global Deep Scan Complete', 'success');
            return 0;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanningGuardian]);
  const [terminalHistory, setTerminalHistory] = useState<string[]>(['VitalOS Enclave [Version 1.4.0.8842]', 'System integrity check... OK', 'Ready for command...']);
  const [terminalInput, setTerminalInput] = useState('');
  const [notifications, setNotifications] = useState<{id: number, text: string, type: 'info' | 'warn' | 'success'}[]>([]);

  const addNotification = (text: string, type: 'info' | 'warn' | 'success' = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, text, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
  };

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    setTerminalHistory(prev => [...prev, `> ${terminalInput}`]);
    setTerminalInput('');

    // Command Logic
    setTimeout(() => {
      switch (cmd) {
        case 'help':
          setTerminalHistory(prev => [...prev, 'Available commands: help, sync, stats, wallet, hardware, clear, about']);
          break;
        case 'about':
          setTerminalHistory(prev => [...prev, 'VitalOS: The world\'s first sovereign biological operating system.', 'Connected to Grid Node #8842.']);
          break;
        case 'sync':
          setTerminalHistory(prev => [...prev, 'Starting biological handshake...', 'Verifying ZK-telemetry...', 'OK: Synchronicity reached 98.4%.', 'Rewards calculated: +12.4 $VITAL']);
          addNotification('Biological Sync Successful', 'success');
          break;
        case 'stats':
          setTerminalHistory(prev => [...prev, `Battery: ${battery}%`, `Hardware: ${hardwareBattery}%`, `Signal: ${networkSignal}/5`, 'Status: ACTIVE']);
          break;
        case 'clear':
          setTerminalHistory(['VitalOS Enclave [Cleared]']);
          break;
        case 'wallet':
          setTerminalHistory(prev => [...prev, `Address: ${user.walletAddress || 'NOT_CONNECTED'}`, `Balance: ${user.vitalsBalance || 0} $VITAL`]);
          break;
        case 'hardware':
          setTerminalHistory(prev => [...prev, isHardwareSynced ? 'State: PAIRED (V-ID_8842_S0V)' : 'State: UNPAIRED', 'Enclave: SECURE']);
          break;
        default:
          setTerminalHistory(prev => [...prev, `Command not found: ${cmd}. Type 'help' for options.`]);
      }
    }, 100);
  };

  useEffect(() => {
    // Battery API
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        setBattery(Math.round(batt.level * 100));
        batt.addEventListener('levelchange', () => {
          setBattery(Math.round(batt.level * 100));
        });
      });
    }

    // Network API
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      const updateNetwork = () => {
        if (conn.effectiveType === '4g') setNetworkSignal(5);
        else if (conn.effectiveType === '3g') setNetworkSignal(3);
        else setNetworkSignal(2);
      };
      updateNetwork();
      conn.addEventListener('change', updateNetwork);
    }

    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
      if (isHardwareSynced) {
        setHardwareBattery(prev => Math.max(1, prev - (Math.random() > 0.99 ? 1 : 0)));
      }
    }, 1000);
    
    const bootTimer = setTimeout(() => setIsBooting(false), 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(bootTimer);
    };
  }, [isHardwareSynced]);

  const apps: any[] = [
    { id: 'vpass', name: 'V-Pass', icon: Key, color: 'bg-toxic/20', content: (
      <div className="flex flex-col h-full bg-obsidian">
          <div className="p-8 pb-4 flex justify-between items-center">
             <div>
                <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter leading-none">V-Pass Enclave</h4>
                <p className="text-[10px] text-toxic font-black uppercase tracking-[0.2em] mt-1 text-glow-toxic">Web2.5 Sovereign Link: ACTIVE</p>
             </div>
             <button className="px-3 py-1 bg-toxic/10 border border-toxic/30 rounded-full text-[8px] text-toxic font-black uppercase">ZK-Verified</button>
          </div>
        
        <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-8 scrollbar-hide">
           {/* Email to Wallet Link */}
           <div className="p-8 liquid-metal rounded-[40px] space-y-6">
              <div className="flex justify-between items-start">
                 <div className="space-y-1">
                    <p className="text-[10px] text-toxic font-black uppercase tracking-widest">Master Identity Bridge</p>
                    <p className="text-xl font-display font-black text-white uppercase tracking-tighter">Email-to-Solana</p>
                 </div>
                 <RefreshCw className="w-6 h-6 text-toxic animate-spin-slow" />
              </div>
              
              <div className="space-y-4">
                 <div className="p-4 bg-black/60 rounded-2xl border border-white/5 space-y-1 group hover:border-toxic/30 transition-all cursor-pointer">
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest flex justify-between">
                       Legacy Entry 
                       <span className="text-emerald-500">BOUND</span>
                    </p>
                    <p className="text-sm font-mono text-white">founder@vitalos.space</p>
                 </div>
                 <div className="p-4 bg-toxic/5 rounded-2xl border border-toxic/20 space-y-1">
                    <p className="text-[8px] text-toxic font-black uppercase tracking-widest">On-Chain Asset Hash</p>
                    <p className="text-xs font-mono text-toxic/70">0xVital...8827</p>
                 </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 font-mono text-[9px] text-slate-400 space-y-2">
                 <p className="text-white font-bold uppercase tracking-widest">Deployment Technicals:</p>
                 <p>&gt; Access VitalOS via <span className="text-toxic">vitalos.space</span> or on-device email login.</p>
                 <p>&gt; Sign-in creates a ZK-Handshake. Your private key (PK) is derived only in memory via <span className="text-toxic">WebAuthn/Passkeys</span>.</p>
                 <p>&gt; No manual PK management. Your email is the cryptographic anchor.</p>
              </div>
           </div>

           {/* Deployment Whitepaper Section */}
           <div className="space-y-4">
              <h5 className="text-[10px] text-bronze font-black uppercase tracking-widest px-2">Launch Protocol & Security</h5>
              <div className="space-y-3">
                 {[
                   { 
                     title: "Isolated Enclave Protection", 
                     desc: "If your Android/iOS is attacked, VitalOS stays locked. All OS data is encrypted via ZK-enclave, requiring a biometric signing event that bypasses the host kernel.",
                     icon: ShieldCheck 
                   },
                   { 
                     title: "dNFT Ownership Gating", 
                     desc: "Full installation requires the V-OS dNFT. After a 15-day on-chain trial, users must stake $VITAL or mint the dNFT to maintain system persistence.",
                     icon: Puzzle
                   },
                   { 
                     title: "Zero-Knowledge Auth", 
                     desc: "Sign transactions with standard biometric (FaceID/TouchID). Passkeys store your shard, ensuring no attacker can extract your PK from the browser cache.",
                     icon: Smartphone
                   }
                 ].map((doc, i) => (
                   <div key={i} className="p-5 bg-white/[0.03] border border-white/5 rounded-[28px] space-y-3 group hover:bg-white/[0.06] transition-all">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-xl bg-toxic/10 border border-toxic/20 flex items-center justify-center">
                            <doc.icon className="w-4 h-4 text-toxic" />
                         </div>
                         <h6 className="text-[11px] font-black text-white uppercase tracking-tighter">{doc.title}</h6>
                      </div>
                      <p className="text-[9px] text-slate-500 font-light leading-relaxed">{doc.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    )},
    { id: 'manifesto', name: 'Briefing', icon: BookOpen, color: 'bg-bronze/20', content: (
      <div className="flex flex-col h-full bg-obsidian">
        <div className="p-8 pb-4">
           <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">System Manifesto</h4>
           <p className="text-[10px] text-bronze font-black uppercase tracking-[0.2em] mt-1 text-glow-toxic">CONFIDENTIAL LAUNCH BRIEF</p>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-8 scrollbar-hide text-[11px] leading-relaxed font-light text-slate-400">
           <div className="p-8 liquid-metal rounded-[40px] space-y-6">
              <h5 className="text-toxic font-black uppercase tracking-widest text-sm">Sale & Deployment Strategy</h5>
              <p>To scale <span className="text-white font-bold">vitalos.space</span> without compromise, we utilize a <span className="text-white">Dual-Gating Mechanism</span>:</p>
              <ul className="space-y-4">
                 <li>
                    <span className="text-white font-bold block mb-1">1. 15-Day On-Chain Trial:</span> 
                    New users access the full OS via web-app. Their activity is logged as temporary ZK-proofs on the testnet.
                 </li>
                 <li>
                    <span className="text-white font-bold block mb-1">2. dNFT / Token Gate:</span> 
                    Post-trial, users must prove ownership of the <span className="text-toxic">VitalOS Genesis dNFT</span> or stake a set amount of $VITAL. This prevents botting and sybil attacks.
                 </li>
              </ul>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-3">
                 <Lock className="w-5 h-5 text-rose-500" />
                 <h6 className="text-white font-bold uppercase tracking-widest">Anti-Exploit Enclosure</h6>
                 <p className="text-[10px]">Since VitalOS is a web-app, it operates in a separate browser context (Process Isolation). Even if the host Android device is rooted, the browser sandbox prevents memory scraping of the V-Pass Enclave.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-3">
                 <Mail className="w-5 h-5 text-toxic" />
                 <h6 className="text-white font-bold uppercase tracking-widest">Email Sovereignty</h6>
                 <p className="text-[10px]">The "Standard Email" link uses a custom <span className="text-toxic">OIDC to Web3 Bridge</span>. It generates a non-custodial address from the user's email entropy, ensuring only the email owner can recover the account.</p>
              </div>
           </div>

           <div className="p-8 bg-bronze/10 border border-bronze/30 rounded-[40px] text-center space-y-4">
              <h5 className="text-white font-black uppercase tracking-[0.2em]">Market Launch Notice</h5>
              <p>We are selling biological excellence. Launch starts on X (Twitter) via Genesis Whitelisting. Each dNFT represents physical ownership of the OS kernel.</p>
              <button className="px-8 py-3 bg-bronze text-black font-black uppercase tracking-widest rounded-xl text-[10px]">View Tokenomics</button>
           </div>
        </div>
      </div>
    )},
    { id: 'cloud', name: 'V-Stream', icon: Video, color: 'bg-toxic/20', content: (
      <div className="flex flex-col h-full bg-obsidian">
        <div className="p-8 pb-4 flex justify-between items-center">
           <div>
              <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter text-glow-toxic">Media Enclave</h4>
              <p className="text-[10px] text-toxic font-black uppercase tracking-[0.5em] mt-1 text-glow-toxic">Proprietary V-Codec v4.2</p>
           </div>
           <div className="px-3 py-1 bg-toxic/10 border border-toxic/30 rounded-full text-[8px] text-toxic font-black animate-pulse uppercase tracking-widest">Live: MINTING</div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-8 scrollbar-hide">
           {/* Visualizer / Preview */}
           <div className="relative aspect-video bg-black rounded-[40px] border border-white/10 overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center grayscale opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                 <div className="px-2 py-1 bg-toxic text-black rounded text-[8px] font-black uppercase">Nano-Comp Lvl 4</div>
                 <div className="px-2 py-1 bg-black/60 backdrop-blur-md text-white rounded text-[8px] font-mono">0.024 MB/s</div>
              </div>

              {/* Bit-stream visualization */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                 <div className="flex items-center gap-1">
                    {[...Array(32)].map((_, i) => (
                       <motion.div 
                         key={i}
                         animate={{ height: [10, 40, 10], opacity: [0.3, 1, 0.3] }}
                         transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                         className="w-1 bg-toxic rounded-full"
                       />
                    ))}
                 </div>
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-white uppercase">Sovereign Stream Hash</p>
                    <p className="text-[8px] text-toxic/70 italic">0x8a7...f1e</p>
                 </div>
                 <div className="w-10 h-10 bg-toxic rounded-full flex items-center justify-center shadow-lg shadow-toxic/40 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5 text-black" />
                 </div>
              </div>
           </div>

           {/* Codec Advantage Stats */}
           <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-toxic/5 border border-toxic/10 rounded-[32px] space-y-2">
                 <Binary className="w-5 h-5 text-toxic" />
                 <div className="space-y-0.5">
                    <p className="text-xl font-display font-black text-white leading-none">99.9%</p>
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Efficiency</p>
                 </div>
              </div>
              <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-[32px] space-y-2">
                 <ShieldCheck className="w-5 h-5 text-emerald-400" />
                 <div className="space-y-0.5">
                    <p className="text-xl font-display font-black text-white leading-none">ZK-Frame</p>
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Integrity</p>
                 </div>
              </div>
           </div>

           {/* Corporate / Market Copy */}
           <div className="p-8 liquid-metal rounded-[40px] space-y-4">
              <h5 className="text-[10px] text-toxic font-black uppercase tracking-widest">Enterprise Protocol</h5>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                 The <span className="text-white font-bold italic">V-Codec</span> is a uniquely developed, proprietary algorithm that renders traditional media standards obsolete. Film corporations and broadcasters can now stream 8K data with 99% bandwidth efficiency—fully <span className="text-toxic">minted as a smart contract</span> during transport.
              </p>
              <button className="w-full py-4 bg-toxic text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all">
                 License Engine V2
              </button>
           </div>
        </div>
      </div>
    )},
    { id: 'vitals', name: 'Vital Stats', icon: Activity, color: 'bg-rose-500', content: (
      <div className="flex flex-col h-full bg-slate-950/50 p-8 space-y-8">
        <div className="flex justify-between items-center">
           <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Bio Telemetry</h4>
           <Activity className="w-6 h-6 text-rose-500 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           {[
             { label: 'Heart Rate', val: '72', unit: 'BPM', icon: Heart, color: 'text-rose-500' },
             { label: 'Oxygen', val: '98', unit: '%', icon: Droplets, color: 'text-blue-500' },
             { label: 'Sleep', val: '7.2', unit: 'Hrs', icon: Moon, color: 'text-indigo-500' },
             { label: 'Stress', val: 'Low', unit: 'Index', icon: Brain, color: 'text-purple-500' }
           ].map((stat, i) => (
             <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                <div className="flex justify-between items-start">
                   <stat.icon className={cn("w-4 h-4", stat.color)} />
                   <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest leading-none">{stat.unit}</span>
                </div>
                <div className="space-y-0.5">
                   <p className="text-2xl font-bold font-mono text-white leading-none">{stat.val}</p>
                   <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-40">
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">Frequency Stability</p>
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stepsData}>
                 <defs>
                    <linearGradient id="colorBio" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <Area type="monotone" dataKey="steps" stroke="#f43f5e" fillOpacity={1} fill="url(#colorBio)" />
              </AreaChart>
           </ResponsiveContainer>
        </div>

        <div className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(244,63,94,0.1),_transparent)]" />
           <Dna className="w-20 h-20 text-rose-500/20 absolute -right-4 -bottom-4 rotate-12" />
           <div className="relative z-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
                 <Activity className="w-8 h-8 text-rose-500" />
              </div>
              <div className="space-y-1">
                 <h5 className="text-sm font-black text-white uppercase tracking-widest">Biological Sync</h5>
                 <p className="text-[10px] text-slate-500 font-medium">Last hardware handshake: 2m ago</p>
              </div>
              <button 
                onClick={() => addNotification('Biological handshake initiated...', 'info')}
                className="px-8 py-2 bg-rose-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Sync Now
              </button>
           </div>
        </div>
      </div>
    )},
    { id: 'stack', name: 'Vital Stack', icon: FlaskConical, color: 'bg-emerald-600', content: (
      <div className="flex flex-col h-full bg-slate-950/50 p-8 space-y-8">
        <div className="flex justify-between items-center">
           <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Supplement Stack</h4>
           <Layers className="w-6 h-6 text-emerald-500" />
        </div>
        
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 space-y-4">
           <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Current Protocol: FOUNDER_LEVEL_01</p>
           <div className="space-y-3">
              {[
                { name: 'Nootropic Blend', dose: '250mg', time: 'Morning' },
                { name: 'Recovery Complex', dose: '100mg', time: 'Evening' },
                { name: 'Bio-Vitamins', dose: '1 unit', time: 'Morning' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                   <div>
                      <p className="text-[10px] font-bold text-white uppercase">{item.name}</p>
                      <p className="text-[8px] text-slate-500 font-bold uppercase">{item.dose}</p>
                   </div>
                   <span className="text-[8px] text-emerald-500 font-black uppercase">{item.time}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
           <h5 className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Protocol Insight</h5>
           <div className="p-5 bg-white/5 border border-white/10 rounded-2xl text-[11px] text-slate-300 leading-relaxed font-light italic">
             "Your heart rate variability indicates high sympathetic stress. Protocol adjusted: +50mg L-Theanine recommended to stabilize baseline focus."
           </div>
           <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-900/20 active:scale-95 transition-all">
             Order Custom Batch
           </button>
        </div>
      </div>
    )},
    { id: 'phone', name: 'Phone', icon: Phone, color: 'bg-emerald-500', content: (
      <div className="flex flex-col h-full bg-slate-950/50">
        <div className="p-8 pb-4 space-y-4">
           <div className="flex justify-between items-center">
              <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">VoIP Carrier</h4>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Active</span>
              </div>
           </div>
           <div className="bg-slate-900 p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Phone className="w-16 h-16 text-white" /></div>
              <div className="text-center space-y-1 relative z-10">
                 <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">Ready for Handshake</p>
                 <div className="text-4xl font-mono font-bold text-white tracking-widest h-10">{dialedNumber || '0.0.0.0'}</div>
              </div>
           </div>
        </div>
        <div className="flex-1 px-8 grid grid-cols-3 gap-3 self-center max-h-[400px]">
           {[1,2,3,4,5,6,7,8,9, '*', 0, '#'].map(i => (
             <button 
               key={i} 
               onClick={() => {
                 setDialedNumber(prev => (prev + String(i)).slice(0, 15));
                 addNotification(`Digit Entered: ${i}`, 'info');
               }}
               className="w-16 h-16 bg-white/5 rounded-full flex flex-col items-center justify-center border border-white/10 hover:bg-white/10 active:scale-95 transition-all text-white"
             >
                <span className="text-xl font-mono font-bold leading-none">{i}</span>
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-tighter mt-0.5">
                   {i === 2 ? 'abc' : i === 3 ? 'def' : i === 4 ? 'ghi' : i === 5 ? 'jkl' : i === 6 ? 'mno' : i === 7 ? 'pqrs' : i === 8 ? 'tuv' : i === 9 ? 'wxyz' : ''}
                </span>
             </button>
           ))}
        </div>
        <div className="p-8 flex gap-4">
           <button 
             onClick={() => {
               if (dialedNumber) {
                 window.location.href = `tel:${dialedNumber}`;
                 addNotification('Initiating Transmit...', 'success');
               }
             }}
             className={cn("flex-1 py-5 rounded-2xl flex items-center justify-center shadow-2xl transition-all", dialedNumber ? "bg-emerald-500 shadow-emerald-500/20" : "bg-emerald-500/20 opacity-50")}
           >
              <div className="flex items-center gap-3">
                 <Phone className="w-5 h-5 text-white" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Transmit</span>
              </div>
           </button>
           <button 
             onClick={() => setDialedNumber(prev => prev.slice(0, -1))}
             className="w-20 py-5 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/5 hover:bg-white/20 transition-all"
           >
              <X className="w-4 h-4" />
           </button>
        </div>
      </div>
    )},
    { id: 'sms', name: 'Messages', icon: MessageSquare, color: 'bg-indigo-600', content: (
      <div className="flex flex-col h-full bg-slate-950/50">
         <div className="p-8 pb-4 flex justify-between items-center">
            <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Encrypted SMS</h4>
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20"><MessageSquare className="w-5 h-5 text-indigo-400" /></div>
         </div>
         <div className="flex-1 px-4 overflow-y-auto space-y-3 pb-8">
            {[
              { from: 'Oracle', msg: 'System check complete. All nodes green.', time: 'Now', unread: true },
              { from: 'Grid Protocol', msg: 'Verification key 8842 shared with hardware.', time: '12m', unread: true },
              { from: 'V-OS Market', msg: 'Your license for App IDE has been activated.', time: '2h', unread: false }
            ].map((msg, i) => (
              <div key={i} className={cn("p-5 rounded-[28px] border transition-all cursor-pointer group", msg.unread ? "bg-indigo-600/10 border-indigo-600/30" : "bg-white/5 border-white/5 opacity-60 hover:opacity-100")}>
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{msg.from}</span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase">{msg.time}</span>
                 </div>
                 <p className="text-xs text-white/90 leading-relaxed font-light">{msg.msg}</p>
              </div>
            ))}
         </div>
         <div className="p-6 bg-black/40 border-t border-white/5 flex gap-4">
            <div className="flex-1 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center px-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">Compose Secure...</div>
            <button className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20"><Zap className="w-4 h-4 fill-white" /></button>
         </div>
      </div>
    )},
    { id: 'whatsapp_bis', name: 'WhatsApp Biz', icon: MessageCircle, color: 'bg-emerald-700', content: (
      <div className="flex flex-col h-full bg-[#075e54]">
         <div className="p-6 pt-12 bg-[#075e54] flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Activity className="w-6 h-6 text-white" />
               <h4 className="text-xl font-bold text-white uppercase tracking-tighter leading-none">V-Business</h4>
            </div>
            <div className="flex gap-4">
               <Search className="w-5 h-5 text-white/70" />
               <X className="w-5 h-5 text-white/70" />
            </div>
         </div>
         <div className="flex-1 bg-[#121b22] overflow-y-auto">
            {[
              { name: "Hardware Supplier #2", msg: "Batch 02 Ready for shipment.", time: "09:42", unread: 2 },
              { name: "Novice Deployer", msg: "DAO verification success.", time: "Yesterday", unread: 0 },
              { name: "Grid Council", msg: "Prop 88 needs your signature.", time: "Monday", unread: 1 }
            ].map((chat, i) => (
              <div key={i} className="p-5 border-b border-white/5 flex gap-4 hover:bg-white/5 cursor-pointer">
                 <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white/40 font-black uppercase">{chat.name[0]}</div>
                 <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                       <span className="font-bold text-white">{chat.name}</span>
                       <span className="text-[10px] text-white/40 font-mono">{chat.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <p className="text-xs text-white/60 truncate">{chat.msg}</p>
                       {chat.unread > 0 && <span className="bg-emerald-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{chat.unread}</span>}
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    )},
    { id: 'vtok', name: 'V-Tok', icon: Music2, color: 'bg-black', content: (
      <div className="h-full bg-black relative flex flex-col pt-12 overflow-hidden">
         <div className="flex justify-center gap-6 text-white text-[10px] font-black uppercase tracking-widest relative z-20">
            <span className="opacity-50">On-Chain Feed</span>
            <span className="border-b-2 border-toxic text-toxic pb-1">Sovereign Stream</span>
         </div>
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 group relative">
               <img src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt="TikTok" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
               
               <div className="absolute bottom-24 left-6 text-white space-y-3 max-w-[280px]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-toxic bg-black/40 flex items-center justify-center text-[10px] font-black">V</div>
                    <p className="font-black text-sm uppercase tracking-tighter">@vital_enclave</p>
                    <span className="text-[8px] bg-toxic/20 text-toxic border border-toxic/30 px-1 rounded">VERIFIED_HOST</span>
                  </div>
                  <p className="text-xs font-light leading-relaxed">Streaming biometric hash data directly to the Vital Grid. #Sovereignty #Web3 #BioHacking</p>
                  <div className="flex items-center gap-2 text-toxic">
                     <Music2 className="w-3 h-3" />
                     <span className="text-[10px] font-mono animate-pulse">0x8842_Sync_Pulse.mp3</span>
                  </div>
               </div>
               
               <div className="absolute right-4 bottom-32 flex flex-col items-center gap-8">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center hover:bg-toxic/20 transition-all cursor-pointer group"><Heart className="w-6 h-6 text-white group-hover:text-rose-500 group-hover:fill-rose-500" /></div>
                    <span className="text-[8px] font-black">1.2M</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center hover:bg-toxic/20 transition-all cursor-pointer group"><MessageCircle className="w-6 h-6 text-white" /></div>
                    <span className="text-[8px] font-black">44K</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-full border border-toxic/40 flex items-center justify-center hover:bg-toxic/20 transition-all cursor-pointer group"><Zap className="w-6 h-6 text-toxic animate-pulse" /></div>
                    <span className="text-[8px] font-black text-toxic">MINT</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden animate-spin-slow">
                    <img src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=100" alt="Disc" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    )},
    { id: 'vgram', name: 'V-Gram', icon: Camera, color: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600', content: (
      <div className="flex flex-col h-full bg-[#030509] text-white">
         <div className="p-6 pt-12 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-xl sticky top-0 z-20">
            <h4 className="font-display font-black text-2xl tracking-tighter uppercase text-toxic">V-Gram</h4>
            <div className="flex gap-6">
               <div className="relative">
                  <Heart className="w-6 h-6" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-toxic rounded-full" />
               </div>
               <MessageCircle className="w-6 h-6" />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto space-y-12 pb-24 scrollbar-hide">
            {/* Decentralized Stories */}
            <div className="px-4 py-6 flex gap-4 overflow-x-auto scrollbar-hide border-b border-white/5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-toxic to-indigo-500 p-0.5 shadow-lg shadow-toxic/10">
                    <div className="w-full h-full bg-black rounded-full border-2 border-black flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                    </div>
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Node_{i}</span>
                </div>
              ))}
            </div>

            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-4">
                 <div className="px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full border border-toxic/30 p-0.5 overflow-hidden"><img src={`https://i.pravatar.cc/150?u=post${i}`} alt="Avatar" /></div>
                       <div className="text-left">
                          <p className="text-[10px] font-black text-white uppercase tracking-tighter">Pioneer_Node_{i}</p>
                          <p className="text-[8px] text-toxic/70 font-mono">0xV...{i}4A2</p>
                       </div>
                    </div>
                    <button onClick={() => addNotification('IPFS link copied', 'success')}><RefreshCw className="w-4 h-4 text-slate-600" /></button>
                 </div>
                 <div className="aspect-square bg-slate-900 border-y border-white/5 overflow-hidden relative group">
                    <img src={`https://images.unsplash.com/photo-${1550745165 + i * 100}?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Post" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/20 text-[8px] font-black uppercase tracking-widest">NFT Certified</div>
                 </div>
                 <div className="px-8 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-6">
                         <Heart className="w-6 h-6 text-toxic fill-toxic/10 group-hover:fill-toxic transition-all" />
                         <MessageCircle className="w-6 h-6" />
                         <Share2 className="w-6 h-6" />
                      </div>
                      <Puzzle className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs font-black leading-tight">MINTED BY 142 NODES</p>
                      <p className="text-xs font-light mt-1"><span className="font-black text-toxic uppercase">Pioneer_Node_{i}</span> Syncing my biological frequencies with the mainnet core has never felt more sovereign. #VitalOS #Web3</p>
                    </div>
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">View On-Chain Conversation (12 comments)</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    )},
    { id: 'vconnect', name: 'V-Connect', icon: Facebook, color: 'bg-blue-600', content: (
      <div className="flex flex-col h-full bg-[#030509] text-[#e4e6eb]">
         <div className="p-6 pt-12 bg-black/40 border-b border-white/5 flex justify-between items-center sticky top-0 z-20 backdrop-blur-xl">
            <h4 className="text-2xl font-black italic tracking-tighter text-indigo-500">V-Connect</h4>
            <div className="flex gap-3">
               <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all"><Search className="w-5 h-5" /></div>
               <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all"><BarChart2 className="w-5 h-5" /></div>
            </div>
         </div>
         <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide pb-24">
            <div className="bg-white/5 p-6 rounded-[32px] border border-white/10 space-y-4 shadow-xl">
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 text-indigo-400 font-black">V</div>
                  <div className="flex-1 h-12 bg-black/40 rounded-2xl px-6 flex items-center text-slate-400 text-xs font-light">Broadcast to the social graph...</div>
               </div>
               <div className="flex border-t border-white/5 pt-4 gap-2">
                  {['Live Stream', 'Bio-Vault', 'Handshake'].map(a => (
                    <button key={a} onClick={() => addNotification(`${a} active`, 'info')} className="flex-1 py-2 bg-white/5 rounded-xl text-[8px] font-black uppercase tracking-widest text-slate-300 hover:bg-indigo-500 hover:text-white transition-all">{a}</button>
                  ))}
               </div>
            </div>

            {[1, 2].map(i => (
              <div key={i} className="bg-white/[0.03] p-8 rounded-[40px] border border-white/5 space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-toxic/10 rounded-full flex items-center justify-center border border-toxic/20 text-toxic font-black uppercase tracking-tighter">GC</div>
                       <div>
                          <p className="text-sm font-black text-white uppercase tracking-widest">Vital Grid Council</p>
                          <p className="text-[9px] text-slate-500 font-black uppercase">Decentralized Governance • 4h ago</p>
                       </div>
                    </div>
                    <button className="px-3 py-1 bg-toxic/10 text-toxic text-[8px] font-black uppercase rounded-full border border-toxic/20">Follow Node</button>
                 </div>
                 <p className="text-xs text-slate-300 font-light leading-relaxed">The epoch 8842 voting cycle is now open. All dNFT holders are invited to signal their preference for the next kernel distribution parameters.</p>
                 <div className="aspect-video bg-black/40 rounded-3xl border border-white/5 overflow-hidden group relative">
                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-1000" alt="Governance" />
                    <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center"><Zap className="w-8 h-8 text-white fill-white" /></div>
                    </div>
                 </div>
                 <div className="flex gap-8 pt-2">
                    <button className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest"><Heart className="w-4 h-4 fill-indigo-400" /> 1.2K Votes</button>
                    <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest"><MessageCircle className="w-4 h-4" /> Delegate Access</button>
                 </div>
              </div>
            ))}
         </div>
      </div>
    )},
    { id: 'vnode', name: 'V-Node', icon: Twitter, color: 'bg-black', content: (
      <div className="flex flex-col h-full bg-black text-white">
         <div className="p-6 pt-12 border-b border-white/5 flex items-center justify-between bg-black/80 backdrop-blur-xl sticky top-0 z-20">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-black text-xl">X</div>
            <div className="flex gap-6"><Settings className="w-5 h-5 text-slate-500" /></div>
         </div>
         <div className="flex-1 overflow-y-auto px-4 divide-y divide-white/5 scrollbar-hide pb-24">
            {[
              { author: "SovereignNode", handle: "0x8842...4411", msg: "Censorship-resistant microblogging is not just a feature, it's a biological right. #VitalOS #FreeSpeech", time: "2m", likes: "14K" },
              { author: "GridWatcher", handle: "grid_intel", msg: "Unusual activity detected in the entropy pool. Handshake protocols intensifying. Stay alert pioneers.", time: "15m", likes: "822" },
              { author: "Founder88", handle: "genesis_auth", msg: "Batch 01 hardware has arrived. The bridge is complete.", time: "1h", likes: "4.4K" }
            ].map((tweet, i) => (
              <div key={i} className="py-6 flex gap-4 hover:bg-white/[0.02] transition-all cursor-pointer px-2">
                 <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center font-black text-xs text-slate-600">{tweet.author[0]}</div>
                 <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                       <span className="text-[11px] font-black uppercase tracking-tighter">{tweet.author}</span>
                       <span className="text-[9px] text-slate-500 font-mono">@{tweet.handle} • {tweet.time}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-light leading-relaxed">{tweet.msg}</p>
                    <div className="flex justify-between items-center pt-2 max-w-[240px]">
                       <button className="flex items-center gap-1.5 text-[9px] text-slate-500 group"><MessageCircle className="w-3.5 h-3.5 group-hover:text-blue-400" /> 24</button>
                       <button className="flex items-center gap-1.5 text-[9px] text-slate-500 group"><RefreshCw className="w-3.5 h-3.5 group-hover:text-toxic" /> 142</button>
                       <button className="flex items-center gap-1.5 text-[9px] text-slate-500 group"><Heart className="w-3.5 h-3.5 group-hover:text-rose-500" /> {tweet.likes}</button>
                       <button className="flex items-center gap-1.5 text-[9px] text-slate-500 group"><BarChart2 className="w-3.5 h-3.5 group-hover:text-blue-400" /></button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    )},
    { id: 'metamask', name: 'MetaMask', icon: Wallet, color: 'bg-orange-500', content: (
      <div className="flex flex-col h-full bg-slate-900 text-white">
         <div className="p-6 pt-12 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center"><Wallet className="w-4 h-4 text-white" /></div>
               <span className="text-[10px] font-black uppercase tracking-widest">Vital Grid Network</span>
            </div>
            <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-[7px] text-emerald-500 font-black uppercase">Live</div>
         </div>
         <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-8 overflow-y-auto">
            <div className="w-24 h-24 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center relative">
               <img src="https://metamask.io/favicon.ico" className="w-12 h-12" alt="MM" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-orange-400/20 blur-2xl animate-pulse rounded-full" />
            </div>
            <div className="text-center space-y-1">
               <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em]">Balance</p>
               <h3 className="text-5xl font-mono font-bold tracking-tighter">0.124 ETH</h3>
               <p className="text-xs text-emerald-400 font-mono">+$1,202.40 (Active Yield)</p>
            </div>
            <div className="flex gap-4 w-full">
               {['Buy', 'Send', 'Swap'].map(action => (
                 <button key={action} className="flex-1 py-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex flex-col items-center gap-2 hover:bg-orange-500 hover:text-white transition-all group">
                    <Activity className="w-4 h-4 group-hover:scale-125 transition-transform" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{action}</span>
                 </button>
               ))}
            </div>
            <div className="w-full pt-8 border-t border-white/5 space-y-4">
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Recent Signatures</p>
               {[
                 { name: "Hardware Unlock", val: "-0.002ETH", status: "Verified" },
                 { name: "Grid Reward", val: "+12.0VTL", status: "Success" }
               ].map((tx, i) => (
                 <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div><p className="text-[10px] font-bold text-white uppercase">{tx.name}</p><p className="text-[8px] text-slate-500 font-mono">{tx.val}</p></div>
                    <span className="text-[8px] text-emerald-500 font-black uppercase px-2 py-0.5 bg-emerald-500/10 rounded">{tx.status}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    )},
    { id: 'phantom', name: 'Phantom', icon: Ghost, color: 'bg-purple-600', content: (
      <div className="flex flex-col h-full bg-[#1e143c] text-white">
         <div className="p-6 pt-12 flex justify-between items-center">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
               <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:animate-ping" />
               <span className="text-[9px] font-mono tracking-widest">8842...S0V</span>
            </div>
            <div className="flex gap-6"><Settings className="w-5 h-5 text-indigo-400" /><X className="w-5 h-5 text-white/50" /></div>
         </div>
         <div className="flex-1 p-8 space-y-12">
            <div className="text-center space-y-3">
               <h3 className="text-6xl font-mono font-bold tracking-widest">$982.02</h3>
               <p className="text-[10px] text-indigo-300 font-black uppercase tracking-[0.4em]">+12.4% THIS PERIOD</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { name: 'Solana', bal: '4.22 SOL', color: 'bg-emerald-500' },
                 { name: 'Vital Shares', bal: '884 VTL', color: 'bg-indigo-500' }
               ].map((asset, i) => (
                 <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-[32px] space-y-4 hover:bg-white/10 transition-all relative overflow-hidden group cursor-pointer">
                    <div className={cn("absolute -top-4 -right-4 w-12 h-12 rounded-full blur-2xl opacity-20", asset.color)} />
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">{asset.name}</p>
                    <p className="text-2xl font-mono font-bold leading-none">{asset.bal}</p>
                 </div>
               ))}
            </div>
            <div className="space-y-4 pt-12 border-t border-white/5">
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Active Collectibles</p>
               <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map(i => <div key={i} className="aspect-square bg-white/5 border border-white/5 rounded-2xl animate-pulse" />)}
               </div>
            </div>
         </div>
      </div>
    )},
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-rose-700', content: (
      <div className="flex flex-col h-full bg-[#0f0f0f] text-white">
         <div className="p-6 pt-12 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <Youtube className="w-7 h-7 text-rose-600 fill-rose-600" />
               <span className="text-2xl font-bold tracking-tighter">YouTube</span>
            </div>
            <div className="flex gap-6"><Search className="w-6 h-6" /><User className="w-6 h-6" /></div>
         </div>
         <div className="flex-1 overflow-y-auto space-y-8 pb-24">
            {[
              { t: "VitalOS Gen-0: The Future of Biotech", c: "Vital Research", v: "882K", time: "2h ago", thumb: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800" },
              { t: "Building the Biological Grid", c: "Code Council", v: "1.2M", time: "1d ago", thumb: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" }
            ].map((vid, i) => (
              <div key={i} className="space-y-4 cursor-pointer group">
                 <div className="aspect-video bg-white/5 relative overflow-hidden">
                    <img src={vid.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Vid" referrerPolicy="no-referrer" />
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-bold">12:44</div>
                 </div>
                 <div className="px-6 flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full shrink-0" />
                    <div className="space-y-1">
                       <h4 className="text-sm font-bold leading-snug line-clamp-2">{vid.t}</h4>
                       <p className="text-[10px] text-slate-500 font-bold uppercase">{vid.c} • {vid.v} views • {vid.time}</p>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    )},
    { id: 'twitch', name: 'Twitch', icon: Radio, color: 'bg-purple-600', content: (
      <div className="flex flex-col h-full bg-[#0e0e10] text-[#efeff1]">
         <div className="p-6 pt-12 flex justify-between items-center border-b border-white/5">
            <Radio className="w-8 h-8 text-purple-600" />
            <div className="flex gap-6"><Search className="w-6 h-6 outline-none" /><User className="w-6 h-6" /></div>
         </div>
         <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Sovereigns</p>
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 items-center group cursor-pointer">
                 <div className="relative shrink-0">
                    <div className="w-16 h-16 bg-white/5 rounded-full border-2 border-purple-600 p-0.5"><div className="w-full h-full bg-[#0e0e10] rounded-full" /></div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 bg-rose-600 rounded text-[6px] font-black uppercase">Live</div>
                 </div>
                 <div className="flex-1 space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest">Protocol_Live_{i}</p>
                    <p className="text-[9px] text-slate-500 font-medium">Developing Biological Enclave V2...</p>
                    <div className="flex gap-2">
                       <span className="px-1.5 py-0.5 bg-white/5 rounded text-[7px] font-black uppercase tracking-tighter">TypeScript</span>
                       <span className="px-1.5 py-0.5 bg-white/5 rounded text-[7px] font-black uppercase tracking-tighter">IRL</span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    )},
    { id: 'netflix', name: 'Netflix', icon: Play, color: 'bg-rose-900', content: (
      <div className="flex flex-col h-full bg-[#141414] text-white">
         <div className="p-6 pt-12 flex justify-between items-center">
            <h4 className="text-3xl font-black text-rose-600 tracking-tighter">VNET</h4>
            <div className="flex gap-6"><Search className="w-6 h-6" /><User className="w-6 h-6" /></div>
         </div>
         <div className="flex-1 overflow-y-auto pb-12">
            <div className="aspect-[2/3] bg-slate-900 relative mx-8 rounded-2xl overflow-hidden group transition-all hover:scale-[1.02] cursor-pointer">
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-50" alt="Featured" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
               <div className="absolute bottom-8 left-0 right-0 text-center space-y-4">
                  <h3 className="text-4xl font-display font-black uppercase tracking-tighter">The Grid</h3>
                  <div className="flex justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400"><span>Cerebral</span><span>•</span><span>Visual</span><span>•</span><span>Sci-Fi</span></div>
                  <button className="px-12 py-3 bg-white text-black rounded font-black text-xs uppercase tracking-widest">Play</button>
               </div>
            </div>
            <div className="mt-8 px-8 space-y-4">
               <p className="text-xs font-black uppercase tracking-widest text-white/70">Biological Documentaries</p>
               <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {[1, 2, 3, 4].map(i => <div key={i} className="min-w-[120px] aspect-[2/3] bg-white/5 rounded-lg border border-white/10 animate-pulse transition-all hover:scale-110 cursor-pointer" />)}
               </div>
            </div>
         </div>
      </div>
    )},
    { id: 'builder', name: 'App IDE', icon: Code, color: 'bg-indigo-600', content: (
      <div className="p-8 space-y-6 h-full bg-slate-950/50 flex flex-col font-mono text-[10px]">
        <div className="flex justify-between items-center">
           <h4 className="text-xl font-display font-black text-white uppercase tracking-tighter">Vital Terminal</h4>
           <div className="flex gap-2">
              <div className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 rounded text-[7px] text-indigo-400 font-black uppercase">Root Access</div>
              <Terminal className="w-5 h-5 text-indigo-400" />
           </div>
        </div>
        <div className="flex-1 bg-black/60 border border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col shadow-2xl relative group">
           <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity"><Brackets className="w-12 h-12 text-white" /></div>
           <div className="flex gap-1.5 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-hide text-indigo-300">
              {terminalHistory.map((line, i) => (
                <p key={i} className={cn(
                  "leading-relaxed",
                  line.startsWith('>') ? "text-white font-bold" : 
                  line.includes('OK') || line.includes('Success') ? "text-emerald-500" :
                  line.includes('Error') ? "text-rose-500" : ""
                )}>{line}</p>
              ))}
              <div id="terminal-end" />
           </div>

           <form onSubmit={handleTerminalCommand} className="relative mt-auto">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white font-bold opacity-50">&gt;</span>
              <input 
                autoFocus
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="w-full bg-transparent border-none outline-none pl-4 text-white font-mono"
                placeholder="type 'help' for commands..."
              />
           </form>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={() => { setTerminalInput('sync'); (document.querySelector('form') as any)?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })); }}
             className="py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-900/20 active:scale-95 transition-all"
           >
             Quick Sync
           </button>
           <button 
             onClick={() => setTerminalHistory(['VitalOS Enclave [Rebooted]', 'Ready...'])}
             className="py-4 bg-white/5 border border-white/10 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:text-white transition-all"
           >
             Flush Enclave
           </button>
        </div>
      </div>
    )},
    { id: 'guardian', name: 'AI Guardian', icon: ShieldCheck, color: 'bg-rose-600', content: (
      <div className="p-8 space-y-8 h-full bg-slate-950/50">
        <div className="text-center space-y-4">
           <div className="relative inline-block">
              <ShieldCheck className={cn("w-24 h-24 text-rose-500 relative z-10", isScanningGuardian ? "animate-spin-slow" : "animate-pulse")} />
              <div className={cn("absolute inset-0 bg-rose-500/20 blur-3xl rounded-full", isScanningGuardian ? "animate-pulse" : "")} />
           </div>
           <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">{isScanningGuardian ? 'Scanning Enclave...' : 'AI Guardian V1'}</h4>
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30">
              <span className="text-[10px] text-rose-500 font-black uppercase tracking-widest">{isScanningGuardian ? `Progress: ${scanProgress}%` : 'Restless Integrity: Active'}</span>
           </div>
        </div>

        {isScanningGuardian && (
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
               className="h-full bg-rose-500"
               initial={{ width: 0 }}
               animate={{ width: `${scanProgress}%` }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
           {[
             { name: "Scrutiny", s: "Nominal", l: "12%" },
             { name: "Encryption", s: "Locked", l: "8%" },
             { name: "Heartbeat", s: "Active", l: "24%" }
           ].map((node, i) => (
             <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/10 transition-all">
                <div className="flex gap-3 items-center">
                   <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500"><Lock className="w-4 h-4" /></div>
                   <div><p className="text-[10px] font-black text-white uppercase tracking-widest">{node.name}</p><p className="text-[8px] text-slate-500 font-mono">L:{node.l}</p></div>
                </div>
                <span className="text-[8px] text-emerald-500 font-black uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{node.s}</span>
             </div>
           ))}
        </div>
        <div className="pt-8 space-y-3">
           <button 
             onClick={() => {
               addNotification('Memory Enclave Purged', 'warn');
               setTerminalHistory(prev => [...prev, '[WARN] MEMORY_PURGE_TRIGGERED', 'Zeroing blocks...', 'OK']);
             }}
             className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-rose-900/20"
           >
             Purge Memory Enclave
           </button>
           <button 
             disabled={isScanningGuardian}
             onClick={() => setIsScanningGuardian(true)}
             className="w-full py-4 bg-white/5 border border-white/10 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[10px] disabled:opacity-50"
           >
             {isScanningGuardian ? 'Scan in Progress...' : 'Deep Integrity Scan'}
           </button>
        </div>
      </div>
    )},
    { id: 'settings', name: 'Settings', icon: Settings, color: 'bg-slate-700', content: (
      <div className="flex flex-col h-full bg-[#030509]">
        <div className="p-8 pb-4 flex justify-between items-center">
           <div>
              <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">System Configuration</h4>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-[8px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-black uppercase">Kernel v2.5.1 Stable</span>
                 <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-black uppercase">Android-Bridge Active</span>
              </div>
           </div>
           <button onClick={() => addNotification('System up to date', 'success')} className="p-2 bg-white/5 rounded-xl border border-white/10 text-white hover:bg-white/10 transition-all">
              <RefreshCw className="w-4 h-4" />
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-8 scrollbar-hide">
           {/* Section: Time & Region */}
           <div className="space-y-4">
              <h5 className="text-[10px] text-toxic font-black uppercase tracking-widest px-2">Time & Synchronization</h5>
              <div className="p-6 bg-white/[0.03] border border-white/5 rounded-[32px] space-y-4">
                 <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[10px] text-white font-black uppercase">System Time</p>
                        <p className="text-xl font-mono text-toxic">{time}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-white font-black uppercase">Date</p>
                        <p className="text-[10px] text-slate-400 font-bold">{date}</p>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-white/5 flex gap-2">
                    <button onClick={() => addNotification('NTP Sync Initiated', 'info')} className="flex-1 py-2 bg-toxic/10 border border-toxic/20 rounded-lg text-[8px] text-toxic font-black uppercase tracking-widest hover:bg-toxic/20 transition-all">Sync with Atomic Clock</button>
                    <button onClick={() => addNotification('Timezone locked to Grid', 'warn')} className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-[8px] text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all">Set Region</button>
                 </div>
              </div>
           </div>

           {/* Section: Unified Account Identity */}
           <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                 <h5 className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Sovereign Social Grid</h5>
                 <button onClick={() => addNotification('Account discovery active', 'info')} className="text-[8px] text-indigo-400 font-black uppercase tracking-widest hover:underline">+ Add Account</button>
              </div>
              <div className="space-y-2">
                 {[
                   { name: 'X / Twitter', val: '@VitalOS_Live', icon: Twitter, active: true },
                   { name: 'YouTube Channel', val: 'Verified: 1.2M Viewers', icon: Youtube, active: true },
                   { name: 'TikTok ID', val: 'Sovereign Streamer', icon: Music2, active: true },
                   { name: 'Instagram', val: 'Meta-Auth Linked', icon: Instagram, active: true },
                   { name: 'Facebook', val: 'Secure Proxy Active', icon: Facebook, active: true }
                 ].map((social, i) => (
                   <button key={i} onClick={() => addNotification(`${social.name} configuration opened`, 'info')} className="w-full p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-3">
                         <social.icon className={cn("w-4 h-4", social.active ? "text-white" : "text-slate-600")} />
                         <div className="text-left">
                            <p className="text-[10px] font-bold text-white uppercase">{social.name}</p>
                            <p className="text-[8px] text-slate-500 font-bold">{social.val}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className={cn("w-3.5 h-3.5", social.active ? "text-emerald-500" : "text-slate-800")} />
                        <ArrowRight className="w-3 h-3 text-white/0 group-hover:text-white/30 transition-all" />
                      </div>
                   </button>
                 ))}
              </div>
           </div>

           {/* Hardware Access: Unlocked */}
           <div className="space-y-4">
              <h5 className="text-[10px] text-rose-400 font-black uppercase tracking-widest px-2">Hardware Root Access</h5>
              <div className="grid grid-cols-2 gap-3">
                 {[
                   { label: 'CPU Cluster', val: 'HYPER-SYNC', icon: Cpu, action: 'Re-calibrate' },
                   { label: 'Secure Element', val: 'UNLOCKED', icon: Key, action: 'Rekey' },
                   { label: 'Neural Bus', val: 'OVERCLOCKED', icon: Zap, action: 'Tune' },
                   { label: 'Entropy Pool', val: 'RAW-FEED', icon: RefreshCw, action: 'Reset' }
                 ].map((hw, i) => (
                   <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl space-y-2 group cursor-pointer hover:bg-white/5 transition-all" onClick={() => addNotification(`${hw.label} ${hw.action} initiated`, 'warn')}>
                      <div className="flex justify-between items-center">
                        <hw.icon className="w-3 h-3 text-slate-400" />
                        <ArrowRight className="w-2 h-2 text-white/0 group-hover:text-white/30 transition-all" />
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-[10px] font-black text-white">{hw.val}</p>
                         <p className="text-[7px] text-slate-500 font-black uppercase">{hw.label}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Hybrid Android / iOS Settings */}
           <div className="p-8 bg-amber-500/5 border border-amber-500/20 rounded-[40px] space-y-4">
              <div className="flex items-center gap-4">
                 <Smartphone className="w-8 h-8 text-amber-500" />
                 <div>
                    <h5 className="text-[10px] text-white font-black uppercase">OS Mirroring Module</h5>
                    <p className="text-[8px] text-slate-500 font-light">Bridge your native Android/iOS system into VitalOS.</p>
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5 cursor-pointer hover:bg-black/60 transition-all" onClick={() => addNotification('Notification sync toggled', 'info')}>
                    <span className="text-[8px] text-slate-400 font-bold uppercase">Sync Notifications</span>
                    <div className="w-8 h-4 bg-amber-500 rounded-full p-1 transition-all"><div className="w-2 h-2 bg-white rounded-full ml-auto" /></div>
                 </div>
                 <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5 cursor-pointer hover:bg-black/60 transition-all" onClick={() => addNotification('Kernel overlap requested', 'warn')}>
                    <span className="text-[8px] text-slate-400 font-bold uppercase">Kernel Overlap</span>
                    <div className="w-8 h-4 bg-white/10 rounded-full p-1 transition-all"><div className="w-2 h-2 bg-white/20 rounded-full" /></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    )},
    { id: 'marketplace', name: 'OpenSea', icon: ShoppingBag, color: 'bg-blue-500', content: (
      <div className="p-8 space-y-8 h-full bg-slate-950/50 flex flex-col overflow-y-auto">
         <div className="flex justify-between items-center">
            <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter leading-none">OS Market</h4>
            <div className="px-3 py-1 bg-blue-500 text-white rounded-lg text-[8px] font-black uppercase">Official Access</div>
         </div>
         <div className="grid grid-cols-1 gap-6">
            {[
              { name: "Sovereign Batch 01", price: "2.4 ETH", status: "Sold Out", icon: Cpu },
              { name: "Grid Pioneer Pack", price: "0.1 ETH", status: "Active", icon: Layout },
              { name: "ZK-Teleport Pass", price: "0.05 ETH", status: "Minting", icon: Zap }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-[32px] flex justify-between items-center group hover:bg-white/10 transition-all cursor-pointer shadow-lg shadow-black/20">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5"><item.icon className="w-6 h-6 text-blue-400" /></div>
                    <div>
                       <p className="text-sm font-black text-white uppercase tracking-widest">{item.name}</p>
                       <p className="text-[10px] text-slate-500 font-mono tracking-widest">{item.price}</p>
                    </div>
                 </div>
                 <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border", item.status === 'Sold Out' ? "text-rose-500 border-rose-500/30 bg-rose-500/10" : "text-emerald-500 border-emerald-500/30 bg-emerald-500/10")}>{item.status}</span>
              </div>
            ))}
         </div>
      </div>
    )},
    { id: 'store', name: 'V-Store', icon: Store, color: 'bg-indigo-600', content: (
      <div className="p-8 space-y-8 h-full bg-slate-950/50 flex flex-col overflow-y-auto">
         <div className="flex justify-between items-center">
            <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter leading-none">App Store</h4>
            <div className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-[8px] font-black uppercase">Verified</div>
         </div>
         <div className="space-y-4">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Trending Grids</p>
            <div className="grid grid-cols-2 gap-4">
               {['Neural Mesh', 'Pulse Yield', 'ZK-Sovereign', 'Bio-Identity'].map(app => (
                 <div key={app} className="p-4 bg-white/5 border border-white/10 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 group hover:bg-indigo-600 transition-all cursor-pointer">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 group-hover:text-white"><AppWindow className="w-5 h-5" /></div>
                    <span className="text-[8px] font-black text-white uppercase tracking-widest text-center">{app}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    )},
  ];

  const currentApp = apps.find(a => a.id === openApp);

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950 flex items-center justify-center p-0 md:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,255,65,0.08),_rgba(255,255,255,0))] pointer-events-none" />
      
      <div className="w-full h-full max-w-md md:h-[880px] bg-obsidian/90 backdrop-blur-2xl rounded-none md:rounded-[48px] border-0 md:border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col font-sans transition-all">
      <div className="absolute inset-0 bg-gradient-to-b from-toxic/[0.02] to-transparent pointer-events-none" />
      
      {/* Notifications Overlay */}
      <div className="absolute top-12 left-0 right-0 z-[200] px-6 space-y-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                "p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3",
                n.type === 'success' ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                n.type === 'warn' ? "bg-rose-500/10 border-rose-500/30 text-rose-400" :
                "bg-toxic/10 border-toxic/30 text-toxic"
              )}
            >
              <Zap className="w-4 h-4 shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-widest font-mono">{n.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isBooting && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-8"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-t-2 border-toxic rounded-full"
            />
            <div className="text-center space-y-2">
               <h2 className="text-xl font-display font-black text-white tracking-[0.4em] uppercase">VitalOS</h2>
               <p className="text-[8px] text-toxic font-mono tracking-widest animate-pulse">KERNEL_1.0.4_INITIALIZING...</p>
            </div>
          </motion.div>
        )}

        {!isBooting && isLocked && (
          <motion.div 
            key="lock-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 z-[90] bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center flex flex-col items-center justify-between py-24 pb-32"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            
            <div className="text-center space-y-2 relative z-10">
               <h1 className="text-7xl font-display font-black text-white tracking-tighter">{time}</h1>
               <p className="text-[10px] text-toxic font-black uppercase tracking-[0.4em]">{date}</p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsLocked(false);
                if (!isHardwareSynced) {
                  setIsHardwareSynced(true);
                }
              }}
              className="w-24 h-24 bg-white/5 border border-white/20 rounded-full flex items-center justify-center relative z-10 group"
            >
               <div className="absolute inset-0 bg-toxic/10 blur-2xl group-hover:bg-toxic/30 transition-colors rounded-full" />
               <Fingerprint className="w-10 h-10 text-white relative" strokeWidth={1} />
            </motion.button>

            <div className="text-center relative z-10 space-y-4">
               <p className="text-[8px] text-toxic font-black uppercase tracking-widest animate-pulse">Touch to Authorize Biometric Key</p>
               {!isHardwareSynced && (
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                    <Zap className="w-2 h-2 text-amber-500" />
                    <span className="text-[8px] text-amber-500 font-black uppercase">Awaiting Hardware Handshake</span>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Notch / Sensor Array */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center border-x border-b border-white/5">
        <div className="w-8 h-1 bg-white/5 rounded-full" />
      </div>

      {/* Status Bar */}
      <div className="pt-8 px-8 flex justify-between items-center text-[10px] font-black text-white z-[60]">
        <div className="flex items-center gap-2">
           <button 
              onClick={() => setView('landing')}
              className="p-1 hover:bg-white/10 rounded-full transition-colors group"
           >
              <Zap className="w-3 h-3 text-toxic group-hover:animate-pulse" />
           </button>
           <span>{time}</span>
           {isHardwareSynced && (
             <div className="flex items-center gap-1 text-amber-400">
                <Cpu className="w-3 h-3" />
                <span className="text-[7px]">ENCLAVE_{hardwareBattery}%</span>
             </div>
           )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 items-end h-2.5">
             {[1,2,3,4,5].map(i => <div key={i} className={cn("w-0.5 rounded-full", i <= networkSignal ? "bg-white" : "bg-white/20")} style={{ height: `${i * 20}%` }} />)}
          </div>
          <span className="text-[8px] text-white/50 font-bold uppercase truncate max-w-[40px]">VITAL_NET</span>
          <div className="flex items-center gap-1 border border-white/30 rounded-[4px] px-1 py-0.5 relative overflow-hidden bg-black/40">
            <span className="text-[7px] relative z-10">{battery}%</span>
            <div className="absolute inset-y-0 left-0 bg-emerald-500 opacity-80" style={{ width: `${battery}%` }} />
            <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-1 h-2 bg-white/30 rounded-sm" />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!openApp ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 relative overflow-hidden flex flex-col justify-center items-center"
          >
            {/* Ambient Background Pulse */}
            <div className="absolute inset-0 z-0 select-none overflow-hidden">
               <motion.div 
                 animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-toxic/20 blur-[120px] pointer-events-none"
               />
               <motion.div 
                 animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.05, 0.15, 0.05],
                 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                 className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-rose-500/10 blur-[100px] pointer-events-none"
               />
            </div>

            {/* Central Intelligence Core */}
            <div className="relative z-20 flex flex-col items-center justify-center -mt-20">
               <motion.div 
                 animate={{ 
                    rotate: 360,
                 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-[-60px] border border-white/[0.03] rounded-full"
               />
               <motion.div 
                 animate={{ 
                    rotate: -360,
                 }}
                 transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-[-100px] border border-white/[0.02] border-dashed rounded-full"
               />

               <motion.button
                 whileHover={{ scale: 1.05 }}
                 onClick={() => setOpenApp('guardian')}
                 className="relative w-48 h-48 flex items-center justify-center group"
               >
                  <div className="absolute inset-0 bg-toxic/5 backdrop-blur-3xl rounded-full border border-toxic/20 shadow-[0_0_80px_rgba(0,255,65,0.2)] group-hover:border-toxic/40 transition-all duration-700" />
                  <div className="absolute inset-10 bg-toxic/10 blur-3xl animate-core-pulse rounded-full" />
                  
                  <div className="relative flex flex-col items-center text-center space-y-2 pointer-events-none">
                     <div className="relative">
                        <Activity className="w-12 h-12 text-white/40 mb-1 group-hover:text-toxic transition-colors" />
                        <motion.div 
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-3 -right-3 text-[10px] text-toxic font-mono font-black tracking-widest"
                        >
                          SYNC
                        </motion.div>
                     </div>
                     <div className="space-y-0.5">
                        <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none text-glow-toxic">{nft.healthScore}%</h3>
                        <p className="text-[8px] text-toxic font-black uppercase tracking-[0.3em]">Guardian State</p>
                     </div>
                  </div>
               </motion.button>

               {/* Orbital Stats */}
               <div className="absolute top-0 -left-32 -translate-y-full p-4 liquid-metal rounded-[40px] border-toxic/20 space-y-1 w-32 animate-float">
                  <div className="flex justify-between items-center">
                     <Heart className="w-3 h-3 text-toxic" />
                     <span className="text-[8px] text-toxic italic uppercase font-black">BPM</span>
                  </div>
                  <p className="text-lg font-mono font-bold text-white leading-none">72</p>
               </div>
               
               <div className="absolute bottom-0 -right-32 translate-y-full p-4 liquid-metal rounded-[40px] border-toxic/20 space-y-1 w-32 animate-float [animation-delay:2s]">
                  <div className="flex justify-between items-center">
                     <Coins className="w-3 h-3 text-bronze" />
                     <span className="text-[8px] text-bronze italic uppercase font-black">VTL</span>
                  </div>
                  <p className="text-lg font-mono font-bold text-white leading-none">+12.4</p>
               </div>
            </div>

            {/* Application Nodes - Grid */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-12 z-30">
               <div className="grid grid-cols-4 gap-y-12">
                 {apps.filter(app => !['builder', 'landing'].includes(app.id)).map((app, i) => (
                   <motion.button
                     key={app.id}
                     whileHover={{ y: -8, scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.05, duration: 0.4 }}
                     onClick={() => setOpenApp(app.id)}
                     className="group relative flex flex-col items-center gap-3"
                   >
                      <div className="relative w-16 h-16 rounded-[28px] glass-card flex items-center justify-center group-hover:bg-white/10 transition-all border-white/10 group-hover:border-white/20">
                         <div className={cn("absolute inset-2 blur-xl opacity-0 group-hover:opacity-40 transition-opacity rounded-full", app.color)} />
                         <app.icon className="w-6 h-6 text-white/50 group-hover:text-white transition-all transform group-hover:scale-110" strokeWidth={1} />
                      </div>
                      <span className="text-[7px] text-slate-500 font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">{app.name}</span>
                   </motion.button>
                 ))}
               </div>
            </div>

            <div className="absolute bottom-12 left-0 right-0 px-12 z-30">
               <button 
                 onClick={() => setOpenApp('builder')}
                 className="w-full py-4 glass-card rounded-[40px] border-toxic/20 text-toxic text-[10px] font-black uppercase tracking-[0.5em] hover:bg-toxic/10 transition-all group"
               >
                  <span className="group-hover:tracking-[0.8em] transition-all duration-700">Open OS Environment</span>
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="app-window"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: 20 }}
            className="flex-1 bg-[#020408] flex flex-col relative z-50 mt-4 overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
               <button onClick={() => setOpenApp(null)} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Close</span>
               </button>
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">VitalOS_{openApp}</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
               {currentApp?.content ? currentApp.content : (
                 <div className="flex items-center justify-center h-full text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">
                    App Context Error: Missing Enclave Reference
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!openApp && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-12 left-0 right-0 px-8 z-40"
          >
             <div className="flex justify-around items-center h-20 bg-white/[0.03] backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {[
                   { id: 'phone', icon: Phone, color: 'text-emerald-400' },
                   { id: 'vitals', icon: Activity, color: 'text-rose-500' },
                   { id: 'vpass', icon: Key, color: 'text-toxic' },
                   { id: 'cloud', icon: Video, color: 'text-toxic' },
                   { id: 'manifesto', icon: BookOpen, color: 'text-bronze' },
                   { id: 'settings', icon: Settings, color: 'text-slate-500' },
                   { id: 'landing', icon: Globe, color: 'text-blue-400', view: true }
                ].map((item, i) => (
                   <motion.button
                     key={item.id}
                     whileHover={{ y: -5, scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={() => {
                        if (item.view) setView('landing');
                        else setOpenApp(item.id);
                     }}
                     className={cn(
                        "p-3 rounded-2xl transition-all relative group",
                        openApp === item.id ? "bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "text-white/40 hover:text-white"
                     )}
                   >
                      <item.icon className={cn("w-5 h-5", openApp === item.id ? "" : item.color)} />
                      {openApp === item.id && (
                        <motion.div 
                          layoutId="active-dock"
                          className="absolute inset-0 bg-white rounded-2xl -z-10"
                        />
                      )}
                      
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                   </motion.button>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Home Pillar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/10 rounded-full overflow-hidden">
         <motion.div 
           animate={{ 
             x: ["-100%", "100%"] 
           }}
           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
         />
      </div>
    </div>
    </div>
  );
};

export default function App() {
  const { nft, user, loading, sync, claim, evolve, activate, pairWearable, activateHardware, buy, setTarget, swapVitals, stakeVitals, unstakeVitals, logProgress, connectWallet } = useVitals();
  const [view, setView] = React.useState('landing');
  const [isIdentityModalOpen, setIsIdentityModalOpen] = React.useState(false);
  const [isGuideOpen, setIsGuideOpen] = React.useState(false);

  if (loading) return <div className="h-screen flex items-center justify-center text-slate-400 uppercase tracking-widest text-[10px] font-mono">Initializing Protocol...</div>;

  const handleConnectIdentity = (domain: string) => {
    connectWallet(domain);
    setIsIdentityModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-100 font-sans selection:bg-toxic selection:text-black pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(0,255,65,0.05),_rgba(255,255,255,0))] pointer-events-none" />
      
      {view !== 'dashboard' && (
        <Navbar 
          view={view} 
          setView={setView} 
          balance={user?.vitalsTBalance || 0} 
          user={user}
          connectWallet={() => setIsIdentityModalOpen(true)}
        />
      )}

      <IdentityModal 
        isOpen={isIdentityModalOpen}
        onClose={() => setIsIdentityModalOpen(false)}
        onConnect={handleConnectIdentity}
        activateHardware={activateHardware}
      />

      <GuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'landing' && <LandingPage onEnter={setView} onOpenGuide={() => setIsGuideOpen(true)} user={user} />}
          {view === 'launchpad' && (
            <MintingPage 
              user={user || { 
                walletConnected: false, 
                vitalsTBalance: 0, 
                vitalsTStaked: 0, 
                availableCertificates: [
                  { id: "CERT-P1", tier: CertificateTier.Pulse, organ: OrganType.Lungs, priceUsdt: 50, priceEth: 0.02, priceSol: 0.45, isOwned: false, multiplier: 1.0, traits: ["Bio-Link Initialized"] },
                  { id: "CERT-N2", tier: CertificateTier.Nexus, organ: OrganType.Brain, priceUsdt: 150, priceEth: 0.06, priceSol: 1.35, isOwned: false, multiplier: 2.2, traits: ["Neural Peak"] },
                  { id: "CERT-S3", tier: CertificateTier.Sovereign, organ: OrganType.Skin, priceUsdt: 450, priceEth: 0.18, priceSol: 4.05, isOwned: false, multiplier: 5.0, traits: ["Vital Mark"] }
                ] 
              }} 
              buy={buy} 
              connectWallet={() => setIsIdentityModalOpen(true)} 
            />
          )}
          {view === 'mint' && (
            <MintingPage 
              user={user || { 
                walletConnected: false, 
                vitalsTBalance: 0, 
                vitalsTStaked: 0, 
                availableCertificates: [
                  { id: "CERT-P1", tier: CertificateTier.Pulse, organ: OrganType.Lungs, priceUsdt: 50, priceEth: 0.02, priceSol: 0.45, isOwned: false, multiplier: 1.0, traits: ["Bio-Link Initialized"] },
                  { id: "CERT-N2", tier: CertificateTier.Nexus, organ: OrganType.Brain, priceUsdt: 150, priceEth: 0.06, priceSol: 1.35, isOwned: false, multiplier: 2.2, traits: ["Neural Peak"] },
                  { id: "CERT-S3", tier: CertificateTier.Sovereign, organ: OrganType.Skin, priceUsdt: 450, priceEth: 0.18, priceSol: 4.05, isOwned: false, multiplier: 5.0, traits: ["Vital Mark"] }
                ] 
              }} 
              buy={buy} 
              connectWallet={() => setIsIdentityModalOpen(true)} 
            />
          )}
          {view === 'dashboard' && (
            <VitalOS 
              nft={nft || {
                certificateId: 'V-ID-PREVIEW',
                certificateTier: CertificateTier.Sovereign,
                unclaimedVital: 1250,
                earnedTraits: ['Sovereign_Preview'],
                organType: 'Heart',
                healthScore: 72,
                isActivated: true,
                isHardwareBound: false
              }} 
              user={user || { 
                walletConnected: false, 
                walletAddress: null, 
                vitalsBalance: 0,
                vitalsTBalance: 0,
                vitalsTStaked: 0,
                isWearablePaired: false,
                availableCertificates: []
              }} 
              sync={sync} 
              claim={claim} 
              evolve={evolve} 
              activate={activate}
              pairWearable={pairWearable}
              activateHardware={activateHardware}
              buy={buy}
              setTarget={setTarget}
              swapVitals={swapVitals}
              stakeVitals={stakeVitals}
              unstakeVitals={unstakeVitals}
              logProgress={logProgress}
              setView={setView}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer Bar */}
      {view !== 'dashboard' && (
        <footer className="max-w-7xl mx-auto mt-24 flex flex-col md:flex-row justify-between items-center px-4 gap-6 pb-12 opacity-50 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest leading-none">
            <span className="flex items-center gap-2">
              <span className={cn("w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]", nft?.isActivated ? "bg-emerald-500" : "bg-amber-500")}></span> 
              {nft?.isActivated ? "Neural Link Operational" : "Awaiting Activation"}
            </span>
            <span>V-ID: {nft?.id || '---'}</span>
            <span>Region: Solana-Mainnet</span>
          </div>
          <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold text-center">
            VITALS PHYGITAL TECHNOLOGY • {(nft && nft.isHardwareBound) ? "HARDWARE AUTHENTICATED" : "VIRTUAL EMULATION"}
          </div>
        </footer>
      )}
    </div>
  );
}
