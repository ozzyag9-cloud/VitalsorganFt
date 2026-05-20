import React, { useState, useEffect } from "react";
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, ConnectButton, useActiveAccount } from "thirdweb/react";
import {
  Terminal as TerminalIcon,
  Database,
  TrendingUp,
  Code2,
  Wallet,
  Cpu,
  Tv,
  Radio,
  FileCode,
  Clock,
  Send,
  Plus,
  CircleAlert,
  HardDrive,
  UserCheck,
  Check
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Initialize Thirdweb Client
const client = createThirdwebClient({
  clientId: "678e798e692dd5a46ae1b99a09bfb56e"
});

// Themes definition
interface Theme {
  id: string;
  name: string;
  class: string;
  accent: string;
  borderClass: string;
}

const THEMES: Theme[] = [
  { id: "toxic", name: "Toxic Fallout", class: "bg-obsidian text-[#00ff41] border-[#00ff41]/40", accent: "#00ff41", borderClass: "border-[#00ff41]/30" },
  { id: "amber", name: "Fallout Terminal", class: "bg-amber-950/20 text-amber-500 border-amber-500/40", accent: "#f59e0b", borderClass: "border-amber-500/30" },
  { id: "neon", name: "Aoki Blue", class: "bg-slate-950 text-[#00f0ff] border-[-#00f0ff]/40", accent: "#00f0ff", borderClass: "border-[#00f0ff]/30" },
  { id: "cyber", name: "Cyber Purple", class: "bg-zinc-950 text-[#bd00ff] border-[#bd00ff]/40", accent: "#bd00ff", borderClass: "border-[#bd00ff]/30" }
];

const truncateAddr = (address: string) => {
  if (!address) return "0x00...000";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/* Landing Boot Screen Component */
const Landing = ({ onEnter }: { onEnter: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const messages = [
      "INITIALIZING VITAL OS [BUILD V1.0.9]...",
      "LOADING CORES: cpu0 [OK] cpu1 [OK] cpu2 [OK] cpu3 [OK]",
      "DECRYPTING CRYPTOGRAPHIC SHARES...",
      "CONNECTING TO VITAL ETHEREUM SUBNET...",
      "VERIFYING NODE INTEGRITY & STATE CHANNELS...",
      "MOUNTING MEMORY REPOSITORIES...",
      "SYSTEM DECK BOOT COMPLETE. STACK AUTHORIZED."
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < messages.length) {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${messages[current]}`]);
        current++;
      } else {
        clearInterval(interval);
        setCompleted(true);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black p-6 font-mono text-sm uppercase md:p-12 crt-scanlines">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Header */}
      <div className="z-10 flex flex-row items-center justify-between border-b border-toxic/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-toxic animate-pulse rounded-full" />
          <span className="font-bold tracking-widest text-[#00ff41] sm:text-base text-xs">VITAL_OS MAINNET CORE</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-neutral-500">
          <span>PORT: 3000 (SECURE)</span>
          <span>SYSTEM STATE: ACTIVE</span>
        </div>
      </div>

      {/* Main Console view */}
      <div className="z-10 flex-1 flex flex-col justify-center items-center my-8 max-w-2xl mx-auto w-full">
        <div className="w-full text-left bg-neutral-950/80 border border-toxic/20 p-5 rounded-sm h-64 overflow-y-auto font-mono mb-8 select-none">
          {logs.map((log, index) => (
            <div key={index} className="text-[#00ff41]/80 text-[11px] sm:text-xs leading-5">
              <span className="text-neutral-600 mr-2">&gt;&gt;</span>
              {log}
            </div>
          ))}
          {!completed && (
            <div className="flex items-center gap-1.5 text-toxic mt-1 animate-pulse">
              <span>●</span> <span className="text-[10px]">PARSING MODULES...</span>
            </div>
          )}
        </div>

        {/* Enter Operating Deck Prompt */}
        <div className={`transition-all duration-700 text-center ${completed ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
          <h1 className="text-3xl md:text-5xl font-black tracking-widest text-white mb-3 glow-toxic">
            VITAL<span className="text-toxic">OS</span>
          </h1>
          <p className="text-xs text-neutral-400 max-w-md mx-auto mb-6 tracking-wider normal-case">
            A premium full-terminal Web3 deck simulator. Control sandboxed ledgers, compile contracts, monitor charts, and run nodes.
          </p>

          <button
            onClick={onEnter}
            disabled={!completed}
            className={`px-8 py-3 bg-[#00ff41] hover:bg-white text-black font-extrabold tracking-widest rounded transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(0,255,65,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] ${
              !completed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            BOOT OPERATING DECK
          </button>
        </div>
      </div>

      {/* Footer statistics */}
      <div className="z-10 flex flex-col sm:flex-row items-center justify-between border-t border-toxic/20 pt-4 text-[10px] text-neutral-500 gap-2 font-mono">
        <div>CODENAME: NEON_PHANTOM // DIST: SECURE ENDPOINT</div>
        <div className="flex gap-4">
          <span>© 2026 VITAL INC</span>
          <span>BUILD: DEV-34168</span>
        </div>
      </div>
    </div>
  );
};

/* OS Deck Content View */
export function AppContent() {
  const account = useActiveAccount();
  const [view, setView] = useState("landing");
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);
  const [activeApp, setActiveApp] = useState<string | null>("Terminal");
  const [logs, setLogs] = useState<string[]>([
    "Welcome to VitalOS v1.0.0. Terminal initialization done.",
    "Type 'help' to check available deck directives."
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  
  // Stats
  const [cpuUsage, setCpuUsage] = useState<number[]>([21, 38, 15, 29]);
  const [networkStats, setNetworkStats] = useState({ rx: 110.2, tx: 72.5 });
  const [activeBlock, setActiveBlock] = useState(1482093);
  
  // block ledger state
  const [blocks, setBlocks] = useState([
    { height: 1482093, miner: "0x3Fa...4f3", txs: 14, reward: "2.05 ETH", hash: "0xb7c...e21" },
    { height: 1482092, miner: "0x88F...aa2", txs: 29, reward: "2.12 ETH", hash: "0x4fe...93d" },
    { height: 1482091, miner: "0xAbc...a55", txs: 8, reward: "2.01 ETH", hash: "0x78a...bba" }
  ]);
  const [customTxRecipient, setCustomTxRecipient] = useState("");
  const [customTxAmount, setCustomTxAmount] = useState("");
  const [simulatedTxHistory, setSimulatedTxHistory] = useState([
    { id: "tx_1a2b", from: "0xDemoUser", to: "0x88F...aa2", amount: "1.5 ETH", status: "Validated" }
  ]);

  // Crypto Exchange State
  const [currentPair, setCurrentPair] = useState("ETH/USDT");
  const [tradeAmount, setTradeAmount] = useState("");
  const [userPortfolio, setUserPortfolio] = useState({ eth: 4.85, btc: 0.12, vital: 1540.0, usdt: 950.0 });
  const [orderLogs, setOrderLogs] = useState<{ time: string; action: string; amount: string; price: string }[]>([]);

  // Compiler state
  const [codeTemplate, setCodeTemplate] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VitalToken {
    string public name = "VitalToken";
    string public symbol = "VTL";
    uint256 public totalSupply = 1000000 * 10 ** 18;
    mapping(address => uint256) public balances;

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient fund");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        return true;
    }
}`);
  const [compiling, setCompiling] = useState(false);
  const [compilationSuccess, setCompilationSuccess] = useState<boolean | null>(null);
  const [deployedContracts, setDeployedContracts] = useState<{ id: string; name: string; addr: string; size: string }[]>([]);

  // Telemetry fluctuation simulator
  useEffect(() => {
    if (view === "landing") return;

    const interval = setInterval(() => {
      setCpuUsage([
        Math.floor(Math.random() * 40) + 15,
        Math.floor(Math.random() * 50) + 20,
        Math.floor(Math.random() * 35) + 10,
        Math.floor(Math.random() * 45) + 18
      ]);

      setNetworkStats({
        rx: parseFloat((Math.random() * 140 + 60).toFixed(1)),
        tx: parseFloat((Math.random() * 90 + 20).toFixed(1))
      });

      if (Math.random() < 0.18) {
        setActiveBlock((prev) => {
          const nextVal = prev + 1;
          const randomMiners = ["0x3Fa...4f3", "0x88F...aa2", "0xAbc...a55", "0x911...41c"];
          const miner = randomMiners[Math.floor(Math.random() * randomMiners.length)];
          const txsCount = Math.floor(Math.random() * 38) + 4;
          const gasReward = (2.0 + Math.random() * 0.18).toFixed(2);
          const hashString = "0x" + Math.random().toString(16).slice(2, 8) + "..." + Math.random().toString(16).slice(2, 5);
          
          setBlocks(b => [
            { height: nextVal, miner, txs: txsCount, reward: `${gasReward} ETH`, hash: hashString },
            ...b.slice(0, 4)
          ]);

          setLogs((l) => [
            ...l,
            `[SYSTEM LOGGER] Block #${nextVal} broadcast integrity verified on simulated Mainnet.`
          ]);

          return nextVal;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [view]);

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    let res = "";

    switch (cmd) {
      case "help":
        res = "DIRECTIVES: 'help' - List available options | 'sysinfo' - Device hardware telemetry | 'clear' - Wipe logs | 'hack' - Test penetrative handshake | 'balance' - Inspect deck wallet registers | 'apps' - List deck modules";
        break;
      case "clear":
        setLogs([]);
        setTerminalInput("");
        return;
      case "sysinfo":
        res = `TEL-SYS INFO \n>> OS Architecture: VitalOS v1.0 \n>> Network RX status: ${networkStats.rx} KB/s \n>> Network TX status: ${networkStats.tx} KB/s \n>> Connected User context: ${account ? account.address : "OFFLINE DECK (GUEST)"}`;
        break;
      case "hack":
        res = "BROADCASTING PIN CODE INTRUSION... OK. PACKET VALID ON CHAIN ENDPOINT.";
        break;
      case "balance":
        res = `BALANCES: \n>> USDT: $${userPortfolio.usdt.toFixed(2)} \n>> ETH: ${userPortfolio.eth} ETH \n>> BTC: ${userPortfolio.btc} BTC \n>> VITAL: ${userPortfolio.vital} VTL`;
        break;
      case "apps":
        res = "DECK APPS: 1. Block_Explorer (Ledger) 2. Exchange_Desk (Swap Markets) 3. Contract_IDE (Solidity Editor)";
        break;
      default:
        res = `COMM-ERROR: Command '${cmd}' unrecognized. Enter 'help' for guidance.`;
    }

    setLogs((prev) => [...prev, `vitalos@user:~$ ${terminalInput}`, res]);
    setTerminalInput("");
  };

  const compileContract = () => {
    setCompiling(true);
    setLogs((l) => [...l, "[COMPILER] Compilation cycle started for target Solidity template."]);
    setTimeout(() => {
      setCompiling(false);
      setCompilationSuccess(true);
      setLogs((l) => [...l, "[COMPILER] Solidity build success. ABI produced for contract 'VitalToken'."]);
    }, 1200);
  };

  const deployContract = () => {
    if (!compilationSuccess) return;
    const randomAddr = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase() + "Eab8" + Math.random().toString(16).slice(2, 6);
    const newContract = {
      id: `cnt-${Date.now().toString().slice(-4)}`,
      name: "VitalToken (Sol)",
      addr: randomAddr,
      size: "0.42 KB"
    };
    setDeployedContracts((prev) => [...prev, newContract]);
    setLogs((l) => [...l, `[REGISTRY] Placed contract onto simulated subnet sandbox address: ${randomAddr}`]);
  };

  const createSimulatedTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTxRecipient || !customTxAmount) return;

    const amountFloat = parseFloat(customTxAmount);
    if (isNaN(amountFloat) || amountFloat <= 0) return;

    if (amountFloat > userPortfolio.eth) {
      setLogs((l) => [...l, "[SYSTEM TRANSACTIONS-ERROR] Insufficient mock ETH balance to broadcast secure payload!"]);
      return;
    }

    setUserPortfolio((prev) => ({
      ...prev,
      eth: parseFloat((prev.eth - amountFloat).toFixed(4))
    }));

    const txId = "tx_" + Math.random().toString(36).slice(2, 6);
    const newTx = {
      id: txId,
      from: account ? truncateAddr(account.address) : "0xDemoUser",
      to: truncateAddr(customTxRecipient),
      amount: `${amountFloat} ETH`,
      status: "Validated"
    };

    setSimulatedTxHistory((prev) => [newTx, ...prev]);
    setLogs((l) => [...l, `[SYSTEM TRANSACTIONS] Broadcast TX: Sent ${amountFloat} ETH mock to ${customTxRecipient}`]);
    setCustomTxRecipient("");
    setCustomTxAmount("");
  };

  const handleMarketOrder = (type: "BUY" | "SELL") => {
    const floatAmount = parseFloat(tradeAmount);
    if (isNaN(floatAmount) || floatAmount <= 0) return;

    const ethPrice = 3000;
    const btcPrice = 65000;
    const vitalPrice = 0.5;

    let targetPrice = ethPrice;
    let targetAsset = "eth";
    if (currentPair === "BTC/USDT") {
      targetPrice = btcPrice;
      targetAsset = "btc";
    } else if (currentPair === "VITAL/USDT") {
      targetPrice = vitalPrice;
      targetAsset = "vital";
    }

    const costUSDT = floatAmount * targetPrice;

    if (type === "BUY") {
      if (userPortfolio.usdt < costUSDT) {
        setLogs((l) => [...l, `[MARKET SWAP-ERROR] Insufficient simulated USDT balance ($${userPortfolio.usdt.toFixed(2)} vs cost $${costUSDT.toFixed(2)})!`]);
        return;
      }
      setUserPortfolio((prev) => ({
        ...prev,
        usdt: parseFloat((prev.usdt - costUSDT).toFixed(2)),
        [targetAsset]: parseFloat(((prev[targetAsset as keyof typeof userPortfolio] || 0) + floatAmount).toFixed(4))
      }));
      setOrderLogs((prev) => [
        { time: new Date().toLocaleTimeString(), action: "BOUGHT", amount: `${floatAmount} ${currentPair.split("/")[0]}`, price: `$${targetPrice}` },
        ...prev
      ]);
      setLogs((l) => [...l, `[MARKET SWAP] Executed BUY order for ${floatAmount} ${currentPair.split("/")[0]} @ $${targetPrice}`]);
    } else {
      const currentAssetVal = userPortfolio[targetAsset as keyof typeof userPortfolio] || 0;
      if (currentAssetVal < floatAmount) {
        setLogs((l) => [...l, `[MARKET SWAP-ERROR] Insufficient asset balance to make market sell (${currentAssetVal} vs required ${floatAmount})!`]);
        return;
      }
      setUserPortfolio((prev) => ({
        ...prev,
        usdt: parseFloat((prev.usdt + costUSDT).toFixed(2)),
        [targetAsset]: parseFloat(((prev[targetAsset as keyof typeof userPortfolio] || 0) - floatAmount).toFixed(4))
      }));
      setOrderLogs((prev) => [
        { time: new Date().toLocaleTimeString(), action: "SOLD", amount: `${floatAmount} ${currentPair.split("/")[0]}`, price: `$${targetPrice}` },
        ...prev
      ]);
      setLogs((l) => [...l, `[MARKET SWAP] Executed SELL order for ${floatAmount} ${currentPair.split("/")[0]} @ $${targetPrice}`]);
    }
    setTradeAmount("");
  };

  const generateChartData = (pair: string) => {
    let basePrice = 3000;
    if (pair === "BTC/USDT") basePrice = 65000;
    if (pair === "VITAL/USDT") basePrice = 0.5;

    return Array.from({ length: 12 }).map((_, i) => {
      const day = `T${i + 1}`;
      const change = (Math.random() - 0.48) * (basePrice * 0.05);
      const val = parseFloat((basePrice + change).toFixed(2));
      return { day, price: val };
    });
  };

  if (view === "landing") return <Landing onEnter={() => setView("dashboard")} />;

  return (
    <div id="app-container" className={`fixed inset-0 z-0 ${activeTheme.class} font-mono flex flex-col h-screen overflow-hidden crt-scanlines transition-all duration-300 text-xs`}>
      
      {/* HUD Bar */}
      <header id="hud-header" className="flex flex-row items-center justify-between border-b px-4 py-2 bg-black/75 z-20 shrink-0 text-slate-400 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#00ff41] rounded-full animate-pulse" />
            <span className="font-extrabold text-white text-[13px] tracking-wider">VITAL<span className="text-[#00ff41]">OS</span></span>
          </div>
          <span className="text-neutral-800 hidden sm:inline">|</span>
          <div className="hidden md:flex items-center gap-2 text-[10px]">
            <Clock className="w-3.5 h-3.5 text-[#00ff41] animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-white">{new Date().toLocaleTimeString()} UTC</span>
          </div>
        </div>

        {/* Console stats widget */}
        <div id="stats-widget" className="hidden lg:flex flex-row items-center gap-6">
          <div className="flex items-center gap-2 text-[10px]">
            <Cpu className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-500 font-bold">CORES:</span>
            <div className="flex items-center gap-1">
              {cpuUsage.map((val, idx) => (
                <div key={idx} className="w-2 h-3.5 bg-neutral-900 border border-neutral-800 rounded-sm relative overflow-hidden">
                  <div 
                    className={`absolute bottom-0 left-0 w-full transition-all duration-300 ${
                      val > 45 ? 'bg-red-500' : 'bg-[#00ff41]'
                    }`}
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px]">
            <Radio className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span className="text-neutral-500 font-bold">NET:</span>
            <span className="text-toxic">RX {networkStats.rx}K/s</span>
            <span className="text-neutral-700">/</span>
            <span className="text-neon-blue">TX {networkStats.tx}K/s</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px]">
            <Database className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-neutral-500 font-bold">BLOCKHEIGHT:</span>
            <span className="text-white tracking-widest">#{activeBlock}</span>
          </div>
        </div>

        {/* Settings, configuration layout */}
        <div id="hud-right" className="flex items-center gap-3">
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded p-0.5 gap-0.5">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer ${
                  activeTheme.id === theme.id ? 'bg-neutral-800 text-white' : 'text-neutral-600 hover:text-neutral-300'
                }`}
              >
                {theme.name.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
            <ConnectButton 
              client={client}
              connectButton={{
                label: "CONNECT WALLET",
                className: "text-[10px] font-bold !bg-[#00ff41] !text-black py-1 px-3.5 hover:!bg-white rounded transition border-none cursor-pointer",
              }}
              detailsButton={{
                className: "text-[10px] font-mono !bg-neutral-900 !text-white py-1 px-2.5 rounded hover:!bg-neutral-800 border-none cursor-pointer",
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Console Layout */}
      <main id="main-panel" className="flex-grow flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Module navigation panel */}
        <aside id="sidebar-panel" className="w-full md:w-60 border-b md:border-b-0 md:border-r border-neutral-800/60 flex flex-col bg-black/35 shrink-0 select-none">
          <div className="p-3 border-b border-neutral-800/80">
            <div className="flex items-center gap-2 mb-1">
              <HardDrive className="w-4 h-4 text-neutral-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-neutral-500">DECK MODULE SYSTEMS</span>
            </div>
            <p className="text-[9px] text-neutral-500 normal-case">Execute applications within sandbox memory.</p>
          </div>

          <div className="p-2 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto shrink-0 md:flex-1 gap-1">
            <button
              id="terminal-app-button"
              onClick={() => setActiveApp("Terminal")}
              className={`flex-1 md:flex-none flex items-center gap-3 px-3.5 py-2.5 rounded text-left transition cursor-pointer ${
                activeApp === "Terminal" ? "bg-neutral-900 border border-[#00ff41]/40 text-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.1)]" : "text-neutral-400 hover:bg-neutral-900/60"
              }`}
            >
              <TerminalIcon className={`w-4 h-4 ${activeApp === "Terminal" ? 'text-toxic' : 'text-neutral-500'}`} />
              <div className="flex flex-col leading-3">
                <span className="text-[10px] font-black uppercase">Sys_Terminal</span>
                <span className="text-[8px] text-neutral-600 hidden md:inline">CLI Directives</span>
              </div>
            </button>

            <button
              id="explorer-app-button"
              onClick={() => setActiveApp("Explorer")}
              className={`flex-1 md:flex-none flex items-center gap-3 px-3.5 py-2.5 rounded text-left transition cursor-pointer ${
                activeApp === "Explorer" ? "bg-neutral-900 border border-[#00ff41]/40 text-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.1)]" : "text-neutral-400 hover:bg-neutral-900/60"
              }`}
            >
              <Database className={`w-4 h-4 ${activeApp === "Explorer" ? 'text-toxic' : 'text-neutral-500'}`} />
              <div className="flex flex-col leading-3">
                <span className="text-[10px] font-black uppercase">Block_Explorer</span>
                <span className="text-[8px] text-neutral-600 hidden md:inline">Ledger Log</span>
              </div>
            </button>

            <button
              id="exchange-app-button"
              onClick={() => setActiveApp("Exchange")}
              className={`flex-1 md:flex-none flex items-center gap-3 px-3.5 py-2.5 rounded text-left transition cursor-pointer ${
                activeApp === "Exchange" ? "bg-neutral-900 border border-[#00ff41]/40 text-toxic shadow-[0_0_8px_rgba(0,255,65,0.1)]" : "text-neutral-400 hover:bg-neutral-900/60"
              }`}
            >
              <TrendingUp className={`w-4 h-4 ${activeApp === "Exchange" ? 'text-neon-blue' : 'text-neutral-500'}`} />
              <div className="flex flex-col leading-3">
                <span className="text-[10px] font-black uppercase">Exchange_Desk</span>
                <span className="text-[8px] text-neutral-600 hidden md:inline">Markets Swap</span>
              </div>
            </button>

            <button
              id="compiler-app-button"
              onClick={() => setActiveApp("Compiler")}
              className={`flex-1 md:flex-none flex items-center gap-3 px-3.5 py-2.5 rounded text-left transition cursor-pointer ${
                activeApp === "Compiler" ? "bg-neutral-900 border border-[#00ff41]/40 text-toxic shadow-[0_0_8px_rgba(0,255,65,0.1)]" : "text-neutral-400 hover:bg-neutral-900/60"
              }`}
            >
              <Code2 className={`w-4 h-4 ${activeApp === "Compiler" ? 'text-neon-purple' : 'text-neutral-500'}`} />
              <div className="flex flex-col leading-3">
                <span className="text-[10px] font-black uppercase">Contract_IDE</span>
                <span className="text-[8px] text-neutral-600 hidden md:inline">Solidity Shell</span>
              </div>
            </button>
          </div>

          {/* User profile wallet indicator */}
          <div id="sidebar-user-wallet" className="p-3 border-t border-neutral-800 bg-neutral-950/50">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-3.5 h-3.5 text-[#00ff41]" />
              <span className="font-bold text-neutral-500 text-[9px] uppercase tracking-wider">SEC_CHANNEL_REG</span>
            </div>
            {account ? (
              <div className="space-y-1 bg-black/40 border border-[#00ff41]/25 p-2 rounded">
                <div className="flex items-center gap-1.5 text-toxic font-black text-[9px]">
                  <UserCheck className="w-3 h-3 text-toxic" />
                  <span>ONLINE_CHANNEL</span>
                </div>
                <div className="text-[9px] text-slate-300 font-mono tracking-tight select-all">
                  ADDR: {truncateAddr(account.address)}
                </div>
              </div>
            ) : (
              <div className="border border-neutral-800 p-2 rounded text-center text-neutral-600 font-semibold text-[9px]">
                OFFLINE GUEST CONTROLLER
              </div>
            )}
          </div>
        </aside>

        {/* Dynamic active screen wrapper */}
        <section id="window-shell" className="flex-grow flex flex-col overflow-hidden bg-black/25">
          <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <Tv className="w-4 h-4 text-neutral-500 animate-pulse" />
              <span className="text-[10px] uppercase font-bold text-slate-300">
                ACTIVE_WINDOW: <span className="text-white font-extrabold">{activeApp}</span>
              </span>
            </div>
            <span className="text-[9px] text-neutral-500 normal-case hidden md:inline">
              Secure Sandbox Interface Terminal Ready.
            </span>
          </div>

          <div id="viewport-workspace" className="flex-grow overflow-y-auto p-4 md:p-6">
            
            {/* TERMINAL DIRECTIVES SCREEN */}
            {activeApp === "Terminal" && (
              <div id="terminal-screen" className="h-full flex flex-col bg-neutral-950/95 border border-neutral-800 rounded p-4 font-mono max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3 text-[9px] text-neutral-500">
                  <span className="flex items-center gap-2 font-bold tracking-widest">
                    <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-ping" />
                    VITALOS SECURE MAIN SYSTEM TERMINAL
                  </span>
                  <span>NODE: GUEST_SHELL</span>
                </div>

                {/* Outputs list */}
                <div className="flex-grow overflow-y-auto space-y-2.5 min-h-[220px] mb-4 pr-1 select-text">
                  {logs.map((log, index) => (
                    <div key={index} className="whitespace-pre-wrap leading-relaxed text-[#00ff41]/90">
                      {log}
                    </div>
                  ))}
                </div>

                {/* Input command handler form */}
                <form onSubmit={handleTerminalCommand} className="flex gap-2.5 border-t border-neutral-800 pt-3">
                  <span className="text-toxic font-black my-auto select-none">vitalos@user:~$</span>
                  <input
                    id="cli-input-field"
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Enter directive command (e.g. 'help', 'sysinfo', 'balance', 'apps')..."
                    className="flex-grow bg-transparent border-none outline-none text-[#00ff41] placeholder-toxic/25 font-mono text-xs focus:ring-0 shadow-none border-0"
                    autoFocus
                  />
                  <button type="submit" className="text-[#00ff41]/55 hover:text-toxic cursor-pointer p-1">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* BLOCK LEDGER EXPLORER SCREEN */}
            {activeApp === "Explorer" && (
              <div id="explorer-screen" className="space-y-6 max-w-4xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  {/* Ledger logs grid list */}
                  <div className="md:col-span-2 bg-neutral-950 border border-neutral-800 rounded p-4">
                    <h3 className="text-[10px] font-black uppercase text-slate-300 tracking-wider mb-3 flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-toxic" />
                      Block Indexer Log Sandbox
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[10px] whitespace-nowrap">
                        <thead>
                          <tr className="border-b border-neutral-800 pb-1.5 text-neutral-500 uppercase font-bold text-[9px]">
                            <th className="py-2">Height</th>
                            <th className="py-2">Miner Addr</th>
                            <th className="py-2 text-center">Txs</th>
                            <th className="py-2 text-right">Reward</th>
                            <th className="py-2 text-right">Hash</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900/50">
                          {blocks.map((b) => (
                            <tr key={b.height} className="text-[#00ff41]/90 hover:bg-neutral-900/30 transition">
                              <td className="py-2.5 font-bold text-white">#{b.height}</td>
                              <td className="py-2.5 text-slate-300 font-mono select-all">{b.miner}</td>
                              <td className="py-2.5 text-center text-white">{b.txs}</td>
                              <td className="py-2.5 text-right font-semibold">{b.reward}</td>
                              <td className="py-2.5 text-right text-neutral-600 select-all font-mono">{b.hash}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Sandbox transactional broadcast sender */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded p-4">
                    <h3 className="text-[10px] font-black uppercase text-slate-300 tracking-wider mb-2 flex items-center gap-2">
                      <Plus className="w-3.5 h-3.5 text-[#00ff41]" />
                      Broadcast Payload Form
                    </h3>
                    <p className="text-[9px] text-neutral-500 normal-case mb-4">
                      Deploy test block ledger transactions into sandbox stack.
                    </p>

                    <form onSubmit={createSimulatedTx} className="space-y-3.5">
                      <div>
                        <label className="block text-[8px] text-neutral-500 uppercase mb-1">Target Address</label>
                        <input
                          id="recipient-addr-input"
                          type="text"
                          required
                          value={customTxRecipient}
                          onChange={(e) => setCustomTxRecipient(e.target.value)}
                          placeholder="e.g. 0x88F93...4F3"
                          className="w-full bg-black/55 border border-neutral-800 rounded p-2 text-[#00ff41] placeholder-neutral-700 focus:outline-none focus:border-toxic"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] text-neutral-500 uppercase mb-1">Amount to send (ETH)</label>
                        <input
                          id="amount-eth-input"
                          type="number"
                          required
                          step="0.01"
                          value={customTxAmount}
                          onChange={(e) => setCustomTxAmount(e.target.value)}
                          placeholder="e.g. 1.28"
                          className="w-full bg-black/55 border border-neutral-800 rounded p-2 text-[#00ff41] placeholder-neutral-700 focus:outline-none focus:border-toxic"
                        />
                      </div>

                      <button
                        id="form-broadcast-submit"
                        type="submit"
                        className="w-full bg-toxic hover:bg-white text-black font-extrabold uppercase py-2 rounded text-[10px] cursor-pointer"
                      >
                        SIGN & STREAM TRANSACTION
                      </button>
                    </form>
                  </div>
                </div>

                {/* Subnet transaction ledger */}
                <div className="bg-neutral-950 border border-neutral-800 rounded p-4">
                  <h3 className="text-[10px] font-black uppercase text-slate-300 tracking-wider mb-2.5">
                    Broadcasting Ledgers Feed
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {simulatedTxHistory.map((sh, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px] bg-black/40 border border-neutral-900 rounded p-2 text-[#00ff41]/80 select-text">
                        <span>
                          <span className="text-white font-bold mr-2">{sh.id}</span>
                          form: <span className="text-slate-300">{sh.from}</span> → to: <span className="text-slate-300">{sh.to}</span>
                        </span>
                        <span>
                          <span className="text-white font-extrabold mr-2">{sh.amount}</span>
                          <span className="text-[8px] bg-neutral-900 px-1 border border-toxic/20 rounded uppercase font-semibold text-toxic">
                            {sh.status}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* EXCHANGE & MARKET GRAPH SWAP */}
            {activeApp === "Exchange" && (
              <div id="exchange-screen" className="space-y-6 max-w-4xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  {/* Dynamic tracking chart */}
                  <div className="md:col-span-2 bg-neutral-950 border border-neutral-800 rounded p-4 flex flex-col h-[280px]">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-neon-blue" />
                        <h4 className="text-[10px] font-black uppercase text-white tracking-widest">
                          Market Chart: <span className="text-toxic font-bold">{currentPair}</span>
                        </h4>
                      </div>

                      <div className="flex bg-neutral-900 border border-neutral-800 rounded p-0.5 gap-0.5">
                        {["ETH/USDT", "BTC/USDT", "VITAL/USDT"].map((pair) => (
                          <button
                            key={pair}
                            onClick={() => setCurrentPair(pair)}
                            className={`px-2 py-0.5 rounded text-[8px] font-bold cursor-pointer ${
                              currentPair === pair ? 'bg-[#00ff41] text-black' : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                          >
                            {pair.split("/")[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 w-full h-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={generateChartData(currentPair)}>
                          <defs>
                            <linearGradient id="glowExchange" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={activeTheme.accent} stopOpacity={0.2}/>
                              <stop offset="95%" stopColor={activeTheme.accent} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="day" stroke="#374151" fontSize={8} />
                          <YAxis stroke="#374151" fontSize={8} domain={["auto", "auto"]} />
                          <Tooltip contentStyle={{ backgroundColor: "#08090c", borderColor: "#374151", color: "#f1f5f9" }} />
                          <Area type="monotone" dataKey="price" stroke={activeTheme.accent} strokeWidth={1.5} fillOpacity={1} fill="url(#glowExchange)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* swap desk swap payload */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[10px] font-black uppercase text-slate-300 tracking-wider mb-2">
                        Swaps Control Center
                      </h3>
                      <p className="text-[9px] text-neutral-500 normal-case mb-4">
                        Settle simulated contracts instantly. Slipped balances reflected immediately in internal registers.
                      </p>

                      <div className="space-y-2 mb-4 text-[10px]">
                        <div className="flex justify-between border-b border-neutral-900 pb-1.5 leading-tight">
                          <span className="text-neutral-500">USDT Safe balance:</span>
                          <span className="text-white font-extrabold">${userPortfolio.usdt.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-900 pb-1.5 leading-tight">
                          <span className="text-neutral-500">{currentPair.split("/")[0]} register:</span>
                          <span className="text-toxic font-extrabold">
                            {currentPair === "ETH/USDT" ? userPortfolio.eth : currentPair === "BTC/USDT" ? userPortfolio.btc : userPortfolio.vital}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[8px] text-neutral-500 uppercase">Input Trade Vol</label>
                        <input
                          id="trade-vol-input"
                          type="number"
                          placeholder="e.g. 0.25"
                          value={tradeAmount}
                          onChange={(e) => setTradeAmount(e.target.value)}
                          className="w-full bg-black/55 border border-neutral-800 rounded p-2 text-[#00ff41] placeholder-neutral-700 focus:outline-none focus:border-toxic"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button
                        id="market-buy-button"
                        onClick={() => handleMarketOrder("BUY")}
                        className="bg-[#00ff41] hover:bg-white text-black font-extrabold uppercase py-2 rounded text-[10px] cursor-pointer"
                      >
                        MARKET_BUY
                      </button>
                      <button
                        id="market-sell-button"
                        onClick={() => handleMarketOrder("SELL")}
                        className="bg-red-950/20 border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-black font-extrabold uppercase py-2 rounded text-[10px] cursor-pointer transition duration-200"
                      >
                        MARKET_SELL
                      </button>
                    </div>
                  </div>
                </div>

                {/* Orders settlement list */}
                <div className="bg-neutral-950 border border-neutral-800 rounded p-4 font-mono">
                  <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-wider mb-2.5">
                    Settled Swap Ticket Log
                  </h4>
                  {orderLogs.length === 0 ? (
                    <div className="text-[9px] text-neutral-600 font-bold text-center py-4">
                      TICKET REGISTERS EMPTY
                    </div>
                  ) : (
                    <div className="space-y-1.5 bg-black/20 p-2 rounded max-h-36 overflow-y-auto split-y divide-neutral-900">
                      {orderLogs.map((ol, idx) => (
                        <div key={idx} className="flex justify-between py-1 text-[10px] text-neutral-400">
                          <div>
                            <span className="text-neutral-500 mr-2">[{ol.time}]</span>
                            <span className={ol.action === "BOUGHT" ? "text-[#00ff41] font-extrabold" : "text-red-400 font-extrabold"}>
                              {ol.action}
                            </span>
                          </div>
                          <div>Swapped: <span className="text-slate-300 font-bold">{ol.amount}</span> @ <span className="text-neutral-500">{ol.price}</span></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CONTRACT COMPILER WORKSPACE */}
            {activeApp === "Compiler" && (
              <div id="compiler-screen" className="grid grid-cols-1 md:grid-cols-5 gap-5 max-w-4xl mx-auto w-full">
                
                {/* Editor textarea input */}
                <div className="md:col-span-3 bg-neutral-950 border border-neutral-800 rounded p-4 flex flex-col h-[340px]">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
                    <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-neon-purple animate-pulse" />
                      solidity_comp_workspace // VitalToken.sol
                    </span>
                    <span className="text-[9px] text-neutral-600 font-extrabold uppercase">Sol v0.8.20</span>
                  </div>
                  <textarea
                    id="solidity-editor"
                    value={codeTemplate}
                    onChange={(e) => setCodeTemplate(e.target.value)}
                    className="flex-grow bg-black/45 text-[#00ff41] p-3 text-[11px] font-mono outline-none resize-none rounded border border-neutral-900 focus:border-neutral-800 leading-relaxed select-text"
                  />
                  <div className="flex gap-2.5 mt-4">
                    <button
                      id="compile-contract-submit"
                      onClick={compileContract}
                      disabled={compiling}
                      className="flex-1 bg-purple-950/20 border border-purple-500/40 text-purple-400 hover:bg-purple-500 hover:text-black font-extrabold uppercase py-2 text-[10px] rounded cursor-pointer transition animate-none"
                    >
                      {compiling ? "COMPILING FILE..." : "COMPILE TARGET"}
                    </button>
                    <button
                      id="deploy-contract-submit"
                      onClick={deployContract}
                      disabled={!compilationSuccess}
                      className="flex-1 bg-toxic text-black disabled:bg-neutral-950 disabled:text-neutral-700 font-extrabold uppercase py-2 text-[10px] rounded cursor-pointer transition select-none"
                    >
                      DEPLOY TO SUBNET
                    </button>
                  </div>
                </div>

                {/* Registry feedback */}
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-neutral-950 border border-neutral-800 rounded p-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-wider mb-2">
                      INTEGRITY VERIFICATION ENGINE
                    </h4>
                    {compilationSuccess ? (
                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex items-center gap-1.5 text-[#00ff41] font-extrabold">
                          <Check className="w-4 h-4 stroke-[3]" />
                          BUILD STATUS: COMPILED OK
                        </div>
                        <p className="text-neutral-500 text-[9px] normal-case leading-snug">
                          Contract bytecode matched specifications. Local subnet compiler signature validated successfully.
                        </p>
                      </div>
                    ) : (
                      <div className="text-[9px] text-neutral-600 font-bold flex items-center gap-2">
                        <CircleAlert className="w-3.5 h-3.5 text-neutral-700" />
                        AWAITING COMPILE BROADCAST EVENT
                      </div>
                    )}
                  </div>

                  {/* Registered contracts list */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded p-4 h-[190px] flex flex-col justify-between">
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-wider mb-2">
                        SUBNET PLACED REGISTRY
                      </h4>
                      {deployedContracts.length === 0 ? (
                        <p className="text-[9px] text-neutral-600 font-bold text-center py-4">
                          No active sandbox contracts.
                        </p>
                      ) : (
                        <div className="space-y-1.5 overflow-y-auto max-h-[100px] bg-black/20 p-1.5 rounded">
                          {deployedContracts.map((cnt) => (
                            <div key={cnt.id} className="text-[10px] border-b border-neutral-900 pb-1 flex justify-between text-neutral-400 font-mono">
                              <span className="text-[#00ff41] font-bold select-all">{cnt.name}</span>
                              <span className="text-neutral-500 select-all">{truncateAddr(cnt.addr)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-[8px] text-neutral-600 border-t border-neutral-900/50 pt-2 font-mono uppercase">
                      STATE: SECURED VIA SANBOX MAINNET SHARES
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </section>

      </main>

      {/* Footer information bar */}
      <footer id="footer-status-bar" className="bg-black border-t border-neutral-800 py-2 px-4 flex flex-row items-center justify-between text-slate-500 z-10 text-[9px] uppercase font-mono">
        <div>DECK STATUS: ONLINE // SYSTEM DEPLOY CHANNEL SECURE</div>
        <div className="flex gap-4">
          <span>PORT: 3000</span>
          <span>© 2026 VITAL OS CO.</span>
        </div>
      </footer>
    </div>
  );
}

// Global wrap over content inside thirdweb global provider
export function App() {
  return (
    <ThirdwebProvider>
      <AppContent />
    </ThirdwebProvider>
  );
}
