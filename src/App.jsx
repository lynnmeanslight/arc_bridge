import { useState, useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWalletClient,
  usePublicClient,
  useSwitchChain,
} from "wagmi";
import { baseSepolia, base } from "viem/chains";
import { getName } from "@coinbase/onchainkit/identity";
import Header from "./components/Header";
import ProgressSteps from "./components/ProgressSteps";
import NetworkCard from "./components/NetworkCard";
import BalanceDisplay from "./components/BalanceDisplay";
import TransferButton from "./components/TransferButton";
import Footer from "./components/Footer";
import StatusBox from "./components/StatusBox";
import TransactionList from "./components/TransactionList";
import InfoCard from "./components/InfoCard";
import WalletModal from "./components/WalletModal";
import AddNetworkButton from "./components/AddNetworkButton";
import { useTransfer } from "./hooks/useTransfer";
import { DEFAULTS, arcTestnet } from "./utils/constants";
import { switchToChain, getChainConfig } from "./utils/addNetwork";


function App() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();
  const arcTestnetPublicClient = usePublicClient({ chainId: arcTestnet.id });
  const baseSepoliaPublicClient = usePublicClient({ chainId: baseSepolia.id });
  const { switchChain } = useSwitchChain();

  const [amount, setAmount] = useState(DEFAULTS.AMOUNT);
  const [maxFee, setMaxFee] = useState(DEFAULTS.MAX_FEE);
  const [currentStep, setCurrentStep] = useState(0);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [sourceChainId, setSourceChainId] = useState(arcTestnet.id);
  const [destinationChainId, setDestinationChainId] = useState(baseSepolia.id);
  const [basename, setBasename] = useState("");

  const { status, loading, error, txHashes, executeTransfer } = useTransfer(
    walletClient,
    arcTestnetPublicClient,
    baseSepoliaPublicClient,
    switchChain,
    chain,
    sourceChainId,
    destinationChainId
  );

  // Update step based on wallet connection and transfer status
  useEffect(() => {
    if (status.toLowerCase().includes("completed") || status.includes("✅")) {
      setCurrentStep(3); // Complete
    } else if (loading) {
      setCurrentStep(2); // Bridge Transfer
    } else if (amount && isConnected) {
      setCurrentStep(1); // Enter Amount
    } else if (isConnected) {
      setCurrentStep(1); // Enter Amount (default when connected)
    } else {
      setCurrentStep(0); // Connect Wallet
    }
  }, [status, loading, amount, isConnected]);

  // Fetch Basename from Base mainnet
  useEffect(() => {
    const fetchBasename = async () => {
      if (address && isConnected) {
        try {
          const name = await getName({ address, chain: base });
          setBasename(name || "");
        } catch (error) {
          console.error("Error fetching Basename:", error);
          setBasename("");
        }
      } else {
        setBasename("");
      }
    };

    fetchBasename();
  }, [address, isConnected]);

  const handleConnect = () => {
    setIsWalletModalOpen(true);
  };

  const handleSwapChains = async () => {
    // Swap the chain IDs
    const newSourceChainId = destinationChainId;
    const newDestinationChainId = sourceChainId;

    setSourceChainId(newSourceChainId);
    setDestinationChainId(newDestinationChainId);

    // Auto-switch to the new source chain if wallet is connected
    if (isConnected && switchChain && chain?.id !== newSourceChainId) {
      try {
        const chainConfig = getChainConfig(newSourceChainId);
        await switchToChain(switchChain, newSourceChainId, chainConfig);
      } catch (error) {
        console.error("Failed to switch chain:", error);
        // If auto-switch fails, user can manually switch in their wallet
      }
    }
  };

  const handleTransfer = () => {
    if (!address || !amount) return;
    executeTransfer(amount, maxFee, address);
  };

  const sourceChain =
    sourceChainId === arcTestnet.id ? arcTestnet : baseSepolia;
  const destinationChain =
    destinationChainId === arcTestnet.id ? arcTestnet : baseSepolia;
  const sourceNetworkName =
    sourceChainId === arcTestnet.id ? "Arc Testnet" : "Base Sepolia";
  const destinationNetworkName =
    destinationChainId === arcTestnet.id ? "Arc Testnet" : "Base Sepolia";

  return (
    <div className="min-h-screen bg-white">
      {/* Wallet Selection Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      <Header
        address={address}
        isConnected={isConnected}
        chain={chain}
        onConnect={handleConnect}
        onDisconnect={disconnect}
        basename={basename}
      />

      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Hero Section */}
        <div className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-900">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
            </span>
            Powered by Circle CCTP
          </div>
          <h1 className="mb-3 text-3xl font-black tracking-tight text-black sm:mb-4 sm:text-5xl lg:text-6xl">
            Bridge USDC
            <span className="block text-blue-600">Arc ↔ Base</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Transfer native USDC between Arc Testnet & Base Sepolia instantly.
            Works in Base Apps & Farcaster with Base Account and Basename
            support. Built by{" "}
            <span className="font-semibold text-blue-600">@lynnthelight</span>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <ProgressSteps currentStep={currentStep} />
        </div>

        {/* Transfer Card */}
        <div className="mb-6 rounded-3xl border border-gray-200 bg-white shadow-lg sm:mb-8">
          <div className="p-6 sm:p-8">
            {/* From Network */}
            <NetworkCard type="From" network={sourceNetworkName} token="USDC" />

            {/* From Address Balance */}
            {isConnected && address && (
              <BalanceDisplay
                address={address}
                chainId={sourceChainId}
                showUSDC={true}
              />
            )}

            {/* Amount Input */}
            <div className="mt-6 flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Amount to Bridge
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  disabled={loading}
                  inputMode="decimal"
                  className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 py-5 pl-5 pr-24 text-3xl font-bold text-gray-900 placeholder:text-gray-300 transition-all focus:border-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gray-900/5 disabled:cursor-not-allowed disabled:opacity-50 sm:text-4xl"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <span className="rounded-lg bg-white px-3 py-1.5 text-base font-semibold text-gray-700 shadow-sm">
                    USDC
                  </span>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="my-8 flex justify-center">
              <button
                onClick={handleSwapChains}
                disabled={loading}
                className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow-md transition-all hover:border-blue-600 hover:shadow-lg hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                title="Swap chains"
              >
                <svg
                  className="h-7 w-7 text-gray-700 transition-all group-hover:text-blue-600 group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 10L12 15L17 10M7 14L12 9L17 14"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* To Network */}
            <NetworkCard
              type="To"
              network={destinationNetworkName}
              token="USDC"
            />

            {/* To Address Balance (same as connected wallet) */}
            {isConnected && address && (
              <BalanceDisplay
                address={address}
                chainId={destinationChainId}
                showUSDC={true}
              />
            )}

            {/* Advanced Settings */}
            <details className="mt-6 border-t border-gray-100 pt-6">
              <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900">
                Advanced Settings
              </summary>
              <div className="mt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Max Fee
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={maxFee}
                      onChange={(e) => setMaxFee(e.target.value)}
                      placeholder="0.0005"
                      min="0"
                      step="0.0001"
                      disabled={loading}
                      inputMode="decimal"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-4 pr-20 text-base font-medium text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/5 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                      USDC
                    </span>
                  </div>
                </div>
              </div>
            </details>

            {/* Transfer Button */}
            <TransferButton
              onClick={handleTransfer}
              disabled={!isConnected || loading || !address || !amount}
              loading={loading}
              status={status}
            />

            {/* Status/Error Display */}
            {(status || error) && (
              <div className="mt-6">
                <StatusBox status={status} error={error} />
              </div>
            )}

            {/* Transaction History */}
            {(txHashes.approve || txHashes.burn || txHashes.mint) && !error && (
              <div className="mt-6">
                <TransactionList txHashes={txHashes} />
              </div>
            )}
          </div>
        </div>

        {/* Add Network Buttons */}
        {isConnected && (
          <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:mb-8 sm:p-6">
            <h3 className="mb-3 text-sm font-semibold text-blue-900">
              Need to add networks to your wallet?
            </h3>
            <div className="flex flex-wrap gap-3">
              <AddNetworkButton chainId={arcTestnet.id} />
              <AddNetworkButton chainId={84532} />
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <InfoCard
            title="How it Works"
            icon={
              <svg
                className="h-5 w-5 text-gray-900 sm:h-6 sm:w-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 16v-4M12 8h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          >
            <ol className="space-y-1.5 text-sm text-gray-600 sm:space-y-2 sm:text-base">
              <li className="leading-relaxed">
                1. Connect via Base Account, Farcaster, MetaMask, or Coinbase
                Wallet
              </li>
              <li className="leading-relaxed">
                2. Your Basename will be displayed if you have one
              </li>
              <li className="leading-relaxed">
                3. Choose Arc Testnet or Base Sepolia as source chain
              </li>
              <li className="leading-relaxed">
                4. Enter USDC amount and bridge with one click
              </li>
              <li className="leading-relaxed">
                5. Circle's CCTP handles instant cross-chain transfer
              </li>
            </ol>
          </InfoCard>

          <InfoCard
            title="Key Features"
            icon={
              <svg
                className="h-5 w-5 text-gray-900 sm:h-6 sm:w-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          >
            <ul className="space-y-1.5 text-sm text-gray-600 sm:space-y-2 sm:text-base">
              <li className="leading-relaxed">
                🔵 Works seamlessly in Base Apps & Farcaster Frames
              </li>
              <li className="leading-relaxed">
                ⚡ Bridge between Arc Testnet & Base Sepolia instantly
              </li>
              <li className="leading-relaxed">
                👤 Base Account & Basename integration built-in
              </li>
              <li className="leading-relaxed">
                💰 Native USDC on Arc (no wrapped tokens)
              </li>
              <li className="leading-relaxed">
                🛡️ Powered by Circle's CCTP protocol
              </li>
              <li className="leading-relaxed">
                🌐 Open source by @lynnthelight 🔵
              </li>
            </ul>
          </InfoCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default App;