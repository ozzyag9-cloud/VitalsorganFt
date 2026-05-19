export type OrganType = 'Heart' | 'Brain' | 'Nervous System' | 'Circulatory';
export type CertificateTier = 'Genesis' | 'Nexus' | 'Sovereign' | 'Immortal';

export interface HealthMetrics {
  heartRate: number;
  cpuLoad: number;
  neuralActivity: number;
  entropy: number;
}

export interface VitalNFT {
  id: string;
  tier: CertificateTier;
  level: number;
  syncRate: number;
  isHardwareBound: boolean;
  biometricHash: string;
}

export interface UserState {
  email: string | null;
  walletAddress: string | null;
  walletConnected: boolean;
  onboardingComplete: boolean;
}
