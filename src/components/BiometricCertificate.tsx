import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, QrCode, ShieldCheck, Info, Zap, Flame, Award, Heart, Activity } from 'lucide-react';
import { PhotorealisticRing } from './PhotorealisticRing';
import { CertificateTier, OrganType } from '../types';
import { cn } from '../lib/utils';

interface BiometricCertificateProps {
  certificateId: string;
  tier: CertificateTier;
  organ: OrganType;
  issueDate: string;
  traits: string[];
  ownerName?: string;
  isActivated?: boolean;
}

const TRAIT_CONFIG: Record<string, { icon: any, color: string, label: string }> = {
  "Bio-Link Initialized": { icon: Zap, color: "text-indigo-400", label: "Protocol Base" },
  "Vital Mark": { icon: Flame, color: "text-rose-500", label: "Metabolic Peak" },
  "Alpha Continuity": { icon: Award, color: "text-amber-400", label: "Alpha Tier" },
  "Neural Peak": { icon: Activity, color: "text-emerald-400", label: "Neural Load" },
  "Genesis Asset": { icon: Heart, color: "text-sky-400", label: "Origin Unit" },
  "System Calibrating...": { icon: Info, color: "text-slate-500", label: "Pending" }
};

const TraitBadge = ({ trait }: { trait: string, key?: React.Key }) => {
  const config = TRAIT_CONFIG[trait] || { icon: ShieldCheck, color: "text-slate-400", label: trait };
  const Icon = config.icon;
  
  return (
    <div className="group/trait relative flex items-center justify-center">
      <div className={cn(
        "w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/[0.07] hover:border-white/20",
        config.color.replace('text-', 'shadow-[0_0_10px_').replace('500', '500/20]')
      )}>
        <Icon className={cn("w-4 h-4", config.color)} strokeWidth={1.5} />
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 opacity-0 group-hover/trait:opacity-100 transition-all pointer-events-none translate-y-2 group-hover/trait:translate-y-0 z-50">
         <div className="bg-[#05070c] border border-white/10 px-3 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-white">{config.label}</p>
            <p className="text-[8px] text-slate-500 uppercase tracking-tighter mt-1">Status: Verified Artifact</p>
         </div>
      </div>
    </div>
  );
};

