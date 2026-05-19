import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock State
  const registrations: any[] = [];
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
      earnedTraits: ["Vital mark"]
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

  // API Routes
  app.get("/api/state", (req, res) => {
    res.json(state);
  });

  app.post("/api/signup", (req, res) => {
    const { email, walletAddress } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });
    
    const registration = {
      id: `REG-${Date.now()}`,
      email,
      walletAddress,
      date: new Date().toISOString()
    };
    registrations.push(registration);
    console.log(`New registration: ${email}`);
    res.json({ success: true, message: "Successfully registered for the VitalOS mission." });
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
    res.json({ success: true, message: "Certificate Activated On-Chain" });
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
    res.json({ success: true, device: state.user.pairedDevice });
  });

  app.post("/api/sync", (req, res) => {
    // Simulate health sync
    if (!state.nft.isActivated) {
      return res.status(400).json({ success: false, message: "Activate your certificate first" });
    }
    state.user.steps += Math.floor(Math.random() * 500);
    state.nft.healthScore = Math.min(100, state.nft.healthScore + 2);
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
      
      res.json({ success: true, newStage: nextState });
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
    console.log(`Vitals Server running on http://localhost:${PORT}`);
  });
}

startServer();
