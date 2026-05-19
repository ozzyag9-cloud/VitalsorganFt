import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, ThirdwebProvider, useActiveAccount } from "thirdweb/react";
import { 
  Heart, Brain, Zap, Activity, Gauge, Wallet, User, ArrowRight, X, 
  Shield, Fingerprint, Calendar, Lock, Cpu, Coins, Search, Globe, 
  Star, MessageSquare, Video, Music2, MessageCircle, Camera, 
  Youtube, Play, Settings, Terminal, ShieldCheck, Bluetooth, Wifi, 
  Database, Code, Dna, Twitter, Share2, Key, RefreshCw, Send, Check
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { cn, formatAddress } from './lib/utils';

// Thirdweb Client
const client = createThirdwebClient({
  clientId: "8383cd0939b07911befda59db81bed5a"
});

const initialStepsData = [
  { day: 'Mon', steps: 8432 },
  { day: 'Tue', steps: 12543 },
  { day: 'Wed', steps: 9821 },
  { day: 'Thu', steps: 11200 },
  { day: 'Fri', steps: 14000 },
  { day: 'Sat', steps: 7500 },
  { day: 'Sun', steps: 9100 },
];

const presetVideos = [
  { id: '5Wn_ecGbyW8', title: 'Cyberpunk Coding Loop', channel: 'Vital OS Network' },
  { id: 'S2pUvG7d9Vw', title: 'Ethereum Web3 Grid Demo', channel: 'Decentralized Labs' },
  { id: 'mK6_08Iorx8', title: 'Sovereign Nodes Calibration', channel: 'Core Intel' }
];

const Notification = ({ message, type, onClose }: { message: string; type: 'success' | 'warn' | 'info'; onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 20, scale: 0.95 }}
    className={cn(
      "fixed top-4 right-4 z-[3000] px-5 py-4 rounded-xl border backdrop-blur-3xl shadow-2xl flex items-center gap-4 max-w-[340px] md:max-w-md",
      type === 'success' ? "bg-black/95 border-toxic/40 text-toxic shadow-toxic/10" : 
      type === 'warn' ? "bg-black/95 border-rose-500/40 text-rose-500" :
      "bg-black/95 border-indigo-500/40 text-indigo-400"
    )}
  >
    <div className={cn("w-2 h-2 rounded-full shrink-0 animate-pulse", type === 'success' ? "bg-toxic" : type === 'warn' ? "bg-rose-500" : "bg-indigo-500")} />
    <div className="flex-1">
      <p className="text-[9px] font-black uppercase tracking-widest opacity-60">{type}</p>
      <p className="text-xs font-semibold leading-tight mt-0.5 text-slate-100">{message}</p>
    </div>
    <button onClick={onClose} className="opacity-40 hover:opacity-100 transition-opacity shrink-0"><X className="w-4 h-4 text-white" /></button>
  </motion.div>
);

const AppWindow = ({ title, icon: Icon, onClose, children }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95, y: 15 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 15 }}
    className="absolute inset-0 z-50 flex flex-col bg-obsidian md:inset-6 md:rounded-[36px] md:border md:border-white/10 md:shadow-2xl overflow-hidden"
  >
    <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/5 bg-black/40">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
          <Icon className="w-4.5 h-4.5 text-toxic" />
        </div>
        <div>
          <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">{title}</h2>
          <span className="text-[7px] text-slate-500 font-mono tracking-wider uppercase">VERIFIED SECURE MODULE</span>
        </div>
      </div>
      <button 
        onClick={onClose}
        className="w-8 h-8 rounded-full bg-white/5 hover:bg-rose-500/20 flex items-center justify-center border border-white/10 transition-all hover:border-rose-500/40 group cursor-pointer"
      >
        <X className="w-4 h-4 text-white group-hover:scale-110" />
      </button>
    </div>
    <div className="flex-1 overflow-y-auto relative scrollbar-hide">
      {children}
    </div>
  </motion.div>
);

