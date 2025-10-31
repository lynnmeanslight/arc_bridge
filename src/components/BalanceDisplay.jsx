import { useState, useEffect } from 'react';
import { useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { sepolia, baseSepolia } from 'viem/chains';
import { arcTestnet, CONTRACTS } from '../utils/constants';

const BalanceDisplay = ({ address, chainId, showUSDC = true }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check if Arc Testnet (where native token is USDC)
  const isArcTestnet = chainId === arcTestnet.id;

  // Native token balance (only for non-Arc chains)
  const { data: nativeBalance, refetch: refetchNative } = useBalance({
    address,
    chainId,
    enabled: !isArcTestnet, // Skip for Arc Testnet
  });

  // USDC balance - determine which USDC contract to use based on chain
  const usdcContractAddress = chainId === baseSepolia.id 
    ? CONTRACTS.BASE_SEPOLIA_USDC
    : chainId === arcTestnet.id
    ? CONTRACTS.ARC_TESTNET_USDC 
    : null;

  const { data: usdcBalance, refetch: refetchUSDC } = useBalance({
    address,
    token: usdcContractAddress,
    chainId,
    enabled: showUSDC && usdcContractAddress !== null,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const refreshPromises = [];
    if (!isArcTestnet) refreshPromises.push(refetchNative());
    if (showUSDC) refreshPromises.push(refetchUSDC());
    await Promise.all(refreshPromises);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (!address) return null;

  const chainName = chainId === sepolia.id ? 'ETH' : 'ETH';
  
  return (
    <div className="mt-3 space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">Balance</span>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 active:scale-95 disabled:opacity-50"
          title="Refresh balance"
        >
          <svg
            className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Native Token Balance (ETH for Base Sepolia) */}
      {!isArcTestnet && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{chainName}:</span>
          <span className="font-mono text-sm font-semibold text-gray-900">
            {nativeBalance 
              ? `${parseFloat(formatUnits(nativeBalance.value, nativeBalance.decimals)).toFixed(4)}`
              : '0.0000'}
          </span>
        </div>
      )}

      {/* USDC Balance (Native for Arc Testnet, Token for Base Sepolia) */}
      {showUSDC && usdcContractAddress && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            USDC{isArcTestnet ? ' (Native)' : ''}:
          </span>
          <span className="font-mono text-sm font-semibold text-gray-900">
            {usdcBalance
              ? `${parseFloat(formatUnits(usdcBalance.value, usdcBalance.decimals)).toFixed(2)}`
              : '0.00'}
          </span>
        </div>
      )}
    </div>
  );
};

export default BalanceDisplay;
