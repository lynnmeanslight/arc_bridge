import { arcTestnet } from './constants';

/**
 * Add a network to the user's wallet
 * @param {Object} chain - Chain configuration object
 * @returns {Promise<boolean>} - Returns true if successful
 */
export const addNetworkToWallet = async (chain) => {
  if (!window.ethereum) {
    throw new Error('No wallet detected');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${chain.id.toString(16)}`,
          chainName: chain.name,
          nativeCurrency: chain.nativeCurrency,
          rpcUrls: [chain.rpcUrls.default.http[0]],
          blockExplorerUrls: chain.blockExplorers?.default?.url ? [chain.blockExplorers.default.url] : [],
        },
      ],
    });
    return true;
  } catch (error) {
    console.error('Failed to add network:', error);
    throw error;
  }
};

/**
 * Switch to a network, adding it if necessary
 * @param {Function} switchChain - Wagmi's switchChain function
 * @param {number} chainId - Chain ID to switch to
 * @param {Object} chainConfig - Full chain configuration object
 * @returns {Promise<void>}
 */
export const switchToChain = async (switchChain, chainId, chainConfig) => {
  try {
    // Try to switch directly
    await switchChain({ chainId });
  } catch (error) {
    // If switch fails, try adding the network first
    if (error.message?.includes('Unrecognized chain ID') || error.message?.includes('wallet_addEthereumChain')) {
      console.log(`Adding ${chainConfig.name} to wallet...`);
      await addNetworkToWallet(chainConfig);
      // Try switching again after adding
      await switchChain({ chainId });
    } else {
      throw error;
    }
  }
};

/**
 * Base Sepolia chain configuration for adding to wallet
 */
export const baseSepoliaConfig = {
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://sepolia.base.org'] },
    public: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://sepolia.basescan.org' },
  },
  testnet: true,
};

/**
 * Get chain config by chain ID
 */
export const getChainConfig = (chainId) => {
  if (chainId === arcTestnet.id) {
    return arcTestnet;
  } else if (chainId === 84532) {
    return baseSepoliaConfig;
  }
  return null;
};