const Landing = ({ onEnter }: { onEnter: () => void }) => (
  <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center overflow-hidden bg-obsidian">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(0,255,65,0.08),_rgba(255,255,255,0))] pointer-events-none" />
    
    <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
      <div className="w-full h-full bg-[linear-gradient(rgba(18,24,38,0.2)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.2)_1px,_transparent_1px)] bg-[size:24px_24px]" />
    </div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mb-8 p-1 px-4 border border-toxic/20 rounded-full bg-toxic/5 backdrop-blur-md"
    >
      <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.4em] text-toxic">Kernel Deployed Epoch v88.42</span>
    </motion.div>

    <motion.h1 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-display italic text-white tracking-tighter leading-[0.85] mb-8"
    >
      Biological <br />
      <span className="text-toxic not-italic font-sans font-black tracking-[-0.04em] uppercase text-3xl sm:text-5xl md:text-7xl lg:text-8xl">Sovereignty</span>
    </motion.h1>

    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-toxic/70 max-w-lg md:max-w-xl text-base sm:text-xl md:text-2xl font-light tracking-wide leading-relaxed mb-10 px-2"
    >
      Decentralized operating system powered by biological metrics. <br className="hidden sm:block" />
      Sign apps on blockchain. Own your telemetry.
    </motion.p>

    <motion.button 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      onClick={onEnter}
      className="group relative px-8 sm:px-12 py-4 sm:py-5 bg-toxic text-black rounded-2xl text-xs sm:text-sm font-black uppercase tracking-[0.25em] overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] active:scale-95 cursor-pointer"
    >
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
      <span className="relative flex items-center gap-3">
        Initialize Core Kernel <ArrowRight className="w-4 h-4" />
      </span>
    </motion.button>

    <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 max-w-4xl opacity-30 px-4">
      {[
        { l: 'Pulse Gas Sync', v: '1.2M MHZ' },
        { l: 'Verification Nodes', v: '84,221' },
        { l: 'Grid Availability', v: '99.9%' },
        { l: 'Core Protocol', v: '0xVITAL_8842' },
      ].map((stat, i) => (
        <div key={i} className="text-center border-t border-white/5 pt-4">
          <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.l}</p>
          <p className="text-xs sm:text-sm font-mono text-toxic font-bold">{stat.v}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const account = useActiveAccount();
  const [view, setView] = useState('landing');
  const [openApp, setOpenApp] = useState<string | null>(null);
  
  // OS States
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [vtlTokens, setVtlTokens] = useState(1482);
  const [currentBpm, setCurrentBpm] = useState(72);
  const [entropyRate, setEntropyRate] = useState(0.12);
  const [bioSignature, setBioSignature] = useState('UNINITIALIZED');
  const [isBioRegistered, setIsBioRegistered] = useState(false);
  
  // Blockchain Simulated Blocks & Contracts
  const [blockHeight, setBlockHeight] = useState(8842104);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([
    { tx: "0x7d25...fa31", type: "Epoch Tick", block: 8842104, sender: "SovereignNode", gas: "0.002 VTL", status: "Success" },
    { tx: "0x8fa1...99e8", type: "Registry Auth", block: 8842103, sender: "VitalIO_Kernel", gas: "0.012 VTL", status: "Success" },
    { tx: "0x12bb...11bb", type: "Mint Reward", block: 8842102, sender: "0xBio_Anchor_Pulse", gas: "0.001 VTL", status: "Success" }
  ]);

  // Social Grid Custom Feed Data
  const [socialTweets, setSocialTweets] = useState<any[]>([
    { id: '1', author: 'SovereignNode', handle: '0x8842...4411', msg: "Censorship-resistant microblogging is not just a feature, it's a biological right of the sovereign individual.", time: "1m", likes: 8842 },
    { id: '2', author: 'BioTracker_Core', handle: 'bio_pulse_net', msg: "Pre-installed App smart-contracts verified on-chain. Signature checks at full strength.", time: "10m", likes: 341 },
    { id: '3', author: 'Web3_Philosopher', handle: '0x99A3_Enclave', msg: "If security is not tied directly to state-level cryptographic bytecode, then it is merely a visual illusion.", time: "45m", likes: 1104 }
  ]);

  const [vpostText, setVpostText] = useState('');

  // YouTube / V-Tube Video States
  const [currentVideoId, setCurrentVideoId] = useState('5Wn_ecGbyW8');
  const [customVideoIn, setCustomVideoIn] = useState('');
  const [isMiningStream, setIsMiningStream] = useState(false);

  // App Builder & Smart Contract Compiler States
  const [compileAppName, setCompileAppName] = useState('HeartYield');
  const [compileAppVar, setCompileAppVar] = useState('bpmEscrow');
  const [compileTemplate, setCompileTemplate] = useState('Escrow');
  const [compilingStep, setCompilingStep] = useState(0); 
  const [compilerLogs, setCompilerLogs] = useState<string[]>([]);
  
  const [customApps, setCustomApps] = useState<any[]>([]);
  const [customAppStateVal, setCustomAppStateVal] = useState<Record<string, string>>({});

  // Dynamic updates
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulating live blockchain blocks and vitals fluctuation
  useEffect(() => {
    if (view !== 'dashboard') return;
    const blockTimer = setInterval(() => {
      setBlockHeight(prev => prev + 1);
      setCurrentBpm(prev => {
        const offset = Math.random() > 0.5 ? 1 : -1;
        const next = Math.max(58, Math.min(110, prev + offset));
        return next;
      });
      setEntropyRate(prev => Math.max(0.01, Math.min(0.99, Number((prev + (Math.random() - 0.5) * 0.02).toFixed(4)))));
    }, 4500);
    return () => clearInterval(blockTimer);
  }, [view]);

  // Dynamic mining counter
  useEffect(() => {
    let interval: any;
    if (isMiningStream && openApp === 'vtube') {
      interval = setInterval(() => {
        setVtlTokens(prev => prev + 1);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isMiningStream, openApp]);

  const addNotification = (message: string, type: 'success' | 'warn' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [{ id, message, type }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const activeUserAddress = account?.address || (isBioRegistered ? bioSignature : "0xBio_8842_Guest");

  // Authentication signature trigger
  const handleBioAuthRegister = () => {
    const mockSig = "0xBio_" + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('').slice(0, 16).toUpperCase() + "_8842";
    setBioSignature(mockSig);
    setIsBioRegistered(true);
    addNotification('Biometric Signature Derived Successfully!', 'success');
  };

  // Launch pre-installed App
  const handleOpenApp = (id: string) => {
    setActiveAppId(id);
    setIsVerifying(true);
    addNotification(`Signing transaction for contract: ${apps.find(a => a.id === id)?.name}`, 'info');
    setTimeout(() => {
      setIsVerifying(false);
      setOpenApp(id);
    }, 1400);
  };

  const handlePostTweet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vpostText.trim()) return;

    if (!isBioRegistered && !account) {
      addNotification('Biometric Signature or Web3 Identity Required To Broadcast!', 'warn');
      return;
    }

    const txHash = "0x" + Math.floor(Math.random()*10000000).toString(16) + "e" + Math.floor(Math.random()*9999).toString(16);
    const newTx = {
      tx: txHash.slice(0, 6) + "..." + txHash.slice(-4),
      type: "Social Broadcast",
      block: blockHeight,
      sender: activeUserAddress.slice(0, 6) + "..." + activeUserAddress.slice(-4),
      gas: "0.004 VTL",
      status: "Success"
    };

    const newTweet = {
      id: Math.random().toString(),
      author: isBioRegistered ? 'SovereignNode' : 'GridNode',
      handle: activeUserAddress.slice(0, 6) + "..." + activeUserAddress.slice(-4),
      msg: vpostText,
      time: "Now",
      likes: 1
    };

    setSocialTweets(prev => [newTweet, ...prev]);
    setRecentTransactions(prev => [newTx, ...prev]);
    setVtlTokens(prev => prev + 5);
    setVpostText('');
    addNotification('Post signed cryptographically and written to block!', 'success');
  };

  // Smart Contract App Compiler Function
  const handleCompileAndDeploy = () => {
    if (!compileAppName.trim() || !compileAppVar.trim()) {
      addNotification('Application title and variables are required!', 'warn');
      return;
    }

    setCompilingStep(1);
    setCompilerLogs([]);

    const logList = [
      `[COMPILER] Launching Solidity-Pulse Virtual Compiler v0.8.21...`,
      `[COMPILER] Parsing code interface contract ${compileAppName}...`,
      `[COMPILER] Initializing state variable: public uint256 ${compileAppVar}...`,
      `[COMPILER] Template code: ${compileTemplate} Logic bound successfully.`,
      `[COMPILER] Generating optimized grid-EVM bytecode segments...`,
      `[COMPILER] Size: 14.8 KB. Verification Hash: 0x6e9f...8a41`
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logList.length) {
        setCompilerLogs(prev => [...prev, logList[i]]);
        i++;
      } else {
        clearInterval(interval);
        setCompilingStep(2); 
      }
    }, 400);
  };

  const handleDeploySignature = () => {
    setCompilingStep(3);
    const contractAddr = "0xAPP_" + Array.from({length: 24}, () => Math.floor(Math.random()*16).toString(16)).join('').slice(0, 10).toUpperCase() + "_8842";
    const txHash = "0x" + Math.floor(Math.random()*10000000).toString(16) + "a8" + Math.floor(Math.random()*999).toString(16);
    
    setTimeout(() => {
      const newApp = {
        id: `custom_${compileAppName.toLowerCase()}`,
        name: compileAppName,
        icon: Code,
        color: 'bg-emerald-500/20',
        contractAddress: contractAddr,
        variableName: compileAppVar,
        variableVal: '0',
        isCustom: true,
        content: (
          <div className="p-6 space-y-6">
            <div className="bg-toxic/5 border border-toxic/20 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[8px] text-toxic font-mono">APP SMART CONTRACT</p>
                <h4 className="text-sm font-black text-white tracking-widest uppercase">{compileAppName}</h4>
                <p className="text-[10px] font-mono text-slate-500 mt-1">{contractAddr}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-toxic/15 flex items-center justify-center text-toxic">
                <Code className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
              <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black">Contract Interaction State</span>
              <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 font-mono">variable_{compileAppVar}:</span>
                <span className="text-sm font-bold font-mono text-toxic bg-toxic/5 px-2 py-0.5 rounded border border-toxic/10">
                  {customAppStateVal[`custom_${compileAppName.toLowerCase()}`] || '0'}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-[8px] text-slate-500 uppercase font-black tracking-wider block">Execute Method: set_{compileAppVar}(uint256 value)</label>
                <div className="flex gap-2">
                  <input 
                    id={`input_custom_${compileAppName.toLowerCase()}`}
                    type="number" 
                    placeholder="Enter value" 
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-toxic"
                  />
                  <button 
                    onClick={() => {
                      const inputEl = document.getElementById(`input_custom_${compileAppName.toLowerCase()}`) as HTMLInputElement;
                      if (inputEl) {
                        const nextVal = inputEl.value;
                        setCustomAppStateVal(prev => ({
                          ...prev,
                          [`custom_${compileAppName.toLowerCase()}`]: nextVal
                        }));
                        addNotification(`Transaction signed: state variable set to ${nextVal}`, 'success');
                        
                        const activeTxHash = "0x" + Math.floor(Math.random()*10000000).toString(16) + "e1";
                        setRecentTransactions(prev => [{
                          tx: activeTxHash.slice(0, 6) + "..." + activeTxHash.slice(-4),
                          type: `set_${compileAppVar}(${nextVal})`,
                          block: blockHeight,
                          sender: activeUserAddress.slice(0, 6) + "..." + activeUserAddress.slice(-4),
                          gas: "0.015 VTL",
                          status: "Success"
                        }, ...prev]);

                        inputEl.value = '';
                      }
                    }}
                    className="bg-toxic text-black text-xs font-black uppercase tracking-widest px-4 rounded-xl active:scale-95 transition-all cursor-pointer"
                  >
                    Write
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      };

      setCustomApps(prev => [...prev, newApp]);
      
      const newTx = {
        tx: txHash.slice(0, 6) + "..." + txHash.slice(-4),
        type: "Contract Deploy",
        block: blockHeight,
        sender: activeUserAddress.slice(0, 6) + "..." + activeUserAddress.slice(-4),
        gas: "0.285 VTL",
        status: "Success"
      };
      setRecentTransactions(prev => [newTx, ...prev]);

      setCompilingStep(0);
      setCompileAppName('HeartYield');
      setCompileAppVar('bpmEscrow');
      addNotification(`Contract deployed successfully! Installed on VitalOS dashboard.`, 'success');
    }, 1500);
  };

  const handleCustomAppLaunch = (app: any) => {
    setActiveAppId(app.id);
    setIsVerifying(true);
    addNotification(`Connecting sandbox to signature contract: ${app.name}`, 'info');
    setTimeout(() => {
      setIsVerifying(false);
      setOpenApp(app.id);
    }, 1400);
  };

  const apps = [
    { id: 'vpass', name: 'V-Pass', icon: Key, color: 'bg-toxic/20', content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-toxic/5 border border-toxic/20 p-6 md:p-8 rounded-[28px] text-center space-y-5">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-toxic text-black rounded-full mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(0,255,65,0.2)]">
            <Fingerprint className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base md:text-lg font-black uppercase tracking-widest text-white">Biometric Identity Auth</h3>
            <p className="text-toxic/60 text-[10px] md:text-xs max-w-xs mx-auto">Generate blockchain signatures derived securely from biological entropy metrics.</p>
          </div>
          
          {isBioRegistered ? (
            <div className="bg-black/60 p-4 rounded-xl border border-toxic/20 text-left font-mono space-y-1 text-[10px]">
              <div className="flex justify-between"><span className="text-slate-500">Status:</span><span className="text-toxic font-bold uppercase tracking-wider">Registered Node</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">Public Key:</span><span className="text-slate-200 select-all font-bold truncate block max-w-xs">{bioSignature}</span></div>
            </div>
          ) : (
            <button 
              onClick={handleBioAuthRegister} 
              className="w-full py-4 bg-toxic text-black font-black uppercase tracking-[0.2em] rounded-xl active:scale-95 transition-all text-xs cursor-pointer"
            >
              Sign With Bio-Key
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-center">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider mb-1">Entropy Capacity</p>
            <p className="text-xl md:text-2xl font-mono text-white font-bold">256-bit</p>
          </div>
          <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-center">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider mb-1">Assigned Layer</p>
            <p className="text-xl md:text-2xl font-mono text-white font-bold">0xV_CORE</p>
          </div>
        </div>
      </div>
    )},
    { id: 'vtube', name: 'V-Tube', icon: Youtube, color: 'bg-rose-500/20', content: (
      <div className="p-4 md:p-6 space-y-6">
        <div className="bg-black border border-white/10 rounded-2xl overflow-hidden aspect-video relative">
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=1&loop=1`}
            title="Sovereign Media Streamer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center border-b border-white/5 pb-3">
            <div>
              <p className="text-[8px] text-rose-500 font-mono tracking-widest uppercase font-bold">Live On-Chain Sandbox Stream</p>
              <h4 className="text-sm font-black text-white uppercase tracking-wider">
                {presetVideos.find(v => v.id === currentVideoId)?.title || "Custom Broadcast Stream"}
              </h4>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className="text-[9px] bg-white/5 text-slate-300 font-mono border border-white/10 rounded px-2 py-0.5">Stream Mining Status</span>
              <button 
                onClick={() => {
                  setIsMiningStream(!isMiningStream);
                  addNotification(isMiningStream ? 'Stream Reward Miner Switched Idle' : 'Stream Reward Mining Active! Rewards recording...', isMiningStream ? 'warn' : 'success');
                }}
                className={cn("px-3 py-1 text-[9px] font-black uppercase tracking-wide rounded-full transition-all flex items-center gap-1 cursor-pointer", isMiningStream ? "bg-toxic text-black animate-pulse" : "bg-white/10 text-white hover:bg-white/20")}
              >
                <Zap className="w-3 h-3" /> {isMiningStream ? 'Mining Active' : 'Start Mining'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Curated Sovereign Streams</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {presetVideos.map((video) => (
                <button 
                  key={video.id}
                  onClick={() => {
                    setCurrentVideoId(video.id);
                    addNotification(`Hooking stream: ${video.title}`, 'info');
                  }}
                  className={cn(
                    "text-left p-2.5 rounded-xl border transition-all text-[11px] font-medium block cursor-pointer",
                    currentVideoId === video.id ? "bg-rose-500/10 border-rose-500/40 text-rose-400" : "bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5"
                  )}
                >
                  <p className="font-bold truncate">{video.title}</p>
                  <p className="text-[8px] text-slate-500 mt-1 font-mono uppercase font-black">{video.channel}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black">Feed Custom Broadcast Video</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Paste YouTube Video ID or full URL..." 
                className="flex-1 text-xs bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-toxic"
                value={customVideoIn}
                onChange={(e) => setCustomVideoIn(e.target.value)}
              />
              <button 
                onClick={() => {
                  if (!customVideoIn.trim()) return;
                  let parsedId = customVideoIn.trim();
                  if (customVideoIn.includes('v=')) {
                    parsedId = customVideoIn.split('v=')[1]?.split('&')[0] || parsedId;
                  } else if (customVideoIn.includes('youtu.be/')) {
                    parsedId = customVideoIn.split('youtu.be/')[1]?.split('?')[0] || parsedId;
                  }
                  setCurrentVideoId(parsedId);
                  setCustomVideoIn('');
                  addNotification('External YouTube source hooked to sandbox player!', 'success');
                }}
                className="bg-toxic text-black px-4 text-[10px] font-black uppercase tracking-widest rounded-lg active:scale-95 transition-all hover:bg-toxic/90 cursor-pointer"
              >
                Load Stream
              </button>
            </div>
          </div>
        </div>
      </div>
    )},
    { id: 'vnode', name: 'X-Grid', icon: Twitter, color: 'bg-indigo-500/20', content: (
      <div className="flex flex-col h-full bg-[#0d0f14]">
        <div className="p-4 md:p-5 border-b border-white/5 flex items-center justify-between bg-black/40">
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Sovereign Social Grid</h4>
            <span className="text-[8px] text-slate-500 font-mono tracking-wider">Dynamic Blockchain Feed Microblog</span>
          </div>
          <Coins className="w-4 h-4 text-toxic" />
        </div>

        <form onSubmit={handlePostTweet} className="p-4 border-b border-white/5 bg-slate-950/40 space-y-3">
          <textarea 
            rows={2}
            className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none font-medium"
            placeholder="Derive biometric signatures to broadcast to the grid..."
            value={vpostText}
            onChange={(e) => setVpostText(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <div className="text-[9px] text-slate-500 font-mono">
              Signing wallet: <span className="text-indigo-400 font-bold">{activeUserAddress.slice(0, 10)}...</span>
            </div>
            <button 
              type="submit"
              className="bg-indigo-500 text-white rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-indigo-600 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3 h-3" /> Broadcast
            </button>
          </div>
        </form>

        <div className="flex-1 overflow-y-auto divide-y divide-white/5 scrollbar-hide">
          {socialTweets.map((node) => (
            <div key={node.id} className="p-4 md:p-5 flex gap-3 hover:bg-white/[0.01]">
              <div className="w-10 h-10 rounded-full shrink-0 bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-400 text-xs">
                {node.author[0]}
              </div>
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white uppercase">{node.author}</span>
                  <span className="text-[9px] text-slate-500 font-mono truncate">{node.handle} • {node.time}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{node.msg}</p>
                <div className="flex justify-between max-w-[200px] pt-1 text-[9px] text-slate-500">
                  <button onClick={() => addNotification('State Vote Sync Recorded', 'success')} className="hover:text-rose-500 transition-colors flex items-center gap-1 cursor-pointer">
                    <Heart className="w-3 h-3" /> {node.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-indigo-400"><MessageSquare className="w-3 h-3" /> 14</button>
                  <button className="flex items-center gap-1 hover:text-toxic"><RefreshCw className="w-3 h-3" /> Recast</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )},
    { id: 'vpulse', name: 'Vital Grid', icon: Activity, color: 'bg-toxic/20', content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="h-44 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
          <p className="text-[9px] font-black uppercase text-toxic mb-3 tracking-widest">Live Bio-Frequency Stream</p>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={initialStepsData}>
              <defs>
                <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF41" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#00FF41" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="steps" stroke="#00FF41" fillOpacity={1} fill="url(#colorPulse)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block mb-1">Heart Pulse Rate</p>
            <p className="text-lg md:text-xl font-mono text-toxic font-bold animate-pulse">{currentBpm} BPM</p>
          </div>
          <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block mb-1">System Entropy Value</p>
            <p className="text-lg md:text-xl font-mono text-indigo-400 font-bold">{entropyRate * 100}%</p>
          </div>
        </div>

        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl text-center space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Biological Synchronization Rate</span>
            <span className="text-toxic font-mono font-bold">99.98%</span>
          </div>
          <button 
            onClick={() => {
              setCurrentBpm(72);
              setEntropyRate(0.12);
              addNotification('Biological frequencies recalibrated and synced on-chain', 'success');
            }} 
            className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer"
          >
            Request State Recalibration
          </button>
        </div>
      </div>
    )},
    { id: 'vcompiler', name: 'V-Compiler', icon: Code, color: 'bg-emerald-500/20', content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <h3 className="text-base font-black uppercase tracking-wider text-white">Sovereign App Compiler</h3>
          <p className="text-[10px] text-slate-500 font-mono leading-relaxed">
            Construct application interfaces as encrypted smart-contracts. Deploy on the Grid to install them as live sandbox tools on your dashboard.
          </p>
        </div>

        {compilingStep === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-500 uppercase font-black block">Application Title</label>
                <input 
                  type="text" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-toxic placeholder-slate-600 font-mono"
                  placeholder="e.g. BrainVault"
                  value={compileAppName}
                  onChange={(e) => setCompileAppName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-500 uppercase font-black block">Variable State Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-toxic placeholder-slate-600 font-mono"
                  placeholder="e.g. brainEscrow"
                  value={compileAppVar}
                  onChange={(e) => setCompileAppVar(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] text-slate-500 uppercase font-black block">Smart Contract Structure Logic</label>
              <div className="grid grid-cols-3 gap-2">
                {['Escrow', 'Storage', 'YieldSync'].map((t) => (
                  <button 
                    key={t}
                    type="button"
                    onClick={() => setCompileTemplate(t)}
                    className={cn(
                      "p-3 rounded-xl border text-xs font-black uppercase tracking-wider text-center transition-all cursor-pointer",
                      compileTemplate === t ? "bg-toxic/10 border-toxic/40 text-toxic" : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5"
                    )}
                  >
                    {t} Template
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-black/60 p-4 rounded-xl border border-white/5 font-mono text-[9px] text-slate-400 space-y-1 overflow-x-auto max-h-32 scrollbar-hide">
              <p className="text-toxic">// SPDX-License-Identifier: MIT</p>
              <p className="text-slate-500">pragma solidity ^0.8.21;</p>
              <p className="text-indigo-400">contract {compileAppName}OS {'{'}</p>
              <p className="pl-4 text-slate-300">uint256 public {compileAppVar};</p>
              <p className="pl-4 text-slate-500 font-mono">address public biometricIssuer = {activeUserAddress.slice(0, 10)}...;</p>
              <p className="pl-4 text-indigo-400">function set_{compileAppVar}(uint256 _val) public {'{'}</p>
              <p className="pl-8 text-slate-300">{compileAppVar} = _val;</p>
              <p className="pl-4">{'}'}</p>
              <p>{'}'}</p>
            </div>

            <button 
              onClick={handleCompileAndDeploy}
              className="w-full py-4 bg-toxic text-black font-black uppercase tracking-[0.2em] rounded-xl text-xs active:scale-95 transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] cursor-pointer"
            >
              Sign & Compile Solidity Contract
            </button>
          </div>
        )}

        {compilingStep === 1 && (
          <div className="space-y-4 text-center py-6 bg-black/40 border border-white/5 rounded-2xl">
            <div className="w-12 h-12 rounded-full border-2 border-toxic border-t-transparent animate-spin mx-auto" />
            <div className="text-left font-mono text-[9px] text-slate-400 max-w-sm mx-auto p-4 space-y-1 bg-black rounded-lg">
              {compilerLogs.map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>
            <p className="text-xs text-toxic uppercase tracking-widest font-black animate-pulse">Compiling app code segments...</p>
          </div>
        )}

        {compilingStep === 2 && (
          <div className="p-6 border border-indigo-500/40 bg-indigo-500/5 rounded-2xl text-center space-y-5">
            <Lock className="w-10 h-10 text-indigo-400 mx-auto animate-bounce" />
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Sign Broadcast Envelope</h4>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto">Confirm deployment on Vital Grid blockchain. Biometric signature guarantees app safety and prevents malicious modification.</p>
            </div>
            
            <button 
              onClick={handleDeploySignature}
              className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              Authorize With Fingerprint Sig
            </button>
          </div>
        )}

        {compilingStep === 3 && (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-toxic/10 rounded-full flex items-center justify-center text-toxic mx-auto"><Check className="w-6 h-6" /></div>
            <p className="text-xs text-slate-300 font-black uppercase">App smart contract deployed successfully!</p>
          </div>
        )}

      </div>
    )},
    { id: 'vitalscan', name: 'VitalScan', icon: Search, color: 'bg-zinc-500/20', content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex justify-between items-center">
          <div>
            <span className="text-[8px] text-slate-500 font-mono block uppercase">Grid Network Height</span>
            <span className="text-base font-mono font-bold text-white">#{blockHeight}</span>
          </div>
          <div>
            <span className="text-[8px] text-slate-500 font-mono block uppercase">Base Gas Cost</span>
            <span className="text-xs font-mono font-bold text-toxic">12.1 Gwei</span>
          </div>
          <div>
            <span className="text-[8px] text-slate-500 font-mono block uppercase">Synced Enclaves</span>
            <span className="text-xs font-mono font-bold text-white">44,812 Connected</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center font-mono">
            <h5 className="text-[9px] font-black uppercase text-indigo-400 tracking-wider">Blockchain Activity Receipts</h5>
            <span className="text-[8px] text-slate-500">Live Sync Status</span>
          </div>

          <div className="space-y-2 max-h-[160px] overflow-y-auto scrollbar-hide">
            {recentTransactions.map((tx, idx) => (
              <div key={idx} className="p-3 bg-black/60 border border-white/5 rounded-xl flex items-center justify-between text-[11px] font-mono hover:bg-white/[0.01]">
                <div className="space-y-0.5 min-w-0">
                  <p className="font-bold text-white truncate">{tx.type}</p>
                  <p className="text-[9px] text-slate-500 truncate">Tx: {tx.tx} • Sender: {tx.sender}</p>
                </div>
                <div className="text-right space-y-0.5 shrink-0">
                  <p className="text-toxic">{tx.gas}</p>
                  <p className="text-[8px] text-indigo-400 font-bold">Block {tx.block}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-[9px] font-black uppercase tracking-wider text-slate-400">Deployed App Contracts Directory</h5>
          <div className="space-y-2">
            {[
              { n: 'Vital Core Wallet (V-Pass)', a: '0x8842...DEAD', s: 'Verified System Core' },
              { n: 'Biometric Pulse Engine (Vital Grid)', a: '0x8842...A1C3', s: 'Verified System Core' },
              { n: 'X-Grid Microblogging (Connect)', a: '0x8842...CDE2', s: 'Verified System Core' }
            ].map((con, idx) => (
              <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider">{con.n}</p>
                  <p className="font-mono text-[9px] text-slate-500 mt-0.5">{con.a}</p>
                </div>
                <span className="text-[8px] px-2 py-0.5 rounded border border-toxic/20 text-toxic bg-toxic/5 font-mono uppercase tracking-widest">{con.s}</span>
              </div>
            ))}
            {customApps.map((app) => (
              <div key={app.id} className="p-3 bg-white/[0.03] border border-white/10 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider">{app.name}</p>
                  <p className="font-mono text-[9px] text-indigo-400 mt-0.5 truncate max-w-xs">{app.contractAddress}</p>
                </div>
                <span className="text-[8px] px-2 py-0.5 rounded border border-indigo-500/40 text-indigo-400 bg-indigo-500/5 font-mono uppercase tracking-widest">Signed User App</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )},
    { id: 'settings', name: 'Profile', icon: Settings, color: 'bg-zinc-500/20', content: (
      <div className="p-6 md:p-8 space-y-6">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Security Layers</h4>
          <div className="space-y-2">
            {[
              { n: 'Kernel Shield', v: 'Active', s: 'success' },
              { n: 'On-Chain Sync', v: 'Encrypted', s: 'success' },
              { n: 'Hardware Bridge', v: 'Standby', s: 'info' },
            ].map((set, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                <span className="text-xs font-bold text-white uppercase">{set.n}</span>
                <span className={cn("text-[8px] font-black uppercase px-2 py-0.5 rounded-full border", set.s === 'success' ? "text-toxic border-toxic/40 bg-toxic/10 font-mono" : "text-indigo-400 border-indigo-500/40 bg-indigo-500/10 font-mono")}>{set.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3 bg-black/40">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Identity Storage Matrix</p>
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Mainnet ID:</span>
            <span className="text-white font-bold truncate max-w-[200px] block">{activeUserAddress}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Total Rewards Balance:</span>
            <span className="text-toxic font-bold">{vtlTokens} VTL</span>
          </div>
        </div>
      </div>
    )}
  ];

  if (view === 'landing') return <Landing onEnter={() => setView('dashboard')} />;

  return (
    <ThirdwebProvider>
      <div className="fixed inset-0 z-0 bg-obsidian text-slate-100 font-sans selection:bg-toxic selection:text-black overflow-hidden flex flex-col h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(0,255,65,0.06),_rgba(255,255,255,0))] pointer-events-none" />
        
        {/* Verification Overlay */}
        <AnimatePresence>
          {isVerifying && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-6"
            >
               <div className="relative w-20 h-20 mb-5">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 border-2 border-toxic/20 border-t-toxic rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-toxic animate-pulse" />
                  </div>
               </div>
               <p className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-1.5">Cryptographic Bytecode Verification</p>
               <p className="text-[8px] font-mono text-toxic/70 uppercase">0xV_APP_{activeAppId?.toUpperCase()}_8842</p>
               <p className="text-[7px] text-slate-500 font-bold uppercase mt-3">Validating Signature Matrix Integrity on VitalOS Core...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Notifications */}
        <AnimatePresence>
          {notifications.map(n => (
            <Notification key={n.id} message={n.message} type={n.type} onClose={() => setNotifications(prev => prev.filter(x => x.id !== n.id))} />
          ))}
        </AnimatePresence>

        {/* Status Bar */}
        <nav className="relative z-40 px-4 md:px-6 py-3 flex items-center justify-between border-b border-white/5 bg-black/60 backdrop-blur-lg">
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-toxic/10 border border-toxic/30 flex items-center justify-center text-toxic">
                <Dna className="w-4.5 h-4.5 animate-pulse" />
              </div>
              <h1 className="text-xs sm:text-sm font-black uppercase tracking-[0.25em]">VitalOS</h1>
            </div>
            <div className="hidden md:flex items-center gap-4 text-slate-400">
               <div className="flex items-center gap-1.5">
                 <Wifi className="w-3.5 h-3.5 text-toxic" />
                 <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">Grid_Mainnet</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <Database className="w-3.5 h-3.5 text-indigo-400" />
                 <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">884.2 GB Sync</span>
               </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-1.5 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-xl">
               <Coins className="w-3.5 h-3.5 text-toxic" />
               <span className="text-[10px] font-mono font-bold text-white">{vtlTokens} VTL</span>
             </div>
             
             <ConnectButton 
               client={client}
               theme={"dark"}
               connectButton={{
                 label: "Synch Wallet",
                 className: "!bg-toxic !text-black !text-[10px] !font-black !uppercase !tracking-widest !rounded-xl !px-5 !py-2 !h-auto !border-0 !transition-all hover:!scale-105 active:!scale-95"
               }}
             />
          </div>
        </nav>

        {/* OS Body */}
        <main className="flex-1 relative overflow-hidden flex flex-col md:flex-row bg-[#020306]">
           {/* Mobile Clock & Status Banner */}
           <div className="block md:hidden text-center py-6 relative z-10 px-4">
              <h1 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight leading-none">{time}</h1>
              <p className="text-[8px] sm:text-[9px] text-toxic font-mono uppercase tracking-[0.3em] mt-1.5">{date}</p>
           </div>

           {/* App Grid */}
           <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 relative z-10 flex flex-col items-center justify-center">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-4xl">
                {apps.map((app, i) => (
                  <motion.button
                    key={app.id}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleOpenApp(app.id)}
                    className="flex flex-col items-center gap-1.5 sm:gap-2.5 group cursor-pointer"
                  >
                    <div className={cn("w-12 h-12 sm:w-16 sm:h-16 rounded-[18px] sm:rounded-[24px] glass-card flex items-center justify-center border-white/10 transition-all group-hover:border-white/25 group-hover:bg-white/5 relative shadow-lg shadow-black/40")}>
                       <div className={cn("absolute inset-2 blur-xl opacity-0 group-hover:opacity-40 transition-opacity rounded-full", app.color)} />
                       <app.icon className="w-5.5 h-5.5 sm:w-7 sm:h-7 text-white/50 group-hover:text-white transition-all transform group-hover:scale-105" strokeWidth={1.5} />
                    </div>
                    <span className="text-[7.5px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-[0.15em] group-hover:text-white transition-colors">{app.name}</span>
                  </motion.button>
                ))}

                {/* Custom Installed Apps List dynamically */}
                {customApps.map((app, i) => (
                  <motion.button
                    key={app.id}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => handleCustomAppLaunch(app)}
                    className="flex flex-col items-center gap-1.5 sm:gap-2.5 group cursor-pointer"
                  >
                    <div className={cn("w-12 h-12 sm:w-16 sm:h-16 rounded-[18px] sm:rounded-[24px] bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-center transition-all group-hover:border-emerald-500/50 group-hover:bg-emerald-900/15 relative shadow-lg shadow-black/40")}>
                       <div className="absolute inset-2 blur-xl opacity-0 group-hover:opacity-30 transition-opacity rounded-full bg-emerald-500/20" />
                       <app.icon className="w-5.5 h-5.5 sm:w-7 sm:h-7 text-emerald-400/60 group-hover:text-emerald-400 transition-all transform group-hover:scale-105" strokeWidth={1.5} />
                    </div>
                    <span className="text-[7.5px] sm:text-[9px] text-emerald-500/80 font-bold uppercase tracking-[0.15em] group-hover:text-emerald-300 transition-colors">{app.name}</span>
                  </motion.button>
                ))}
              </div>
           </div>

           {/* Desktop Clock Overlay - Styled elegantly without clipping */}
           <div className="hidden md:flex absolute top-1/2 right-10 lg:right-16 -translate-y-1/2 flex-col items-end text-right pointer-events-none opacity-20 hover:opacity-100 transition-opacity max-w-[320px] lg:max-w-none">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl 2xl:text-[6.5rem] font-display font-semibold text-white tracking-tighter leading-none">{time}</h1>
              <p className="text-[9px] lg:text-2xs text-toxic font-mono uppercase tracking-[0.3em] mt-2 block">{date}</p>
           </div>
        </main>

        {/* Windows rendering with proper full bounds sizing */}
        <AnimatePresence>
          {openApp && (
            <AppWindow 
              title={apps.find(a => a.id === openApp)?.name || customApps.find(a => a.id === openApp)?.name} 
              icon={apps.find(a => a.id === openApp)?.icon || customApps.find(a => a.id === openApp)?.icon} 
              onClose={() => setOpenApp(null)}
            >
              {apps.find(a => a.id === openApp)?.content || customApps.find(a => a.id === openApp)?.content}
            </AppWindow>
          )}
        </AnimatePresence>

        {/* Bottom Bar */}
        <footer className="relative z-40 p-3 md:p-4 border-t border-white/5 bg-black/60 backdrop-blur-lg flex items-center justify-between px-4 sm:px-6 md:px-8">
           <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex flex-col">
                 <span className="text-[7.5px] font-black text-slate-500 uppercase tracking-wider font-mono">Core Ledger Sync</span>
                 <span className="text-[9px] font-mono text-toxic font-bold uppercase">SEC_ROOT/8842</span>
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-4">
                 <div className="flex items-center gap-1.5">
                   <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                   <span className="text-[9px] font-mono text-white tracking-widest uppercase font-semibold">{currentBpm} BPM</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <Brain className="w-3.5 h-3.5 text-toxic" />
                   <span className="text-[9px] font-mono text-white tracking-widest uppercase font-semibold">Grid Core Stable</span>
                 </div>
              </div>
           </div>
           
           <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden md:flex items-center gap-2">
                 <Shield className="w-4 h-4 text-toxic animate-pulse" />
                 <span className="text-[8.5px] font-mono font-bold uppercase tracking-widest text-toxic">Encrypted Block Secure Layer 7</span>
              </div>
              
              <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-lg px-2 py-1">
                 <span className="text-[9.5px] font-black font-mono text-white font-bold">99%</span>
                 <Battery className="w-4 h-4 text-slate-400" />
              </div>
           </div>
        </footer>
      </div>
    </ThirdwebProvider>
  );
}

const Battery = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="16" height="10" rx="1.5" ry="1.5"/>
    <line x1="22" y1="11" x2="22" y2="13"/>
  </svg>
);
