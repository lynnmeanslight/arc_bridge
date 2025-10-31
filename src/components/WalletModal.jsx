import { useConnect } from 'wagmi';

const WalletModal = ({ isOpen, onClose }) => {
  const { connectors, connect } = useConnect();

  if (!isOpen) return null;

  const getConnectorIcon = (connectorName) => {
    const name = connectorName.toLowerCase();
    
    if (name.includes('farcaster')) {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
          <span className="text-2xl">🎯</span>
        </div>
      );
    }
    
    if (name.includes('metamask')) {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
          <span className="text-2xl">🦊</span>
        </div>
      );
    }
    
    if (name.includes('coinbase')) {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
          <svg className="h-8 w-8" viewBox="0 0 1024 1024" fill="#0052FF">
            <circle cx="512" cy="512" r="512"/>
            <rect x="284" y="284" width="456" height="456" rx="48" fill="white"/>
          </svg>
        </div>
      );
    }
    
    if (name.includes('base')) {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
          <svg className="h-8 w-8" viewBox="0 0 111 111" fill="none">
            <path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H3.9565e-07C2.35281 87.8625 26.0432 110.034 54.921 110.034Z" fill="#0000FF"/>
          </svg>
        </div>
      );
    }
    
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
        <span className="text-2xl">💼</span>
      </div>
    );
  };

  const getConnectorName = (connector) => {
    const name = connector.name;
    if (name.toLowerCase().includes('farcaster')) return 'Farcaster';
    if (name.toLowerCase().includes('metamask')) return 'MetaMask';
    if (name.toLowerCase().includes('coinbase')) return 'Coinbase Wallet';
    if (name.toLowerCase().includes('base')) return 'Base Account';
    return name;
  };

  const getConnectorDescription = (connectorName) => {
    const name = connectorName.toLowerCase();
    if (name.includes('farcaster')) return 'Connect via Farcaster';
    if (name.includes('metamask')) return 'Connect with MetaMask';
    if (name.includes('coinbase')) return 'Coinbase Wallet SDK';
    if (name.includes('base')) return 'Smart Wallet on Base';
    return 'Browser wallet';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md animate-[slideUp_0.2s_ease] rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Wallet Options */}
        <div className="space-y-2">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => {
                connect({ connector });
                onClose();
              }}
              className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left transition-all hover:border-gray-300 hover:bg-gray-100 active:scale-[0.98]"
            >
              {getConnectorIcon(connector.name)}
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {getConnectorName(connector)}
                </div>
                <div className="text-xs text-gray-500">
                  {getConnectorDescription(connector.name)}
                </div>
              </div>
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Choose your preferred wallet to continue
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
