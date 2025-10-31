// Format address for display
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Convert address to bytes32 format
export const addressToBytes32 = (address) => {
  return `0x000000000000000000000000${address.slice(2)}`;
};

// Empty bytes32
export const EMPTY_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

// Format transaction hash for display
export const formatTxHash = (hash) => {
  if (!hash) return '';
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
};

// Get block explorer URL
export const getExplorerUrl = (chain, txHash) => {
  const explorers = {
    sepolia: `https://sepolia.etherscan.io/tx/${txHash}`,
    baseSepolia: `https://sepolia.basescan.org/tx/${txHash}`,
  };
  return explorers[chain] || '#';
};
