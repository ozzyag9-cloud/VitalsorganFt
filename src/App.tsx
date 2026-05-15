import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Brain, Zap, Droplets, Activity, Gauge, Flame, Wallet, Trophy, User, ArrowRight, X, Shield, Fingerprint, Calendar, Lock, LineChart, Cpu, Coins, Search, Hourglass, BarChart2, Globe, ExternalLink, Star, Maximize2, Settings, KeyRound, Smartphone, Server } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useVitals } from './hooks/useVitals';
import { cn, formatNumber } from './lib/utils';
import { BiometricCertificate } from './components/BiometricCertificate';
import { HealthState, CertificateTier, OrganType } from './types';
import { PhotorealisticRing } from './components/PhotorealisticRing';
import { VitalOSBuilder } from './components/VitalOSBuilder';

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
  <nav className="max-w-7xl mx-auto flex justify-between items-center mb-6 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sticky top-6 z-50 backdrop-blur-xl">
    <div className="flex items-center gap-6">
      <div 
        onClick={() => setView('landing')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform text-white">V</div>
        <div>
          <h1 className="text-xl font-display font-black tracking-tight uppercase leading-none text-white">VITALS</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[8px] text-slate-500 font-mono tracking-[0.2em] leading-none uppercase">Gen-0 Protocol</span>
            <span className="text-[7px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1 py-0.5 rounded font-black uppercase tracking-widest leading-none">Pre-sale Pending</span>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-400">
        <button onClick={() => setView('landing')} className={cn("hover:text-indigo-400 transition-colors uppercase", view === 'landing' && "text-indigo-400")}>Protocol</button>
        <button onClick={() => setView('launchpad')} className={cn("hover:text-indigo-400 transition-colors uppercase", view === 'launchpad' && "text-indigo-400")}>Launchpad</button>
        <button onClick={() => setView('mint')} className={cn("hover:text-indigo-400 transition-colors uppercase", view === 'mint' && "text-indigo-400")}>Minting</button>
        <button onClick={() => setView('dashboard')} className={cn("hover:text-indigo-400 transition-colors uppercase", view === 'dashboard' && "text-indigo-400")}>Deployment Suite</button>
        <button onClick={() => setView('sovereign-os')} className={cn("hover:text-indigo-400 transition-colors uppercase", view === 'sovereign-os' && "text-indigo-400")}>Sovereign OS</button>
      </div>
    </div>

    <div className="flex gap-4">
      {user?.walletConnected ? (
        <div className="flex items-center gap-4">
           <div className="hidden md:flex bg-slate-950 px-4 py-1.5 rounded-xl border border-white/5 flex-col justify-center">
             <span className="text-[8px] text-slate-500 uppercase font-black leading-none mb-0.5 tracking-tighter">$VITAL Balance</span>
             <span className="text-xs font-mono font-bold text-white leading-none">{formatNumber(balance)}</span>
           </div>
           <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
              <div className="flex flex-col items-end">
                {user.web3Domain && <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-tight">{user.web3Domain}</span>}
                <span className={cn("font-mono text-slate-300 font-bold uppercase", user.web3Domain ? "text-[8px] opacity-60" : "text-[10px]")}>{user.walletAddress}</span>
              </div>
           </div>
        </div>
      ) : (
        <button 
          onClick={connectWallet}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-900/20 transition-all active:scale-95 flex items-center gap-2"
        >
          <Wallet className="w-3.5 h-3.5" />
          Connect Identity
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
         <Hourglass className="w-12 h-12 text-indigo-500 animate-pulse" strokeWidth={1} />
         <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
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

const IdentityModal = ({ isOpen, onClose, onConnect }: { isOpen: boolean, onClose: () => void, onConnect: (domain: string) => void }) => {
  const [domain, setDomain] = useState('');
  const [activeTab, setActiveTab] = useState<'domain' | 'wallet'>('wallet');
  
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
                 activeTab === 'wallet' ? "bg-white text-slate-950 mr-1" : "text-slate-500"
               )}
             >
               Wallet Connect
             </button>
             <button 
               onClick={() => setActiveTab('domain')}
               className={cn(
                 "flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                 activeTab === 'domain' ? "bg-white text-slate-950 ml-1" : "text-slate-500"
               )}
             >
               Web3 Domain
             </button>
          </div>

          <div className="space-y-6">
             {activeTab === 'wallet' ? (
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
             ) : (
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

const LandingPage = ({ onEnter }: { onEnter: (v: string) => void }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 text-center space-y-12 flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none scale-110">
           <img 
             src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" 
             alt="Tech Background" 
             className="w-full h-full object-cover blur-[2px]"
             referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 bg-slate-950/60" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.08)_0%,_transparent_70%)] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.02] rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 mb-12"
        >
          <div className="absolute inset-0 bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
          <PhotorealisticRing tier={CertificateTier.Sovereign} size={380} className="drop-shadow-[0_0_80px_rgba(255,255,255,0.1)] hover:scale-110 transition-transform duration-1000" />
        </motion.div>

        <div className="space-y-6 relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-white/5 border border-indigo-500/20 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Genesis Whitelist Remaining: <span className="text-rose-500">442 / 1000</span></span>
            </div>
            <div className="p-8 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-xl">
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.6em] mb-6">Founding Phase T-Minus</p>
               <Sablier targetDate="2026-06-30T00:00:00Z" />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-display italic text-white tracking-tighter leading-[0.85]"
          >
            Biological <br /> 
            <span className="text-indigo-500 not-italic font-sans font-black tracking-[-0.05em] uppercase text-6xl md:text-8xl leading-none">Capital</span>
          </motion.h1>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide leading-relaxed">
            The world's first decentralized biological insurance & asset protocol. Tokenize your health, secure sovereign hardware, and earn $VITAL yield for biological excellence.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 pt-8 relative z-10"
        >
          <button 
            onClick={() => onEnter('mint')} 
            className="group relative px-12 py-6 bg-white rounded-sm overflow-hidden flex items-center gap-4 shadow-2xl shadow-white/5 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-xs font-black uppercase tracking-[0.5em] text-slate-950">Join Whitelist</span>
            <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={() => onEnter('dashboard')} 
            className="group relative px-12 py-6 border border-white/10 rounded-sm overflow-hidden bg-white/5 hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-xs font-black uppercase tracking-[0.5em] text-slate-300">Enter Dashboard</span>
          </button>

          <button 
            onClick={() => onEnter('sovereign-os')} 
            className="group relative px-12 py-6 border border-indigo-500/30 rounded-sm overflow-hidden bg-indigo-500/10 hover:bg-indigo-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-xs font-black uppercase tracking-[0.5em] text-indigo-200">Explore OS</span>
          </button>
        </motion.div>
      </section>

      {/* Trust & Proof Section */}
      <section className="py-20 grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: "Secured TVL", val: "$4.1M", sub: "Genesis Pool" },
           { label: "Verified Nodes", val: "1,442", sub: "Global Enclave" },
           { label: "Yield Distributed", val: "128K", sub: "$VITAL Tokens" },
           { label: "Hardware Units", val: "882", sub: "Vitals Ring Pre-orders" }
         ].map((stat, i) => (
           <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/5 transition-colors cursor-default">
              <p className="text-3xl font-mono font-bold text-white mb-1">{stat.val}</p>
              <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-[8px] text-slate-600 font-mono tracking-widest">{stat.sub}</p>
           </div>
         ))}
      </section>

      {/* Protocol Core: Security & Yield */}
      <section className="py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { 
             title: "ZK-Biometrics", 
             desc: "Your health data never touches a server. We use Zero-Knowledge Proofs to verify synchronization targets without exposing raw telemetry.",
             icon: Lock 
           },
           { 
             title: "Phygital Minting", 
             desc: "Every NFT corresponds to a physical Batch-01 hardware unit. The digital asset functions as your proof-of-ownership for shipping.",
             icon: Cpu 
           },
           { 
             title: "$VITAL Economy", 
             desc: "The protocol distributes yield based on biological consistency. Maintain a 90% sync rate to maximize your $VITAL rewards.",
             icon: Coins 
           }
         ].map((item, i) => (
           <div key={i} className="p-10 bg-[#05070c] border border-white/5 rounded-[40px] space-y-6 relative overflow-hidden group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                 <item.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -z-10 group-hover:bg-indigo-500/10 transition-colors" />
           </div>
         ))}
      </section>

      {/* How it Works: Marketing Flow */}
      <section className="py-40 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-32 space-y-6">
           <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.6em]">The Protocol Path</p>
           <h2 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">Biological <br/> Manifestation</h2>
           <p className="text-slate-500 text-lg leading-relaxed font-light">From baseline health to sovereign asset class. Follow the 4-step sequence to biological sovereignty.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
           {[
             { 
               step: "01",
               title: "Secure Tier", 
               icon: Lock,
               desc: "Choose your biological focus and mint your Sovereign Digital Asset. This initializes your link to the global Vitals Oracle network." 
             },
             { 
               step: "02",
               title: "Hardware Link", 
               icon: Cpu,
               desc: "Pair your Vitals Ring or compatible wearable to the protocol. Biological telemetry is hashed and encrypted locally before transmission." 
             },
             { 
               step: "03",
               title: "Biological Sync", 
               icon: Activity,
               desc: "Achieve consistency targets (Sleep, Heart Rate, Activity) to secure $VITAL yield and evolve your dNFT aesthetic profile." 
             },
             { 
               step: "04",
               title: "Harvest Yield", 
               icon: Coins,
               desc: "Claim accrued $VITAL or swap for $VT-T Sovereign Stake to unlock advanced protocol governance and maximum yield multipliers." 
             }
           ].map((item, i) => (
             <div key={i} className="bg-[#04060a] border border-white/5 p-12 space-y-10 group hover:bg-white/[0.01] transition-all relative overflow-hidden">
                <div className="text-8xl font-display font-black text-white/[0.02] absolute -top-4 -left-4 group-hover:text-indigo-500/10 transition-colors">{item.step}</div>
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-indigo-500/50 transition-all relative z-10">
                   <item.icon className="w-6 h-6 text-indigo-400" strokeWidth={1} />
                </div>
                <div className="space-y-4 relative z-10">
                   <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">{item.title}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
             </div>
           ))}
        </div>
      </section>

      {/* Platform Features: Uniqueness */}
      <section className="py-40 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.6em]">Core Novelty</p>
                <h2 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">The Phygital <br/> Bridge Protocol</h2>
              </div>
              
              <div className="space-y-10">
                 {[
                   { 
                     title: "Biometric Encoding", 
                     icon: Fingerprint,
                     desc: "Your unique biological signature is cryptographically hashed and embedded into the dNFT metadata at the moment of minting. This link is permanent and verifiable across the ecosystem." 
                   },
                   { 
                     title: "Dynamic Evolution (dNFT)", 
                     icon: Zap,
                     desc: "The certificate isn't static. It grows, repairs, and evolves based on real-time health throughput. High-performance biology results in aesthetic and technical asset evolution." 
                   },
                   { 
                     title: "Hardware Enclave Integration", 
                     icon: Shield,
                     desc: "The Vitals Ring acts as a physical cold-wallet for your biological data. It allows secure syncing without ever exposing your private metrics to the cloud." 
                   }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-8 group">
                      <div className="w-14 h-14 shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-indigo-500/50 transition-all">
                         <item.icon className="w-6 h-6 text-indigo-400" strokeWidth={1} />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">{item.title}</h3>
                         <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/10 blur-[150px] rounded-full" />
              <div className="bg-[#05070c] border border-white/10 p-4 rounded-3xl relative z-10 shadow-2xl">
                 <div className="bg-slate-950 rounded-2xl p-8 space-y-8 text-white">
                    <div className="flex justify-between items-center text-white">
                       <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Protocol Visualization</span>
                       <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                       </div>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-indigo-500/20 via-slate-900 to-transparent rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                       <Activity className="w-16 h-16 text-indigo-500/30 group-hover:scale-110 transition-transform duration-1000" strokeWidth={1} />
                       <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-slate-950 to-transparent">
                          <p className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Biological Throughput</p>
                          <p className="text-[9px] text-indigo-400 font-mono tracking-widest leading-none">SYNC_MODE: ACTIVE • HASH: 0x82...1ac</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1 leading-none">Neural Frequency</p>
                          <p className="text-lg font-mono font-bold text-white leading-none">42.8 Hz</p>
                       </div>
                       <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1 leading-none">Asset Value</p>
                          <p className="text-lg font-mono font-bold text-indigo-400 leading-none">+12.4%</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* System Architecture: Technical Depth */}
      <section className="py-40 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-px bg-gradient-to-l from-indigo-500/50 to-transparent" />
        <div className="max-w-4xl mx-auto space-y-24">
           <div className="text-center space-y-6">
              <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.6em]">Engineering Blueprint</p>
              <h2 className="text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">Global Architecture</h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed uppercase tracking-widest font-black">
                Distributed Biological Ledger with 4K Nano-Banana Rendering Suite
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {[
                { 
                  title: "Rendering Engine", 
                  code: "NANO_BANANA_PRO_v2", 
                  desc: "Ultra-high fidelity 4K texture mapping for all physical-digital assets. Real-time holographic diffraction modeling." 
                },
                { 
                  title: "Oracle Link", 
                  code: "BIOMETRIC_UDP_0x1", 
                  desc: "Zero-Knowledge human metric synchronization. Encrypted data tunnels between hardware and sovereign dNFTs." 
                },
                { 
                  title: "Security Logic", 
                  code: "HOLO_ENCRYPT_L3", 
                  desc: "Multi-layered anti-forgery protocols featuring holographic seals and micro-print authenticity validation." 
                }
              ].map((tech, i) => (
                <div key={i} className="bg-[#04060a] p-10 space-y-6 hover:bg-white/[0.01] transition-colors">
                   <div className="flex justify-between items-start">
                      <Cpu className="w-8 h-8 text-indigo-500" strokeWidth={1} />
                      <span className="text-[8px] font-mono text-indigo-400 font-black bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{tech.code}</span>
                   </div>
                   <div className="space-y-3">
                      <h3 className="text-xl font-display font-black text-white uppercase tracking-tight leading-none">{tech.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-black uppercase tracking-widest opacity-60">Verified Cluster</p>
                      <p className="text-sm text-slate-400 leading-relaxed font-light">{tech.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Tokenomics & Funds */}
      <section className="py-40 border-t border-white/5">
         <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.6em]">Economy & Trust</p>
            <h2 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">The $VITAL Protocol</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
            {[
               { label: "Token Supply", value: "1,000,000,000", sub: "VITAL (Fixed)", icon: Coins },
               { label: "Audit Status", value: "12 Days Left", sub: "Quantstamp Final Review", icon: Search },
               { label: "Staking APY", value: "Up to 52%", sub: "Dynamic Rewards", icon: BarChart2 },
               { label: "Dev Pool", value: "$1.8M Needed", sub: "V2 Expansion Fund", icon: Lock }
            ].map((item, i) => (
               <div key={i} className="bg-[#04060a] border border-white/5 p-8 rounded-3xl flex flex-col gap-8 group hover:bg-white/[0.02] transition-colors">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                     <item.icon className="w-5 h-5 text-indigo-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white tracking-tighter leading-none">{item.value}</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2 leading-none">{item.label}</p>
                    <p className="text-[8px] text-indigo-500/60 font-mono mt-3 leading-none">{item.sub}</p>
                  </div>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-950 border border-white/5 rounded-[40px] p-12 space-y-8">
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Funding Distribution</h3>
               <div className="space-y-6">
                  {[
                    { label: "Product Development & R&D", percent: 40, desc: "Building the biometric oracle engine and hardware refinements." },
                    { label: "Protocol Maintenance", percent: 20, desc: "Cloud infrastructure and security enclave patches." },
                    { label: "Liquidity Provisions", percent: 25, desc: "Ensuring deep market stability for $VITAL pairs." },
                    { label: "Strategic Reserves", percent: 15, desc: "Ecosystem grants and partnership integration funds." }
                  ].map((f, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between items-end">
                          <span className="text-xs font-black text-white uppercase tracking-tight">{f.label}</span>
                          <span className="text-sm font-mono text-indigo-400 font-bold">{f.percent}%</span>
                       </div>
                       <ProgressBar progress={f.percent} color="bg-indigo-600" />
                       <p className="text-[10px] text-slate-600 italic leading-none">{f.desc}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 border border-indigo-500/10 rounded-[40px] p-12 space-y-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Activity className="w-32 h-32 text-indigo-500" />
               </div>
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Strategic Roadmap</h3>
               <div className="space-y-10 relative">
                  <div className="absolute left-6 top-2 bottom-2 w-px bg-white/10" />
                  {[
                    { phase: "PHASE 01", title: "Genesis Minting", date: "June 2026", desc: "Launch of Pulse & Sovereign certificates. Smart Ring pre-orders go live." },
                    { phase: "PHASE 02", title: "Biometric Oracle V1", date: "Sept 2026", desc: "Beta launch of the health-sync engine. First yield distribution cycle." },
                    { phase: "PHASE 03", title: "Ecosystem Expansion", date: "Jan 2027", desc: "Third-party wearable integration via public API. Marketplace for biological dNFTs." },
                    { phase: "PHASE 04", title: "Full Decentralization", date: "Q3 2027", desc: "DAO governance launch. Autonomous protocol yield adjustments." }
                  ].map((p, i) => (
                    <div key={i} className="flex gap-12 relative z-10 group">
                       <div className="w-12 h-12 bg-slate-950 border border-white/10 rounded-full flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-indigo-500" />
                       </div>
                       <div className="space-y-2 pt-1">
                          <div className="flex items-center gap-4">
                             <span className="text-[10px] font-black text-indigo-500 tracking-[0.4em]">{p.phase}</span>
                             <span className="text-[10px] text-slate-600 font-mono tracking-widest uppercase leading-none">{p.date}</span>
                          </div>
                          <h4 className="text-xl font-black text-white uppercase tracking-tight">{p.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed max-w-sm">{p.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Marketing / Tokenomics Section */}
      <section className="py-40 bg-indigo-500/5 -mx-6 px-6">
         <div className="max-w-4xl mx-auto text-center space-y-24">
            <div className="space-y-6">
               <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.6em] animate-bounce">Limited Time Opportunity</p>
               <h2 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">The Sovereign <br/> Pre-Sale</h2>
               <p className="text-slate-400 text-lg leading-relaxed font-light">
                 By participating in the Genesis Whitelist, you are securing more than just a certificate. You are funding the future of biological sovereignty and receiving maximum protocol utility.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { title: "2.5x Yield", sub: "Permanent Boost", desc: "Genesis NFTs carry a permanent 2.5x multiplier on all $VITAL accrued biological synchronization." },
                 { title: "Hardware Drop", sub: "Priority Batch", desc: "Founders receive Batch 01 priority shipping for the Vitals Ring (October 2026 delivery)." },
                 { title: "Zero Fees", sub: "Lifetime Benefit", desc: "Zero protocol synchronization fees for all biological telemetry mappings across the entire ecosystem." }
               ].map((benefit, i) => (
                 <div key={i} className="p-10 bg-black/40 border border-white/5 rounded-3xl text-left space-y-4 hover:border-indigo-500/30 transition-all group">
                    <div className="text-indigo-400 flex items-center justify-between">
                       <span className="text-xs font-black uppercase tracking-widest">{benefit.sub}</span>
                       <Star className="w-4 h-4 fill-indigo-400 group-hover:scale-125 transition-transform" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{benefit.title}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-light">{benefit.desc}</p>
                 </div>
               ))}
            </div>

            <div className="bg-slate-950 border border-white/10 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-12 text-left relative overflow-hidden">
               <div className="space-y-6 relative z-10">
                  <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">$VITAL Ecosystem</h3>
                  <p className="text-slate-500 text-sm max-w-sm font-light">The $VITAL token powers the biological oracle. Supply is strictly limited, with 60% reserved for synchronization rewards.</p>
                  <button 
                    onClick={() => onEnter('mint')}
                    className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 hover:text-white transition-colors"
                  >
                    View Tokenomics Paper <ArrowRight className="w-3 h-3" />
                  </button>
               </div>
               <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-20 h-20 rounded-full border-2 border-slate-950 bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center shadow-2xl">
                       <Coins className="w-10 h-10 text-white opacity-20" />
                    </div>
                  ))}
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.05)_0%,_transparent_70%)] pointer-events-none" />
            </div>
         </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-40 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-32 space-y-6">
           <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.6em]">Protocol Evolution</p>
           <h2 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">The Sovereign <br/> Roadmap</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { phase: "Q3 2024", title: "Genesis Mint", items: ["1000 Founding NFTs", "Whitelist Open", "$VITAL Seed Pool"] },
             { phase: "Q4 2024", title: "Ring Batch 01", items: ["Hardware Pre-orders", "App Beta Launch", "Solana Integration"] },
             { phase: "Q1 2025", title: "Biosync Live", items: ["Oracle V1 Deployment", "Yield Distribution", "ZK-Privacy Launch"] },
             { phase: "Q2 2025", title: "Governance", items: ["$VITAL Staking", "DAO Framework", "Ecosystem Grants"] }
           ].map((phase, i) => (
             <div key={i} className="bg-white/[0.02] border border-white/5 p-10 rounded-[40px] space-y-8 relative group">
                <div className="text-amber-500 font-mono text-[10px] font-black uppercase tracking-widest">{phase.phase}</div>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">{phase.title}</h3>
                <ul className="space-y-3">
                   {phase.items.map((item, j) => (
                     <li key={j} className="flex items-center gap-3 text-xs text-slate-500 font-light">
                        <div className="w-1 h-1 rounded-full bg-indigo-500" />
                        {item}
                     </li>
                   ))}
                </ul>
                <div className="absolute top-1/2 left-0 w-1 h-12 bg-indigo-500 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};


const SovereignOSPage = () => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    const syncFullscreenState = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', syncFullscreenState);
    syncFullscreenState();
    return () => document.removeEventListener('fullscreenchange', syncFullscreenState);
  }, []);

  const launchFullscreen = async () => {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
  };

  const agentProviders = [
    { id: 'claude', name: 'Claude', owner: 'Anthropic', env: 'ANTHROPIC_API_KEY', role: 'Long-context product reasoning, safety review, and requirements clarification.' },
    { id: 'openai', name: 'OpenAI', owner: 'OpenAI', env: 'OPENAI_API_KEY', role: 'App generation, tool orchestration, speech/text intent handling, and local workflow planning.' },
    { id: 'gemini', name: 'Gemini', owner: 'Google', env: 'GEMINI_API_KEY', role: 'Multimodal understanding, sensor-context analysis, image/audio/video workflow support.' },
    { id: 'deepcode', name: 'DeepCode', owner: 'Snyk/DeepCode', env: 'DEEPCODE_API_KEY', role: 'Generated-app code review, vulnerability scanning, and policy linting before install.' },
    { id: 'grok', name: 'Grok', owner: 'xAI', env: 'XAI_API_KEY', role: 'Realtime assistant persona, exploratory reasoning, and external-world context adapters.' },
  ];

  const osSettings = [
    { title: 'Device Settings', icon: Smartphone, items: ['Display + fullscreen shell', 'Notifications', 'Battery profile', 'Haptics', 'Input devices'] },
    { title: 'Hardware Permissions', icon: Lock, items: ['Camera', 'Microphone', 'Location/GNSS', 'NFC', 'Bluetooth', 'Motion sensors'] },
    { title: 'Agent Keys', icon: KeyRound, items: ['Claude', 'OpenAI', 'Gemini', 'DeepCode', 'Grok'] },
    { title: 'Runtime Services', icon: Server, items: ['Local app sandbox', 'Audit log', 'OTA channel', 'Rollback points', 'Policy engine'] },
  ];

  const hardwareLayers = [
    { title: 'Kernel + HAL Control', icon: Cpu, desc: 'A hardened Linux-derived core with audited hardware abstraction layers for modem, camera, GNSS, NFC, biometrics, secure element, battery, radios, haptics, microphones, and unused vendor sensor channels.' },
    { title: 'Sensor App Mesh', icon: Activity, desc: 'Every hardware capability receives its own first-party operations app, permission scope, simulator, diagnostics panel, and event stream so users can inspect what the device can do.' },
    { title: 'Privacy Enclave', icon: Shield, desc: 'Local-first identity, biometric commitments, encrypted health vaults, and attestation boundaries keep sensitive telemetry under the owner\'s control before any cloud or chain interaction.' },
    { title: 'Audio + Text Intent Layer', icon: Brain, desc: 'Users describe workflows by voice or text; the OS converts intent into plans, schemas, UI flows, automations, and sandboxed apps without requiring traditional coding.' },
  ];

  const agentPipeline = [
    'Capture natural-language intent from text or microphone',
    'Clarify missing requirements and risk boundaries',
    'Generate app manifest, data model, UI, automations, and permissions',
    'Run simulations against hardware capability mocks',
    'Package into a signed local mini-app with rollback and audit logs',
  ];

  const roadmap = [
    { phase: 'Phase 0', title: 'Feasibility & Device Targeting', items: ['Pick one reference phone board', 'Map bootloader status and drivers', 'Document sensor inventory', 'Define closed-source modules and open-source base'] },
    { phase: 'Phase 1', title: 'Core OS Prototype', items: ['Boot kernel and minimal shell', 'Implement HAL capability registry', 'Ship diagnostics apps', 'Add secure local identity vault'] },
    { phase: 'Phase 2', title: 'Agent Runtime', items: ['Intent parser', 'No-code app generator', 'Sandboxed permissions', 'Voice command pipeline'] },
    { phase: 'Phase 3', title: 'Developer + OEM Program', items: ['SDK and emulator', 'Hardware certification tests', 'OTA update service', 'Security review and compliance'] },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 overflow-hidden min-h-screen space-y-16">
      <section className="relative p-8 md:p-16 rounded-[48px] border border-indigo-500/20 bg-indigo-500/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.25),_transparent_45%)] pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/80 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200">Sovereign Mobile OS Initiative</span>
            </div>
            <div className="space-y-5">
              <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.82] text-white">
                VitalOS <span className="text-indigo-400">Core</span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light max-w-3xl">
                A mobile operating system concept for full-device sovereignty: kernel-level hardware access, per-sensor operational apps, encrypted owner-controlled telemetry, and a multi-agent no-code layer that builds personalized mini-apps from natural language.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Closed-source product shell', 'Open-source hardened base', 'Hardware capability registry', 'Agent-built local apps'].map((item) => (
                <div key={item} className="p-4 bg-black/30 border border-white/10 rounded-2xl text-[10px] text-slate-300 font-black uppercase tracking-widest leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={launchFullscreen}
                className="px-6 py-4 bg-white text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
              >
                <Maximize2 className="w-4 h-4" />
                {isFullscreen ? 'Fullscreen Active' : 'Launch Fullscreen Web OS'}
              </button>
              <a
                href="#vitalos-settings"
                className="px-6 py-4 bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-indigo-500/20 transition-all"
              >
                <Settings className="w-4 h-4" />
                Open Settings
              </a>
            </div>
          </div>
          <div className="bg-slate-950/80 border border-white/10 rounded-[36px] p-6 shadow-2xl shadow-indigo-950/40">
            <div className="rounded-[28px] border border-indigo-500/20 bg-black p-5 space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <span>Agent Build Console</span>
                <span className="text-emerald-400">Local</span>
              </div>
              <div className="space-y-3">
                {[
                  ['User', 'Build me a privacy-first asthma tracker that reads air quality, breathwork, GPS, and reminders.'],
                  ['Planner', 'Mapping sensors: microphone, GNSS, accelerometer, AQI API, notification channel.'],
                  ['Builder', 'Creating UI screens, vault schema, trigger rules, and permission manifest.'],
                  ['Verifier', 'Sandbox simulation passed. Installable mini-app ready.']
                ].map(([role, text]) => (
                  <div key={role} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.3em] mb-2">{role}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {hardwareLayers.map((layer) => (
          <div key={layer.title} className="p-7 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-indigo-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <layer.icon className="w-6 h-6 text-indigo-300" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-display font-black uppercase tracking-tight text-white mb-3">{layer.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-light">{layer.desc}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
        <div className="p-8 rounded-[36px] bg-slate-900/60 border border-white/10 space-y-6">
          <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.5em]">No-Code Agent Pipeline</p>
          <h2 className="text-4xl font-display font-black uppercase tracking-tighter text-white">From voice prompt to installed app</h2>
          <div className="space-y-4">
            {agentPipeline.map((step, index) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px] font-mono text-indigo-300 shrink-0">{index + 1}</div>
                <p className="text-sm text-slate-400 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-8 rounded-[36px] bg-white/[0.02] border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Hardware domains', value: '18+', icon: Cpu },
              { label: 'Generated app types', value: 'Unlimited', icon: Zap },
              { label: 'Permission model', value: 'Per sensor', icon: Lock },
              { label: 'Identity mode', value: 'Owner vault', icon: Fingerprint },
              { label: 'Automation scope', value: 'Device + cloud', icon: Globe },
              { label: 'Audit trail', value: 'Always on', icon: LineChart },
            ].map((metric) => (
              <div key={metric.label} className="p-5 rounded-3xl bg-black/30 border border-white/5">
                <metric.icon className="w-5 h-5 text-indigo-300 mb-5" strokeWidth={1.5} />
                <p className="text-2xl font-black text-white tracking-tight">{metric.value}</p>
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8" id="vitalos-settings">
        <div className="p-8 rounded-[36px] bg-slate-900/60 border border-white/10 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.5em]">Multi-Agent Runtime</p>
              <h2 className="text-4xl font-display font-black uppercase tracking-tighter text-white mt-3">Provider mesh ready for your APIs</h2>
            </div>
            <KeyRound className="w-8 h-8 text-indigo-300 shrink-0" strokeWidth={1.5} />
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            The OS shell is prepared for Claude, OpenAI, Gemini, DeepCode, and Grok. API keys stay server-side through environment variables; the web client only receives provider readiness and routing metadata.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agentProviders.map((provider) => (
              <div key={provider.id} className="p-5 rounded-3xl bg-black/30 border border-white/5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">{provider.name}</h3>
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest">{provider.owner}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[8px] font-black uppercase tracking-widest">Awaiting API</span>
                </div>
                <p className="text-[10px] text-indigo-300 font-mono mb-3">{provider.env}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{provider.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-[36px] bg-white/[0.02] border border-white/5 space-y-6">
          <div>
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.5em]">Fullscreen Web OS</p>
            <h2 className="text-4xl font-display font-black uppercase tracking-tighter text-white mt-3">Settings without leaving the app</h2>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            The current deliverable runs as a fullscreen-capable PWA-style web shell. Browser security still requires user permission for protected hardware, but the interface is structured as the OS settings console you requested.
          </p>
          <div className="space-y-4">
            {osSettings.map((group) => (
              <div key={group.title} className="p-5 rounded-3xl bg-black/30 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <group.icon className="w-5 h-5 text-indigo-300" strokeWidth={1.5} />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VitalOSBuilder />

      <section className="py-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.5em]">Execution Roadmap</p>
          <h2 className="text-5xl font-display font-black uppercase tracking-tighter text-white">Build it in controlled layers</h2>
          <p className="text-slate-500 text-sm leading-relaxed">Modern phones are locked down by bootloaders, vendor drivers, modem firmware, and regulatory constraints. The practical path starts with one reference device, proves hardware control safely, then expands through certification.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {roadmap.map((phase) => (
            <div key={phase.phase} className="p-7 rounded-[32px] border border-white/5 bg-slate-900/40 space-y-5">
              <p className="text-[10px] text-amber-400 font-mono font-black uppercase tracking-widest">{phase.phase}</p>
              <h3 className="text-xl font-display font-black uppercase tracking-tight text-white">{phase.title}</h3>
              <ul className="space-y-3">
                {phase.items.map((item) => (
                  <li key={item} className="flex gap-3 text-xs text-slate-500 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
      <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Testnet', value: 'Base Sepolia', tone: 'text-emerald-400' },
          { label: 'Temporary Site', value: 'vitalsdynft.fly.dev', tone: 'text-indigo-400' },
          { label: 'Mainnet Path', value: 'Base after presale funding', tone: 'text-amber-400' }
        ].map((item) => (
          <div key={item.label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.35em] mb-2">{item.label}</p>
            <p className={cn("text-sm font-mono font-bold uppercase", item.tone)}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-4 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Base Sepolia Presale Ready</span>
          </div>
          <h1 className="text-7xl font-display font-black uppercase tracking-tighter leading-none text-white">Secure <br/> Your Link</h1>
          <p className="text-slate-500 text-lg max-w-xl font-light leading-relaxed">
            Mint your Protocol Tier to begin decentralized biological synchronization. The testnet presale is configured for Base Sepolia first, with Base mainnet migration after treasury, audit, and liquidity milestones.
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
                     {cert.isOwned ? "Already Owned" : "Reserve Testnet Slot"}
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

const Dashboard = ({ nft, user, sync, claim, evolve, activate, pairWearable, activateHardware, setTarget, swapVitals, stakeVitals, unstakeVitals, logProgress }: any) => {
  const [serialInput, setSerialInput] = React.useState('');
  const [swapAmount, setSwapAmount] = React.useState(100);
  const [activeTab, setActiveTab] = React.useState('overview');
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

      {activeTab === 'overview' && (
        <>
          <main className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
        {/* Main Certificate Visual */}
        <div className="col-span-12 lg:col-span-12 xl:col-span-8 bg-[#020408] border border-white/5 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-2xl p-4 min-h-[500px]">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          
          {!nft.isActivated && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl">
              <div className="text-center p-12 max-w-lg">
                <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-indigo-500/30 relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-xl animate-pulse rounded-full" />
                  <Fingerprint className="w-10 h-10 text-indigo-500 relative" strokeWidth={1} />
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
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }} dy={10} />
                <Tooltip contentStyle={{ backgroundColor: '#020408', border: '1px solid #1e293b', borderRadius: '4px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="hours" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" />
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
                    <div className="h-px bg-white/5" />
                    <div className="grid grid-cols-1 gap-4 text-white">
                       <div className="flex justify-between items-center gap-6">
                          <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Target Chain</span>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">{nft.chainName} / {nft.chainId}</span>
                       </div>
                       <div className="flex justify-between items-center gap-6">
                          <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Contract</span>
                          <span className="text-[10px] font-mono font-bold text-white uppercase select-all truncate max-w-[220px]">{nft.contractAddress}</span>
                       </div>
                       <div className="flex justify-between items-center gap-6">
                          <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Bio Commitment</span>
                          <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase select-all truncate max-w-[220px]">{nft.biometricCommitment}</span>
                       </div>
                       <div className="flex justify-between items-center gap-6">
                          <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Metadata API</span>
                          <span className="text-[10px] font-mono font-bold text-white uppercase select-all">{nft.metadataUri}</span>
                       </div>
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

                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-8 rounded-3xl space-y-4">
                       <h4 className="text-xs font-black uppercase tracking-widest text-white">On-Chain Deployment Instructions</h4>
                       <ol className="text-[11px] text-slate-400 space-y-3 list-decimal ml-4 font-light">
                          <li>Read <code className="bg-black/50 px-1 rounded text-indigo-400">/api/deployment/manifest</code> to generate the constructor and first-mint payload.</li>
                          <li>Deploy <code className="text-indigo-400">contracts/VitalsDynamicNFT.sol</code> with your oracle address and contract metadata URI.</li>
                          <li>Mint with <code className="text-indigo-400">biometricCommitment</code> and <code className="text-indigo-400">holderProfileHash</code>; never upload raw biometrics to a public chain.</li>
                          <li>Point marketplaces to <code className="text-indigo-400">/api/metadata/1</code> or pin that JSON to IPFS after each oracle evolution.</li>
                          <li>Use <code className="text-indigo-400">evolveBiometrics</code> from the oracle to keep the dNFT alive as wearable data changes.</li>
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
                       <span className="text-indigo-400">&gt;&gt; RUNNING_VITALS_BUILD_6.4.2</span>
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
    case 'Nexus': return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10 shadow-indigo-500/5';
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

export default function App() {
  const { nft, user, loading, sync, claim, evolve, activate, pairWearable, activateHardware, buy, setTarget, swapVitals, stakeVitals, unstakeVitals, logProgress, connectWallet } = useVitals();
  const [view, setView] = React.useState(() => new URLSearchParams(window.location.search).get('view') || 'landing');
  const [isIdentityModalOpen, setIsIdentityModalOpen] = React.useState(false);

  if (loading) return <div className="h-screen flex items-center justify-center text-slate-400 uppercase tracking-widest text-[10px] font-mono">Initializing Protocol...</div>;

  const handleConnectIdentity = (domain: string) => {
    connectWallet(domain);
    setIsIdentityModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(120,119,198,0.1),_rgba(255,255,255,0))] pointer-events-none" />
      
      <Navbar 
        view={view} 
        setView={setView} 
        balance={user?.vitalsTBalance || 0} 
        user={user}
        connectWallet={() => setIsIdentityModalOpen(true)}
      />

      <IdentityModal 
        isOpen={isIdentityModalOpen}
        onClose={() => setIsIdentityModalOpen(false)}
        onConnect={handleConnectIdentity}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'landing' && <LandingPage onEnter={setView} />}
          {view === 'launchpad' && user && <MintingPage user={user} buy={buy} connectWallet={() => setIsIdentityModalOpen(true)} />}
          {view === 'mint' && user && <MintingPage user={user} buy={buy} connectWallet={() => setIsIdentityModalOpen(true)} />}
          {view === 'sovereign-os' && <SovereignOSPage />}
          {view === 'dashboard' && user && (
            <Dashboard 
              nft={nft || {
                certificateTier: 'PREVIEW_MODE',
                unclaimedVital: 1250,
                earnedTraits: ['Sovereign_Preview'],
                organType: 'Heart'
              }} 
              user={user} 
              sync={sync} 
              claim={claim} 
              evolve={evolve} 
              activate={activate}
              pairWearable={pairWearable}
              activateHardware={activateHardware}
              setTarget={setTarget}
              swapVitals={swapVitals}
              stakeVitals={stakeVitals}
              unstakeVitals={unstakeVitals}
              logProgress={logProgress}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer Bar */}
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
    </div>
  );
}
