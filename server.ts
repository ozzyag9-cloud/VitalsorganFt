import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import crypto from "crypto";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 8080);

  app.use(express.json());

  app.use((req, res, next) => {
    const allowedOrigin = process.env.CORS_ORIGIN || process.env.APP_URL || '*';
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }

    next();
  });

  const hashPayload = (payload: unknown) =>
    `0x${crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex")}`;

  const nowIso = () => new Date().toISOString();

  const vitalOsAgentProviders = [
    {
      id: "claude",
      name: "Claude",
      owner: "Anthropic",
      envKey: "ANTHROPIC_API_KEY",
      role: "Long-context product reasoning, safety review, and requirements clarification."
    },
    {
      id: "openai",
      name: "OpenAI",
      owner: "OpenAI",
      envKey: "OPENAI_API_KEY",
      role: "App generation, tool orchestration, speech/text intent handling, and local workflow planning."
    },
    {
      id: "gemini",
      name: "Gemini",
      owner: "Google",
      envKey: "GEMINI_API_KEY",
      role: "Multimodal understanding, sensor-context analysis, image/audio/video workflow support."
    },
    {
      id: "deepcode",
      name: "DeepCode",
      owner: "Snyk/DeepCode",
      envKey: "DEEPCODE_API_KEY",
      role: "Generated-app code review, vulnerability scanning, and policy linting before install."
    },
    {
      id: "grok",
      name: "Grok",
      owner: "xAI",
      envKey: "XAI_API_KEY",
      role: "Realtime assistant persona, exploratory reasoning, and external-world context adapters."
    }
  ];


  const vitalOsHardwareCapabilities = [
    { id: "camera", label: "Camera", domain: "imaging", webAccess: "prompted", nativeAccess: "HAL camera provider", status: "web-ready" },
    { id: "microphone", label: "Microphone", domain: "audio", webAccess: "prompted", nativeAccess: "AudioFlinger / HAL", status: "web-ready" },
    { id: "gnss", label: "GPS / GNSS", domain: "location", webAccess: "prompted", nativeAccess: "GNSS HAL", status: "web-ready" },
    { id: "accelerometer", label: "Accelerometer", domain: "motion", webAccess: "browser sensor API", nativeAccess: "Sensor HAL", status: "prototype" },
    { id: "bluetooth", label: "Bluetooth", domain: "radio", webAccess: "web bluetooth where supported", nativeAccess: "Bluetooth stack", status: "prototype" },
    { id: "nfc", label: "NFC", domain: "secure element", webAccess: "limited", nativeAccess: "NFC service + secure element", status: "native-required" },
    { id: "biometrics", label: "Biometrics", domain: "identity", webAccess: "WebAuthn only", nativeAccess: "BiometricPrompt / TEE", status: "native-required" },
    { id: "battery", label: "Battery", domain: "power", webAccess: "limited", nativeAccess: "power HAL", status: "native-required" }
  ];

  const vitalOsBuildPhases = [
    { id: "phase-0", title: "Reference Device", progress: 20, deliverables: ["Unlockable bootloader target", "Kernel source audit", "Vendor blob inventory"] },
    { id: "phase-1", title: "Fullscreen Web Shell", progress: 65, deliverables: ["PWA manifest", "Settings console", "Provider registry"] },
    { id: "phase-2", title: "Agent App Factory", progress: 35, deliverables: ["Natural-language planner", "Generated app manifest", "Sandbox review trace"] },
    { id: "phase-3", title: "Native Services", progress: 10, deliverables: ["AOSP service map", "Hardware daemon contracts", "OTA/update model"] }
  ];

  const generatedVitalOsApps: any[] = [
    {
      id: "vapp-breath-guardian",
      name: "Breath Guardian",
      prompt: "Track asthma risk using air quality, breathing reminders, GPS, and notifications.",
      status: "sandboxed",
      riskLevel: "medium",
      createdAt: nowIso(),
      permissions: ["microphone", "gnss", "notifications", "network"],
      screens: ["Today", "Risk Map", "Breathwork", "Medication Reminders"],
      automations: ["Alert when AQI rises near saved locations", "Start breathwork timer after symptom log"],
      agents: ["claude", "openai", "gemini", "deepcode", "grok"]
    }
  ];

  const providerReadiness = () =>
    vitalOsAgentProviders.map(({ envKey, ...provider }) => ({
      ...provider,
      envKey,
      configured: Boolean(process.env[envKey]),
      keyVisibility: "server-only"
    }));

  const inferVitalOsPermissions = (prompt: string) => {
    const normalizedPrompt = prompt.toLowerCase();
    const permissionMap = [
      { permission: "microphone", keywords: ["voice", "audio", "mic", "breath", "sound", "listen"] },
      { permission: "camera", keywords: ["camera", "photo", "scan", "image", "vision"] },
      { permission: "gnss", keywords: ["gps", "location", "map", "near", "travel", "route"] },
      { permission: "notifications", keywords: ["notify", "remind", "alert", "alarm", "schedule"] },
      { permission: "accelerometer", keywords: ["motion", "steps", "fall", "movement", "run", "walk"] },
      { permission: "bluetooth", keywords: ["bluetooth", "wearable", "ring", "device", "sensor"] },
      { permission: "health-vault", keywords: ["health", "sleep", "heart", "hydration", "medical", "biometric"] },
      { permission: "network", keywords: ["weather", "air quality", "cloud", "api", "web", "online"] }
    ];

    const permissions = permissionMap
      .filter((entry) => entry.keywords.some((keyword) => normalizedPrompt.includes(keyword)))
      .map((entry) => entry.permission);

    return Array.from(new Set(permissions.length ? permissions : ["notifications", "health-vault"]));
  };

  const buildVitalOsApp = (prompt: string, inputMode = "text") => {
    const permissions = inferVitalOsPermissions(prompt);
    const shortName = prompt
      .replace(/[^a-z0-9\s]/gi, "")
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ") || "Custom VitalOS App";
    const riskLevel = permissions.some((permission) => ["microphone", "camera", "gnss", "biometrics", "health-vault"].includes(permission)) ? "medium" : "low";

    return {
      id: `vapp-${crypto.randomUUID()}`,
      name: shortName,
      prompt,
      inputMode,
      status: "sandboxed",
      riskLevel,
      createdAt: nowIso(),
      permissions,
      screens: ["Home", "Live Signals", "Automation Rules", "Audit Log"],
      automations: [
        "Ask before using protected hardware permissions",
        "Write every agent action to the local audit log",
        "Keep generated data in the encrypted owner vault by default"
      ],
      agents: vitalOsAgentProviders.map((provider) => provider.id),
      manifest: {
        runtime: "vitalos-web-sandbox",
        installMode: "local-owner-only",
        rollback: true,
        permissions
      }
    };
  };

  // Mock State
  const state = {
    nft: {
      id: "VITAL-001",
      name: "Genesis Pulse #001",
      organType: "Heart",
      healthState: "Vital",
      healthScore: 74,
      streakDays: 14,
      yieldMultiplier: 1.0,
      unclaimedVital: 245.50,
      image: "https://images.unsplash.com/photo-1551021216-13c8e2187530?q=80&w=2400&auto=format&fit=crop",
      isActivated: true,
      certificateId: "VTL-PULSE-0001",
      certificateTier: "Pulse",
      neuralLinkStrength: 72,
      activationDate: "2024-03-01T12:00:00Z",
      isHardwareBound: false,
      hardwareSerial: null,
      virtualAssetBurned: false,
      earnedTraits: ["Vital mark"],
      tokenId: 1,
      chainId: 84532,
      chainName: "Base Sepolia",
      contractAddress: "0x0000000000000000000000000000000000000000",
      transactionHash: null,
      metadataUri: "/api/metadata/1",
      biometricCommitment: "",
      holderProfileHash: "",
      evolutionNonce: 1
    },
    user: {
      steps: 8432,
      sleep: 7.2,
      consistency: 92,
      totalVitalEarned: 1250,
      vitalsTBalance: 450,
      vitalsTStaked: 0,
      stakingApy: 12.5,
      rank: 452,
      isWearablePaired: false,
      pairedDevice: null,
      isHardwareShipped: true,
      walletConnected: false,
      walletAddress: null,
      web3Domain: null,
      holderName: "Genesis Holder",
      availableCertificates: [
        { 
          id: "CERT-P1", 
          tier: "Pulse", 
          organ: "Lungs", 
          priceUsdt: 50,
          priceEth: 0.02,
          priceSol: 0.45,
          isOwned: false, 
          multiplier: 1.0, 
          traits: ["Bio-Link Initialized", "Genesis Asset"] 
        },
        { 
          id: "CERT-N2", 
          tier: "Nexus", 
          organ: "Brain", 
          priceUsdt: 150,
          priceEth: 0.06,
          priceSol: 1.35,
          isOwned: false, 
          multiplier: 2.2, 
          traits: ["Bio-Link Initialized", "Neural Peak", "Alpha Continuity"] 
        },
        { 
          id: "CERT-S3", 
          tier: "Sovereign", 
          organ: "Skin", 
          priceUsdt: 450,
          priceEth: 0.18,
          priceSol: 4.05,
          isOwned: false, 
          multiplier: 5.0, 
          traits: ["Bio-Link Initialized", "Vital Mark", "Alpha Continuity", "Genesis Asset", "Neural Peak"] 
        }
      ],
      activeTargets: [
        { id: "T1", type: "Steps", goal: 10000, currentValue: 8432, unit: "steps", streak: 3, targetStreak: 7, pointsReward: 500, isMet: false },
        { id: "T2", type: "Sleep", goal: 8, currentValue: 7.2, unit: "hours", streak: 5, targetStreak: 7, pointsReward: 300, isMet: false },
        { id: "T3", type: "Hydration", goal: 2500, currentValue: 1200, unit: "ml", streak: 2, targetStreak: 7, pointsReward: 200, isMet: false }
      ]
    }
  };

  state.nft.biometricCommitment = hashPayload({
    certificateId: state.nft.certificateId,
    organType: state.nft.organType,
    healthScore: state.nft.healthScore,
    neuralLinkStrength: state.nft.neuralLinkStrength,
    nonce: state.nft.evolutionNonce
  });
  state.nft.holderProfileHash = hashPayload({
    walletAddress: state.user.walletAddress || "unconnected",
    web3Domain: state.user.web3Domain || "unlinked",
    certificateId: state.nft.certificateId
  });

  const buildMetadata = () => ({
    name: state.nft.name,
    description: "Vitals is a living biometric dynamic NFT certificate. Public metadata contains only cryptographic commitments to the holder wallet/profile and biometric state; raw biometric data is never exposed on-chain.",
    image: state.nft.image,
    external_url: `${process.env.APP_URL || "http://localhost:3000"}/api/certificate/${state.nft.tokenId}`,
    animation_url: `${process.env.APP_URL || "http://localhost:3000"}/`,
    certificate: {
      id: state.nft.certificateId,
      tier: state.nft.certificateTier,
      issued_at: state.nft.activationDate,
      hardware_bound: state.nft.isHardwareBound,
      hardware_serial_hash: state.nft.hardwareSerial ? hashPayload(state.nft.hardwareSerial) : null
    },
    chain: {
      chain_id: state.nft.chainId,
      name: state.nft.chainName,
      contract: state.nft.contractAddress,
      token_id: state.nft.tokenId,
      metadata_uri: state.nft.metadataUri,
      last_transaction_hash: state.nft.transactionHash
    },
    holder: {
      wallet_address: state.user.walletAddress,
      web3_domain: state.user.web3Domain,
      holder_profile_hash: state.nft.holderProfileHash
    },
    privacy: {
      biometric_commitment: state.nft.biometricCommitment,
      raw_biometrics_stored_on_chain: false,
      metadata_policy: "public chain receives hashes and traits only; private samples remain encrypted/off-chain"
    },
    attributes: [
      { trait_type: "Organ", value: state.nft.organType },
      { trait_type: "Health State", value: state.nft.healthState },
      { trait_type: "Health Score", value: state.nft.healthScore },
      { trait_type: "Streak Days", value: state.nft.streakDays },
      { trait_type: "Yield Multiplier", value: state.nft.yieldMultiplier },
      { trait_type: "Neural Link Strength", value: state.nft.neuralLinkStrength },
      { trait_type: "Biometric Certificate", value: state.nft.certificateTier },
      ...state.nft.earnedTraits.map((trait) => ({ trait_type: "Earned Trait", value: trait }))
    ]
  });

  const recomputeCommitments = () => {
    state.nft.evolutionNonce += 1;
    state.nft.biometricCommitment = hashPayload({
      certificateId: state.nft.certificateId,
      organType: state.nft.organType,
      healthState: state.nft.healthState,
      healthScore: state.nft.healthScore,
      streakDays: state.nft.streakDays,
      neuralLinkStrength: state.nft.neuralLinkStrength,
      earnedTraits: state.nft.earnedTraits,
      nonce: state.nft.evolutionNonce
    });
    state.nft.holderProfileHash = hashPayload({
      walletAddress: state.user.walletAddress || "unconnected",
      web3Domain: state.user.web3Domain || "unlinked",
      holderName: state.user.holderName,
      certificateId: state.nft.certificateId
    });
  };

  // API Routes
  app.get("/healthz", (req, res) => {
    res.status(200).json({ ok: true, service: "vitals-dnft", port: PORT });
  });

  app.get("/api/state", (req, res) => {
    res.json(state);
  });

  app.get("/api/metadata/:tokenId", (req, res) => {
    const tokenId = Number(req.params.tokenId);
    if (tokenId !== state.nft.tokenId) {
      return res.status(404).json({ success: false, message: "Token metadata not found" });
    }

    res.json(buildMetadata());
  });

  app.get("/api/certificate/:tokenId", (req, res) => {
    const tokenId = Number(req.params.tokenId);
    if (tokenId !== state.nft.tokenId) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    res.json({
      tokenId: state.nft.tokenId,
      certificateId: state.nft.certificateId,
      holder: { walletAddress: state.user.walletAddress, web3Domain: state.user.web3Domain },
      biometricCommitment: state.nft.biometricCommitment,
      holderProfileHash: state.nft.holderProfileHash,
      metadata: buildMetadata()
    });
  });

  app.post("/api/connect-wallet", (req, res) => {
    const { walletAddress, web3Domain } = req.body;

    if (!walletAddress || typeof walletAddress !== "string") {
      return res.status(400).json({ success: false, message: "walletAddress is required" });
    }

    state.user.walletConnected = true;
    state.user.walletAddress = walletAddress;
    state.user.web3Domain = web3Domain || null;
    recomputeCommitments();

    res.json({ success: true, user: state.user, holderProfileHash: state.nft.holderProfileHash });
  });

  app.get("/api/vitalos/agent-providers", (req, res) => {
    res.json({
      providers: providerReadiness(),
      runtime: {
        shell: "fullscreen-web-os",
        installMode: "pwa",
        permissionModel: "browser-mediated until native firmware/OEM integration"
      },
      requiredEnv: vitalOsAgentProviders.map((provider) => provider.envKey)
    });
  });

  app.get("/api/vitalos/blueprint", (req, res) => {
    res.json({
      capabilities: vitalOsHardwareCapabilities,
      phases: vitalOsBuildPhases,
      generatedApps: generatedVitalOsApps,
      safeBuildPath: [
        "Use owner-authorized bootloader unlocks and reference devices.",
        "Keep API keys server-side and secrets out of generated app bundles.",
        "Simulate hardware first, then move selected features into native services.",
        "Never bypass anti-theft, carrier, enterprise, or account locks."
      ]
    });
  });

  app.get("/api/vitalos/apps", (req, res) => {
    res.json({ apps: generatedVitalOsApps });
  });

  app.post("/api/vitalos/apps/generate", (req, res) => {
    const { prompt, inputMode } = req.body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 8) {
      return res.status(400).json({ success: false, message: "Describe the app in at least 8 characters." });
    }

    const appManifest = buildVitalOsApp(prompt.trim(), inputMode || "text");
    generatedVitalOsApps.unshift(appManifest);

    res.json({
      success: true,
      app: appManifest,
      agentTrace: providerReadiness().map((provider) => ({
        provider: provider.id,
        mode: provider.configured ? "api-ready" : "stubbed-until-api-key",
        action: provider.role
      }))
    });
  });

  app.post("/api/vitalos/apps/:appId/install", (req, res) => {
    const appManifest = generatedVitalOsApps.find((app) => app.id === req.params.appId);

    if (!appManifest) {
      return res.status(404).json({ success: false, message: "VitalOS app not found" });
    }

    appManifest.status = "installed-local";
    appManifest.installedAt = nowIso();

    res.json({ success: true, app: appManifest });
  });

  app.get("/api/deployment/manifest", (req, res) => {
    res.json({
      contract: "VitalsDynamicNFT",
      source: "contracts/VitalsDynamicNFT.sol",
      targetChain: { chainId: state.nft.chainId, name: state.nft.chainName },
      constructorArgs: {
        initialOracle: process.env.VITALS_ORACLE_ADDRESS || "<oracle-address>",
        initialContractURI: `${process.env.APP_URL || "http://localhost:3000"}/api/metadata/contract`
      },
      firstMint: {
        organType: state.nft.organType,
        biometricCommitment: state.nft.biometricCommitment,
        holderProfileHash: state.nft.holderProfileHash,
        certificateId: state.nft.certificateId,
        encryptedMetadataURI: `${process.env.APP_URL || "http://localhost:3000"}${state.nft.metadataUri}`
      },
      requiredEnv: ["RPC_URL", "DEPLOYER_PRIVATE_KEY", "VITALS_ORACLE_ADDRESS", "APP_URL"],
      privacyNotice: "Do not put raw biometric samples or legal identity documents on a public blockchain. Commit hashes only."
    });
  });

  app.post("/api/deployment/simulate", (req, res) => {
    const { walletAddress, web3Domain, contractAddress, transactionHash } = req.body;

    if (walletAddress) state.user.walletAddress = walletAddress;
    if (web3Domain) state.user.web3Domain = web3Domain;
    state.user.walletConnected = Boolean(state.user.walletAddress);
    state.nft.contractAddress = contractAddress || `0x${hashPayload({ certificate: state.nft.certificateId, at: nowIso() }).slice(2, 42)}`;
    state.nft.transactionHash = transactionHash || hashPayload({ deployer: state.user.walletAddress, certificate: state.nft.certificateId, at: nowIso() });
    state.nft.activationDate = state.nft.activationDate || nowIso();
    state.nft.isActivated = true;
    recomputeCommitments();

    res.json({ success: true, receipt: state.nft, metadata: buildMetadata() });
  });

  app.post("/api/set-target", (req, res) => {
    const { type, goal } = req.body;
    let unit = "steps";
    let reward = 500;
    
    if (type === "Sleep") { unit = "hours"; reward = 300; }
    else if (type === "Hydration") { unit = "ml"; reward = 200; }
    else if (type === "Mindfulness") { unit = "mins"; reward = 400; }

    const newTarget = {
      id: `T${Date.now()}`,
      type,
      goal,
      currentValue: 0,
      unit,
      streak: 0,
      targetStreak: 7,
      pointsReward: reward,
      isMet: false
    };
    state.user.activeTargets.push(newTarget);
    res.json({ success: true, target: newTarget });
  });

  app.post("/api/log-progress", (req, res) => {
    const { targetId, value } = req.body;
    const target = state.user.activeTargets.find(t => t.id === targetId);
    if (target) {
      target.currentValue += value;
      if (target.currentValue >= target.goal) {
        target.isMet = true;
        // In a real app, we'd handle streaks and rewards here
        // For the demo, let's just grant a portion of the reward immediately if met
        state.user.vitalsTBalance += target.pointsReward / 10; 
      }
      res.json({ success: true, target });
    } else {
      res.status(404).json({ success: false, message: "Target not found" });
    }
  });

  app.post("/api/swap-vital", (req, res) => {
    const { amount } = req.body;
    if (state.user.totalVitalEarned >= amount) {
      state.user.totalVitalEarned -= amount;
      state.user.vitalsTBalance += amount * 0.1; // Exchange rate 10:1
      res.json({ success: true, newVitalsT: state.user.vitalsTBalance });
    } else {
      res.status(400).json({ success: false, message: "Insufficient $VITAL balance" });
    }
  });

  app.post("/api/stake", (req, res) => {
    const { amount } = req.body;
    if (state.user.vitalsTBalance >= amount) {
      state.user.vitalsTBalance -= amount;
      state.user.vitalsTStaked += amount;
      res.json({ success: true, staked: state.user.vitalsTStaked, balance: state.user.vitalsTBalance });
    } else {
      res.status(400).json({ success: false, message: "Insufficient VT-T balance" });
    }
  });

  app.post("/api/unstake", (req, res) => {
    const { amount } = req.body;
    if (state.user.vitalsTStaked >= amount) {
      state.user.vitalsTStaked -= amount;
      state.user.vitalsTBalance += amount;
      res.json({ success: true, staked: state.user.vitalsTStaked, balance: state.user.vitalsTBalance });
    } else {
      res.status(400).json({ success: false, message: "Insufficient staked balance" });
    }
  });

  app.post("/api/activate", (req, res) => {
    state.nft.isActivated = true;
    state.nft.activationDate = new Date().toISOString();
    state.nft.neuralLinkStrength = 45;
    recomputeCommitments();
    res.json({ success: true, message: "Certificate Activated On-Chain", metadata: buildMetadata() });
  });

  app.post("/api/activate-hardware", (req, res) => {
    const { serial } = req.body;
    if (!serial || serial.length < 5) {
      return res.status(400).json({ success: false, message: "Invalid Hardware Serial" });
    }
    
    // Override Virtual Certificate
    state.nft.isHardwareBound = true;
    state.nft.hardwareSerial = serial;
    state.nft.virtualAssetBurned = true;
    state.nft.neuralLinkStrength = 100; // Physical hardware provides perfect link
    state.nft.yieldMultiplier *= 1.5; // Hardware boost
    
    // Change image to hardware ring
    state.nft.image = "https://images.unsplash.com/photo-1610494162455-d14c330f88cf?q=80&w=2400&auto=format&fit=crop"; 
    state.nft.name = `Vitals Ring [${serial}]`;
    recomputeCommitments();
    
    state.user.isWearablePaired = true;
    state.user.pairedDevice = "Vitals Physical Ring Gen-1";
    
    res.json({ success: true, message: "Virtual Certificate Overridden. Physical Hardware Integrated." });
  });

  app.post("/api/buy", (req, res) => {
    const { certId } = req.body;
    const cert = state.user.availableCertificates.find(c => c.id === certId);
    if (cert) {
      cert.isOwned = true;
      res.json({ success: true, message: `Purchased ${cert.tier} ${cert.organ} Certificate` });
    } else {
      res.status(404).json({ success: false, message: "Certificate not found" });
    }
  });

  app.post("/api/pair-wearable", (req, res) => {
    state.user.isWearablePaired = true;
    state.user.pairedDevice = "Vitals Ring Gen-1";
    state.nft.neuralLinkStrength = 98;
    recomputeCommitments();
    res.json({ success: true, device: state.user.pairedDevice, biometricCommitment: state.nft.biometricCommitment });
  });

  app.post("/api/sync", (req, res) => {
    // Simulate health sync
    if (!state.nft.isActivated) {
      return res.status(400).json({ success: false, message: "Activate your certificate first" });
    }
    state.user.steps += Math.floor(Math.random() * 500);
    state.nft.healthScore = Math.min(100, state.nft.healthScore + 2);
    state.nft.streakDays += 1;
    recomputeCommitments();
    // Link strength boosts yield
    const boost = state.nft.neuralLinkStrength / 100;
    state.nft.unclaimedVital += state.nft.yieldMultiplier * 5 * (1 + boost);
    res.json({ success: true, message: "Vitals synced via Neural Link", newState: state });
  });

  app.post("/api/claim", (req, res) => {
    const claimed = state.nft.unclaimedVital;
    state.user.totalVitalEarned += claimed;
    state.nft.unclaimedVital = 0;
    res.json({ success: true, claimedAmount: claimed });
  });

  app.post("/api/evolve", (req, res) => {
    const states = ["Embryonic", "Vital", "Resilient", "Thriving", "Ascendant", "Immortal"];
    const currentIndex = states.indexOf(state.nft.healthState);
    
    if (currentIndex < states.length - 1 && state.nft.healthScore >= 70) {
      const nextState = states[currentIndex + 1];
      state.nft.healthState = nextState;
      state.nft.yieldMultiplier += 0.5;
      
      // Add milestone trait
      const traitName = `${nextState} mark`;
      if (!state.nft.earnedTraits.includes(traitName)) {
        state.nft.earnedTraits.push(traitName);
      }
      
      recomputeCommitments();
      res.json({ success: true, newStage: nextState, metadata: buildMetadata() });
    } else {
      res.status(400).json({ success: false, message: "Health score or streak requirements not met for evolution" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vitals Server listening on 0.0.0.0:${PORT}`);
  });
}

startServer();
