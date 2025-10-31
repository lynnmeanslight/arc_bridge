const Header = ({ address, isConnected, chain, onConnect, onDisconnect, basename }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img 
            src="/favicon_io/android-chrome-192x192.png" 
            alt="Arc Bridge Logo" 
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg"
          />
          <span className="text-lg font-black text-black sm:text-xl">
            Arc Bridge
          </span>
        </div>

        {/* Wallet Connection */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isConnected ? (
            <>
              {chain && (
                <div className="hidden rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-700 sm:block sm:text-sm">
                  {chain.name}
                </div>
              )}
              <button
                onClick={onDisconnect}
                className="group rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50 active:scale-95 sm:px-6 sm:py-2.5 sm:text-base"
              >
                <span className="group-hover:hidden">
                  {basename ? (
                    <span className="font-medium text-blue-600">{basename}</span>
                  ) : (
                    <span className="font-mono">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                  )}
                </span>
                <span className="hidden group-hover:inline">
                  Disconnect
                </span>
              </button>
            </>
          ) : (
            <button
              onClick={onConnect}
              className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-95 sm:px-8 sm:py-3 sm:text-base"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;