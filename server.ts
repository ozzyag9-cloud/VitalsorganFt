import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  // Mock database
  const state = {
    vitals: {
      heartRate: 72,
      cpuLoad: 24,
      neuralActivity: 88,
      entropy: 0.12
    },
    nft: {
      id: "VOS-8842",
      tier: "Sovereign",
      level: 42,
      syncRate: 98.4,
      isHardwareBound: true,
      biometricHash: "0x8842...4411"
    }
  };

  const socialFeed = {
    vtok: [
      { id: '1', author: 'vital_enclave', handle: '0x8842...4411', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-technological-environment-31414-large.mp4', likes: '1.2M', comments: '44K', caption: 'Streaming biometric hash data directly to the Vital Grid. #Sovereignty #Web3' },
      { id: '2', author: 'bio_pioneer', handle: '0x321a...7721', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-dots-connecting-together-23301-large.mp4', likes: '840K', comments: '22K', caption: 'Phase 1 calibration complete. System at 98% efficiency.' }
    ],
    vgram: [
      { id: '1', author: 'Pioneer_Node_1', handle: '0xV...14A2', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', likes: '142', caption: 'Syncing my biological frequencies with the mainnet core has never felt more sovereign.' },
      { id: '2', author: 'Grid_Watch', handle: '0xV...99B1', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa', likes: '3.1K', caption: 'The epoch 8842 voting cycle is now open. All dNFT holders are invited.' }
    ],
    vnode: [
      { id: '1', author: 'SovereignNode', handle: '0x8842...4411', msg: "Censorship-resistant microblogging is not just a feature, it's a biological right. #VitalOS #FreeSpeech", time: "2m", likes: "14K" },
      { id: '2', author: 'GridWatcher', handle: 'grid_intel', msg: "Unusual activity detected in the entropy pool. Handshake protocols intensifying.", time: "15m", likes: "822" }
    ]
  };

  // API Routes
  app.get("/api/state", (req, res) => res.json(state));
  app.get("/api/social/feed", (req, res) => res.json(socialFeed));
  
  app.get("/api/config", (req, res) => {
    res.json({
      thirdwebClientId: process.env.THIRDWEB_CLIENT_ID || ""
    });
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("dist")));
    app.get("*", (req, res) => res.sendFile(path.resolve("dist/index.html")));
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  }

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
