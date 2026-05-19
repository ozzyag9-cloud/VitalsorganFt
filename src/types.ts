export enum CertificateTier {
  Pulse = 'Pulse',
  Nexus = 'Nexus',
  Sovereign = 'Sovereign'
}

export enum HealthState {
  Embryonic = 'Embryonic',
  Vital = 'Vital',
  Resilient = 'Resilient',
  Thriving = 'Thriving',
  Ascendant = 'Ascendant',
  Immortal = 'Immortal',
  Stressed = 'Stressed',
  Critical = 'Critical'
}

export enum OrganType {
  Heart = 'Heart',
  Brain = 'Brain',
  Lungs = 'Lungs',
  Gut = 'Gut',
  Skin = 'Skin',
}

export interface VitalsNft {
  id: string;
  name: string;
  organType: OrganType;
  healthState: HealthState;
  healthScore: number;
  streakDays: number;
  yieldMultiplier: number;
  unclaimedVital: number;
  image: string;
  isActivated: boolean;
  certificateId: string;
  certificateTier: CertificateTier;
  neuralLinkStrength: number; // 0-100
  activationDate: string | null;
  isHardwareBound: boolean;
  hardwareSerial: string | null;
  virtualAssetBurned: boolean;
  earnedTraits: string[]; // Milestone flags (Vital mark, etc)
}

export interface UserStats {
  steps: number;
  sleep: number;
  consistency: number;
  totalVitalEarned: number;
  vitalsTBalance: number; // Native token balance
  vitalsTStaked: number; // Staked token balance
  stakingApy: number; // Current APY
  rank: number;
  isWearablePaired: boolean;
  pairedDevice: string | null;
  isHardwareShipped: boolean;
  availableCertificates: CertificateMeta[];
  activeTargets: HealthTarget[];
  walletConnected: boolean;
  walletAddress: string | null;
  web3Domain: string | null;
}

export interface HealthTarget {
  id: string;
  type: string;
  goal: number;
  currentValue: number;
  unit: string;
  streak: number;
  targetStreak: number;
  pointsReward: number;
  isMet: boolean;
}

export interface CertificateMeta {
  id: string;
  tier: CertificateTier;
  organ: OrganType;
  priceUsdt: number;
  priceEth: number;
  priceSol: number;
  isOwned: boolean;
  multiplier: number;
  traits: string[];
}
