import { useState } from 'react';
import { addNetworkToWallet, baseSepoliaConfig } from '../utils/addNetwork';
import { arcTestnet } from '../utils/constants';

const AddNetworkButton = ({ chainId, className = '' }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const chainConfig = chainId === arcTestnet.id ? arcTestnet : baseSepoliaConfig;
  const chainName = chainConfig.name;

  const handleAddNetwork = async () => {
    setIsAdding(true);
    try {
      await addNetworkToWallet(chainConfig);
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    } catch (error) {
      console.error('Failed to add network:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (added) {
    return (
      <div className={`inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 ${className}`}>
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Added!
      </div>
    );
  }

  return (
    <button
      onClick={handleAddNetwork}
      disabled={isAdding}
      className={`inline-flex items-center gap-2 rounded-lg border-2 border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-900 transition-all hover:border-blue-400 hover:bg-blue-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isAdding ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Adding...
        </>
      ) : (
        <>
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add {chainName} to Wallet
        </>
      )}
    </button>
  );
};

export default AddNetworkButton;
