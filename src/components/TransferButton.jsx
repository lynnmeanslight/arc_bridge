const TransferButton = ({ onClick, disabled, loading, status }) => {
  // Simplify status messages for better UX
  const getButtonText = () => {
    if (!loading) return 'Bridge USDC';
    
    if (status.includes('Switching')) return 'Switching Chain...';
    if (status.includes('Initializing')) return 'Initializing...';
    if (status.includes('Bridging')) return 'Bridging...';
    if (status.includes('Approved')) return 'Approved ✓';
    if (status.includes('Burned')) return 'Processing...';
    if (status.includes('Minted')) return 'Almost Done...';
    if (status.includes('completed')) return 'Complete ✓';
    
    return 'Processing...';
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative mt-8 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-8 py-5 text-lg font-bold shadow-xl transition-all duration-300 ${
        disabled
          ? 'cursor-not-allowed bg-gray-200 text-gray-400 shadow-none'
          : loading
          ? 'cursor-wait bg-blue-600 text-white shadow-2xl'
          : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]'
      }`}
    >
      {!disabled && !loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shimmer" />
      )}
      
      {loading ? (
        <>
          <div className="h-6 w-6 animate-spin rounded-full border-3 border-white/30 border-t-white" />
          <span className="relative z-10">{getButtonText()}</span>
        </>
      ) : (
        <>
          <span className="relative z-10">{getButtonText()}</span>
          <svg className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </>
      )}
    </button>
  );
};

export default TransferButton;
