const NetworkCard = ({ type, network, token }) => {
  const isArc = network === 'Arc Testnet';
  
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{type}</label>
      <div className="flex items-center justify-between rounded-xl border-2 border-gray-200 bg-gray-50 p-4 transition-all hover:border-gray-300">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Network Icon */}
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-600 bg-blue-600 sm:h-12 sm:w-12">
            {isArc ? (
              // Arc logo - stylized A
              <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L4 21h3.5l1.5-4h6l1.5 4H20L12 3z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              // Base logo - white version on dark background
              <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 111 111" fill="none">
                <path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H3.9565e-07C2.35281 87.8625 26.0432 110.034 54.921 110.034Z" fill="white"/>
              </svg>
            )}
          </div>

          {/* Network Info */}
          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-bold text-black">
              {network}
            </div>
            <div className="text-sm font-medium text-gray-600">
              Testnet
            </div>
          </div>
        </div>

        {/* Token Badge */}
        <div className="flex-shrink-0 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-bold text-white shadow-sm">
          {token}
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;
