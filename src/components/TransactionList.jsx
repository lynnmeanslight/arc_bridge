import { formatTxHash, getExplorerUrl } from '../utils/helpers';

const TransactionList = ({ txHashes }) => {
  const transactions = [
    { label: 'Approval', hash: txHashes.approve, chain: 'sepolia' },
    { label: 'Burn', hash: txHashes.burn, chain: 'sepolia' },
    { label: 'Mint', hash: txHashes.mint, chain: 'baseSepolia' },
  ].filter(tx => tx.hash);

  if (transactions.length === 0) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm sm:rounded-xl sm:p-5">
      <div className="mb-3 text-xs font-semibold text-gray-600 sm:text-sm">
        Transaction History
      </div>
      <div className="space-y-2">
        {transactions.map((tx, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-lg bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <span className="text-xs font-semibold text-gray-600 sm:min-w-[80px] sm:text-sm">
              {tx.label}:
            </span>
            <a
              href={getExplorerUrl(tx.chain, tx.hash)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 break-all font-mono text-xs text-gray-900 transition-colors active:text-gray-600 sm:text-sm sm:hover:text-gray-600 sm:hover:underline"
            >
              <span className="break-all">{formatTxHash(tx.hash)}</span>
              <svg className="h-3 w-3 flex-shrink-0 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
