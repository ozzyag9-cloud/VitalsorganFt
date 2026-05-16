'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygonAmoy } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'Proof of Life Protocol',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'development-project-id',
  chains: [polygonAmoy],
  ssr: true,
});
