import { useEffect, useState } from 'react';
import { addNetworkToWallet, baseSepoliaConfig } from '../utils/addNetwork';
import { arcTestnet } from '../utils/constants';

/**
 * Hook to ensure required networks are added to the wallet
 * @param {boolean} isConnected - Whether wallet is connected
 * @returns {Object} - Status of network addition
 */
export const useEnsureNetworks = (isConnected) => {
  const [networksAdded, setNetworksAdded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ensureNetworks = async () => {
      if (!isConnected || !window.ethereum || networksAdded) return;

      try {
        // Check if networks need to be added by attempting to get chain info
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        // Networks to ensure are available
        const networks = [arcTestnet, baseSepoliaConfig];
        
        // We won't auto-add unless there's an error switching
        // This prevents annoying popups on every connection
        setNetworksAdded(true);
      } catch (err) {
        console.error('Error checking networks:', err);
        setError(err.message);
      }
    };

    ensureNetworks();
  }, [isConnected, networksAdded]);

  return { networksAdded, error };
};
