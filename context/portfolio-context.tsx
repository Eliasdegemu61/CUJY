'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { EnrichedPosition } from '@/lib/sodex-api';

interface PortfolioContextType {
  walletAddress: string | null;
  userId: string | null;
  positions: EnrichedPosition[];
  isLoading: boolean;
  error: string | null;
  setWalletAddress: (address: string, userId: string, positions: EnrichedPosition[]) => Promise<void>;
  clearWalletAddress: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ 
  children, 
  initialUserId, 
  initialPositions 
}: { 
  children: React.ReactNode;
  initialUserId?: string | null;
  initialPositions?: EnrichedPosition[];
}) {
  const [walletAddress, setWalletAddressState] = useState<string | null>(null);
  const [userId, setUserIdState] = useState<string | null>(initialUserId || null);
  const [positions, setPositions] = useState<EnrichedPosition[]>(initialPositions || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage on mount (only if not provided as initial props)
  useEffect(() => {
    if (initialUserId) {
      // Use initial data provided (for tracker)
      return;
    }
    
    if (typeof window !== 'undefined') {
      const savedAddress = localStorage.getItem('portfolio_wallet_address');
      const savedUserId = localStorage.getItem('portfolio_user_id');
      const savedPositions = localStorage.getItem('portfolio_positions');

      if (savedAddress) {
        setWalletAddressState(savedAddress);
      }
      if (savedUserId) {
        setUserIdState(savedUserId);
      }
      if (savedPositions) {
        try {
          const parsedPositions = JSON.parse(savedPositions);
          console.log('[v0] Loaded positions from localStorage:', parsedPositions.length);
          setPositions(parsedPositions);
        } catch (e) {
          console.log('[v0] Failed to parse saved positions');
        }
      }
    }
  }, [initialUserId]);

  const setWalletAddress = useCallback(
    async (address: string, userId: string, enrichedPositions: EnrichedPosition[]) => {
      try {
        console.log('[v0] Setting wallet address:', address);
        console.log('[v0] With userId:', userId);
        console.log('[v0] And positions count:', enrichedPositions.length);

        // Save to localStorage
        localStorage.setItem('portfolio_wallet_address', address);
        localStorage.setItem('portfolio_user_id', userId);
        localStorage.setItem('portfolio_positions', JSON.stringify(enrichedPositions));

        setWalletAddressState(address);
        setUserIdState(userId);
        setPositions(enrichedPositions);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to save portfolio';
        console.error('[v0] Error setting wallet address:', errorMessage);
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const clearWalletAddress = useCallback(() => {
    localStorage.removeItem('portfolio_wallet_address');
    localStorage.removeItem('portfolio_user_id');
    localStorage.removeItem('portfolio_positions');
    setWalletAddressState(null);
    setUserIdState(null);
    setPositions([]);
    setError(null);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        walletAddress,
        userId,
        positions,
        isLoading,
        error,
        setWalletAddress,
        clearWalletAddress,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
}