export const BiometricCertificate = ({ 
  certificateId, 
  tier, 
  organ, 
  issueDate, 
  traits,
  ownerName = "SECURE_HOLDER",
  isActivated = true 
}: BiometricCertificateProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScanning, setIsScanning] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleHoldStart = () => {
    if (isUnlocked) return;
    setIsScanning(true);
    let start = 0;
    const interval = setInterval(() => {
      start += 2;
      setScanProgress(start);
      if (start >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setIsUnlocked(true);
      }
    }, 15);
  };

  const handleHoldEnd = () => {
    if (!isUnlocked) {
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-[900px] aspect-[1.45] bg-[#020408] border-[2px] border-[#1a1c24] rounded-sm p-1 overflow-hidden group shadow-[0_0_120px_rgba(0,0,0,1)]"
    >
      {/* 4K Global Texture Overlay */}
      <div className="absolute inset-0 z-[45] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Holographic Security Layer (Diffraction Grating Simulation) */}
      <div 
        className="absolute inset-0 z-[40] pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.4) 0%, transparent 40%), 
                       linear-gradient(${mousePos.x}deg, rgba(255,0,0,0.1), rgba(0,255,0,0.1), rgba(0,0,255,0.1))`
        }}
      />

      {/* 4K High-Fidelity Infrastructure Layer */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none grayscale contrast-125">
        <img 
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000" 
          alt="4K Tech Infrastructure" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      {/* Heavy Industrial Outer Frame */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 border-[24px] border-[#080a12] pointer-events-none z-10" />
      <div className="absolute inset-6 border border-white/5 pointer-events-none z-10" />
      <div className="absolute inset-1 w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_60%)] pointer-events-none" />
      
      {/* Mechanical Background - Rotating Gears */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] opacity-[0.05] pointer-events-none mix-blend-screen scale-150">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[20px] border-dashed border-slate-400 rounded-full" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute inset-12 border-[10px] border-dotted border-slate-500 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-1 h-32 bg-slate-500/20 rounded-full rotate-45" />
           <div className="w-1 h-32 bg-slate-500/20 rounded-full -rotate-45" />
        </div>
      </div>

      {/* Rock Texture Overlay for Central Hub */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay pointer-events-none" />

      <div className="relative h-full flex flex-col p-14 bg-transparent z-20">
        
        {/* Top Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-6">
            <div>
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.4em] mb-1 opacity-60">Certificate ID</p>
              <p className="text-sm font-mono text-indigo-400 font-bold bg-indigo-500/5 px-2 py-0.5 rounded-sm border border-indigo-500/10 inline-block">{certificateId}</p>
            </div>
            <div>
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.4em] mb-1 opacity-60">Issue Date</p>
              <p className="text-xs text-slate-300 font-black uppercase tracking-tight">{issueDate}</p>
            </div>
          </div>

          <div className="text-center px-4">
             <div className="flex flex-col items-center">
                <div className="flex items-center gap-6 mb-1">
                   <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                   <h1 className="text-5xl font-serif text-slate-100 tracking-[0.25em] uppercase leading-none italic font-normal">Certificate</h1>
                   <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-white/20 to-transparent" />
                </div>
                <p className="text-[9px] text-slate-500 uppercase tracking-[0.6em] font-black italic opacity-60">Of Authenticity & Innovation</p>
             </div>
          </div>

          <div className="relative">
            <div className="w-24 h-24 rounded-full border border-white/5 bg-[#0a0c14] flex items-center justify-center relative overflow-hidden group/seal shadow-2xl">
               <div className="absolute inset-0 bg-blue-500/[0.05]" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border border-indigo-500/10 border-dashed rounded-full"
               />
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative w-12 h-12 mb-1 group-hover/seal:scale-110 transition-transform">
                     <div className="absolute inset-0 bg-[conic-gradient(from_0deg,red,orange,yellow,green,blue,indigo,violet,red)] animate-spin-slow opacity-20 rounded-full blur-md" />
                     <ShieldCheck className="absolute inset-0 w-full h-full text-indigo-500/30 blur-md" />
                     <ShieldCheck className="relative w-full h-full text-indigo-400" strokeWidth={0.75} />
                  </div>
                  <p className="text-[6px] font-black uppercase text-indigo-500/60 tracking-tighter leading-none">Security<br/>Hologram</p>
                  <p className="text-[4px] text-slate-700 font-mono mt-1 uppercase tracking-widest leading-none">HOLO_AUTH_0x2</p>
               </div>
            </div>
            <div className="absolute -inset-2 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.05)_0%,_transparent_70%)] pointer-events-none" />
          </div>
          {/* Micro-print Security Border */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[80%] h-4 pointer-events-none opacity-20">
             <p className="text-[4px] text-white/10 font-mono uppercase tracking-[1em] whitespace-nowrap overflow-hidden">
                VITALS_PROTOCOL_GENESIS_BLOCK_AUTHENTICATED_SECURE_ENCLAVE_READY_BIOMETRIC_LINK_ACTIVE_0x7F2A
             </p>
          </div>
        </div>

        {/* Technical Blueprint Elements */}
        <div className="absolute inset-x-0 top-[180px] h-px bg-white/[0.03] pointer-events-none" />
        <div className="absolute left-[300px] top-0 bottom-0 w-px bg-white/[0.03] pointer-events-none" />
        <div className="absolute right-[300px] top-0 bottom-0 w-px bg-white/[0.03] pointer-events-none" />

        {/* Main Interface Content */}
        <div className="flex-1 flex items-center justify-between gap-0 relative">
          
          {/* Left Column: QR & Biometric UI */}
          <div className="w-[180px] h-full flex flex-col justify-end pb-12 gap-16">
            <div className="space-y-3">
              <div className="relative group/qr p-2 bg-[#05070c]/80 backdrop-blur-md border border-white/10 inline-block shadow-2xl">
                <QrCode className="w-32 h-32 text-indigo-400/70 group-hover/qr:text-white transition-colors duration-500" strokeWidth={0.5} />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-0 group-hover/qr:opacity-100 transition-opacity" />
                
                {/* 4K Precision Markings */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-indigo-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-indigo-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-indigo-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-indigo-400 group-hover:scale-110 transition-transform" />
                
                {/* QR Code Meta */}
                <div className="absolute -right-12 top-0 vertical-text text-[6px] text-white/20 font-mono tracking-widest uppercase">
                   Unique_ID_Verified_0x1A
                </div>
              </div>
              <p className="text-[7px] text-slate-500 font-black uppercase tracking-[0.4em] leading-tight">Digital Authenticity<br/>Validation Array</p>
            </div>

            <div className="space-y-4">
              <div 
                onMouseDown={handleHoldStart}
                onMouseUp={handleHoldEnd}
                onMouseLeave={handleHoldEnd}
                onTouchStart={handleHoldStart}
                onTouchEnd={handleHoldEnd}
                className={cn(
                  "relative w-32 h-40 bg-[#04060a]/90 backdrop-blur-xl border border-white/10 rounded-[35px] flex flex-col items-center justify-center cursor-pointer transition-all active:scale-[0.97] overflow-hidden shadow-[inset_0_2px_20px_rgba(0,0,0,0.9)] group/scanner",
                  isUnlocked ? "border-indigo-400/50 shadow-[0_0_40px_rgba(99,102,241,0.3)]" : "hover:border-white/20"
                )}
              >
                {/* 4K Biometric Texture */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.2)_0%,_transparent_70%)]" />
                   <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center">
                  <Fingerprint className={cn("w-20 h-20 transition-all duration-1000", isUnlocked ? "text-indigo-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.8)] scale-110" : "text-slate-800 group-hover/scanner:text-indigo-900")} strokeWidth={0.2} />
                  <div className="mt-4 flex flex-col items-center gap-1">
                     <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest leading-none">Biometric</p>
                     <p className="text-[6px] text-indigo-500/50 font-mono uppercase tracking-[0.2em] leading-none">SCANNER_PRO_4K</p>
                  </div>
                </div>
                
                {isScanning && (
                  <motion.div 
                    initial={{ top: '0%' }} animate={{ top: '100%' }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[10px] bg-indigo-400/50 blur-md z-20"
                  />
                )}
                {/* Scanner Progress fill */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-indigo-600/40 to-transparent transition-all duration-300 ease-out" style={{ height: `${scanProgress}%` }} />
              </div>
              <p className="text-[6px] text-slate-700 font-black uppercase tracking-[0.5em] text-center italic opacity-40">Biometric Identity Port</p>
            </div>
          </div>

          {/* Central Product Artifact: Ring Focal Point */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Rock Shadow / Ambient Occlusion */}
            <div className="absolute bottom-1/4 w-[400px] h-32 bg-black/60 blur-3xl rounded-full translate-y-16" />
            
            {/* Geometric Concentric Rings */}
            <div className="absolute w-[500px] h-[500px] border border-white/[0.02] rounded-full pointer-events-none" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="absolute w-[440px] h-[440px] border border-indigo-500/5 border-dashed rounded-full pointer-events-none"
            />
            
            {/* Main Smart Ring Model */}
            <div className="relative z-20 hover:scale-105 transition-transform duration-1000 ease-in-out cursor-crosshair">
               <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] rounded-full -z-10" />
               <PhotorealisticRing tier={tier} size={420} />
            </div>

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full text-center">
               <div className="flex items-center justify-center gap-8">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/10" />
                  <p className="text-[11px] text-slate-500 font-light tracking-[0.8em] uppercase italic opacity-40">Privacy • Sovereignty • Evolution</p>
                  <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/10" />
               </div>
            </div>
          </div>

          {/* Right Column: Metadata & Physical Tokens */}
          <div className="w-[180px] h-full flex flex-col justify-between items-end pb-8">
            <div className="text-right space-y-8 pt-4">
              <div className="space-y-6">
                <div className="space-y-1 border-r-2 border-indigo-500/20 pr-4">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2 italic opacity-60">Earned Artifacts</p>
                  <div className="flex flex-wrap justify-end gap-3">
                    {traits.map((trait, i) => (
                      <TraitBadge key={i} trait={trait} />
                    ))}
                  </div>
                </div>
                
                <div className="pr-4 border-r border-slate-700">
                   <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest leading-none mb-2">Protocol Link</p>
                   <p className="text-sm font-sans font-black text-slate-400 italic">SECURE_ENCLAVE_READY</p>
                   <div className="h-0.5 w-12 bg-indigo-500/40 ml-auto mt-2" />
                </div>
              </div>

              <div className="space-y-2 pr-4">
                <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest">Holographic ID Encoding</p>
                {/* Iridescent Physical Hologram Strip */}
                <div className="relative h-16 w-36 bg-[#080a14] border border-white/10 rounded-sm overflow-hidden group/holo shadow-inner">
                  <div className="absolute inset-0 opacity-60 bg-[linear-gradient(90deg,rgba(255,0,0,0.3),rgba(255,255,0,0.3),rgba(0,255,0,0.3),rgba(0,255,255,0.3),rgba(0,0,255,0.3),rgba(255,0,255,0.3),rgba(255,0,0,0.3))] bg-[length:200%_100%] animate-[gradient_10s_linear_infinite] mix-blend-screen" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />
                  <div className="h-full w-full flex flex-col items-end justify-center font-mono relative z-10 p-3 italic">
                     <p className="text-[12px] text-white/50 tracking-[0.4em] font-black">{certificateId.split('-')[2]}</p>
                     <p className="text-[6px] text-slate-400 uppercase tracking-widest font-black opacity-60 mt-1">Holo-Identifier-0x-v</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pr-4">
              <div className="space-y-2 text-right">
                <p className="text-[8px] text-slate-700 font-black uppercase tracking-widest leading-none mb-2">Biological Continuity</p>
                <div className="flex items-center gap-2 justify-end">
                   <div className="flex gap-0.5">
                      {[...Array(20)].map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "w-1 h-3 rounded-full transition-all duration-500",
                            isUnlocked && i < 16 ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)]" : "bg-slate-900"
                          )} 
                        />
                      ))}
                   </div>
                </div>
                <div className="flex justify-end gap-4 mt-1">
                   <p className="text-[7px] text-indigo-400 font-black uppercase tracking-[0.2em]">{isUnlocked ? "92.4% Stability" : "SYNC PENDING"}</p>
                </div>
              </div>

              <div className="space-y-2 text-right">
                <p className="text-[8px] text-slate-700 font-black uppercase tracking-widest">Protocol Linked</p>
                <div className="flex items-center gap-3 justify-end">
                  <div className={cn("w-1.5 h-1.5 rounded-full ring-4 ring-offset-black", isUnlocked ? "bg-emerald-500 ring-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,1)]" : "bg-slate-800 ring-transparent shadow-none")} />
                  <span className={cn("text-[10px] font-mono font-black uppercase tracking-tighter transition-colors", isUnlocked ? "text-emerald-400" : "text-slate-600")}>
                    {isUnlocked ? "Link Secured" : "User Offline"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Bottom Branding */}
        <div className="mt-auto border-t border-white/[0.04] pt-8 flex justify-between items-end">
           <div className="flex gap-20">
              <div className="border-l-2 border-indigo-500/30 pl-4 py-1">
                <p className="text-[8px] text-slate-600 font-black uppercase tracking-[0.6em] mb-1 italic">Genesis Cycle</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-2xl font-light text-slate-400 tracking-tighter">00{certificateId.split('-')[2]}</span>
                   <span className="text-xs text-slate-600 font-bold">/ 2025</span>
                </div>
              </div>
              <div className="hidden lg:block">
                 <p className="text-[9px] text-slate-700 leading-relaxed max-w-[280px] uppercase font-bold italic tracking-tighter opacity-40">
                   The evolution of technology. The beginning of a new era. Built for tomorrow. Secured for generations to come.
                 </p>
              </div>
           </div>

           <div className="relative">
              <button 
                onClick={() => setIsUnlocked(!isUnlocked)}
                className="px-12 py-4 bg-transparent border border-white/10 text-slate-500 font-mono text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white/5 hover:text-white hover:border-white/30 transition-all rounded-sm group/btn"
              >
                 <span className="relative z-10">{isUnlocked ? "Access Archive" : "Encrypted Archive"}</span>
                 <div className="absolute inset-0 bg-indigo-500/0 group-hover/btn:bg-indigo-500/[0.03] transition-all" />
              </button>
           </div>
        </div>
      </div>

      {/* Unlocked Overlay for Metadata */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 z-[60] bg-slate-950/60 p-12 flex flex-col items-center justify-center text-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0a0c14] border border-indigo-500/30 p-8 rounded-2xl max-w-md shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]" />
              <Info className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Biometric Link Established</h3>
              <div className="space-y-4 text-left font-mono">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] text-slate-500 uppercase font-black">Owner Link</span>
                  <span className="text-xs text-indigo-400 font-bold">{ownerName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] text-slate-500 uppercase font-black">Protocol Multiplier</span>
                  <span className="text-xs text-slate-200">5.0x Apex Link</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] text-slate-500 uppercase font-black">Secure Enclave Hash</span>
                  <span className="text-[9px] text-slate-400 truncate w-32 text-right">0x7f2a...88cc11</span>
                </div>
              </div>
              <button 
                onClick={() => setIsUnlocked(false)}
                className="mt-8 w-full py-3 bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] rounded-lg"
              >
                Close Metadata
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};
