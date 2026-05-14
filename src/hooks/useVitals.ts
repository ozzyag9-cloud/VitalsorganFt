import { useState, useEffect } from 'react';
import { VitalsNft, UserStats } from '../types';

const BASE_SEPOLIA = {
  chainId: '0x14a34',
  chainName: 'Base Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org']
};

export function useVitals() {
  const [nft, setNft] = useState<VitalsNft | null>(null);
  const [user, setUser] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchState = async () => {
    try {
      const res = await fetch('/api/state');
      const data = await res.json();
      setNft(data.nft);
      setUser(data.user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const sync = async () => {
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      const data = await res.json();
      setNft(data.newState.nft);
      setUser(data.newState.user);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const claim = async () => {
    try {
      const res = await fetch('/api/claim', { method: 'POST' });
      const data = await res.json();
      await fetchState();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const evolve = async () => {
    try {
      const res = await fetch('/api/evolve', { method: 'POST' });
      const data = await res.json();
      await fetchState();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const activate = async () => {
    try {
      const res = await fetch('/api/activate', { method: 'POST' });
      await fetchState();
    } catch (e) {
      console.error(e);
    }
  };

  const pairWearable = async () => {
    try {
      const res = await fetch('/api/pair-wearable', { method: 'POST' });
      await fetchState();
    } catch (e) {
      console.error(e);
    }
  };

  const activateHardware = async (serial: string) => {
    try {
      const res = await fetch('/api/activate-hardware', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serial })
      });
      await fetchState();
    } catch (e) {
      console.error(e);
    }
  };

  const setTarget = async (type: string, goal: number) => {
    try {
      await fetch('/api/set-target', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, goal })
      });
      await fetchState();
    } catch (e) {
      console.error(e);
    }
  };

  const swapVitals = async (amount: number) => {
    try {
      await fetch('/api/swap-vital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      await fetchState();
    } catch (e) {
      console.error(e);
    }
  };

  const stakeVitals = async (amount: number) => {
    try {
      await fetch('/api/stake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      await fetchState();
    } catch (e) {
      console.error(e);
    }
  };

  const unstakeVitals = async (amount: number) => {
    try {
      await fetch('/api/unstake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      await fetchState();
    } catch (e) {
      console.error(e);
    }
  };

  const logProgress = async (targetId: string, value: number) => {
    try {
      await fetch('/api/log-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetId, value })
      });
      await fetchState();
    } catch (e) {
      console.error(e);
    }
  };

  const buy = async (certId: string) => {
    try {
      const res = await fetch('/api/buy', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certId })
      });
      await fetchState();
    } catch (e) {
      console.error(e);
    }
  };

  const connectWallet = async (domain?: string) => {
    try {
      setLoading(true);
      const ethereum = (window as any).ethereum;

      if (ethereum?.request) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' }) as string[];
        const walletAddress = accounts[0];

        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BASE_SEPOLIA.chainId }]
          });
        } catch (switchError: any) {
          if (switchError?.code === 4902) {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [BASE_SEPOLIA]
            });
          } else {
            throw switchError;
          }
        }

        await fetch('/api/connect-wallet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ walletAddress, web3Domain: domain || null })
        });
        await fetchState();
        return;
      }

      if (user) {
        setUser({
          ...user,
          walletConnected: true,
          walletAddress: '0x7f2a00000000000000000000000000000088cc11',
          web3Domain: domain || null
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  return { nft, user, loading, sync, claim, evolve, activate, pairWearable, activateHardware, buy, setTarget, swapVitals, stakeVitals, unstakeVitals, logProgress, connectWallet, refresh: fetchState };
}
