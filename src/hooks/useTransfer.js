import { useState } from "react";
import { baseSepolia } from "viem/chains";
import { BridgeKit } from "@circle-fin/bridge-kit";
import { createAdapterFromProvider } from "@circle-fin/adapter-viem-v2";
import { arcTestnet } from "../utils/constants";
import { switchToChain, getChainConfig } from "../utils/addNetwork";

export const useTransfer = (
  walletClient,
  arcTestnetPublicClient,
  baseSepoliaPublicClient,
  switchChain,
  chain,
  sourceChainId,
  destinationChainId
) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [txHashes, setTxHashes] = useState({ approve: "", burn: "", mint: "" });

  // Initialize BridgeKit
  const kit = new BridgeKit();

  const executeTransfer = async (amount, maxFee, destinationAddress) => {
    try {
      setLoading(true);
      setError("");
      setStatus("Initializing transfer...");

      // Ensure we're on the source chain
      if (chain?.id !== sourceChainId) {
        setStatus("Switching to source chain...");
        const chainConfig = getChainConfig(sourceChainId);
        await switchToChain(switchChain, sourceChainId, chainConfig);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const adapter = await createAdapterFromProvider({
        provider: window.ethereum,
      });
      // Determine chain names for BridgeKit
      const sourceChainName =
        sourceChainId === arcTestnet.id ? "Arc_Testnet" : "Base_Sepolia";
      const destinationChainName =
        destinationChainId === arcTestnet.id ? "Arc_Testnet" : "Base_Sepolia";

      setStatus(
        `Bridging ${amount} USDC from ${sourceChainName} to ${destinationChainName}...`
      );

      // Execute bridge using BridgeKit
      console.log({
        from: { adapter, chain: sourceChainName },
        to: { adapter, chain: destinationChainName },
        amount: amount,
      });

      const result = await kit.bridge({
        from: { adapter, chain: sourceChainName },
        to: { adapter, chain: destinationChainName },
        amount: amount,
      });

      // Extract transaction hashes from result
      if (result?.approvalTxHash) {
        setTxHashes((prev) => ({ ...prev, approve: result.approvalTxHash }));
        setStatus("✓ USDC Approved!");
      }

      if (result?.burnTxHash) {
        setTxHashes((prev) => ({ ...prev, burn: result.burnTxHash }));
        setStatus("✓ USDC Burned!");
      }

      if (result?.mintTxHash) {
        setTxHashes((prev) => ({ ...prev, mint: result.mintTxHash }));
        setStatus("✓ USDC Minted!");
      }

      setStatus("✅ Transfer completed successfully!");
      setLoading(false);
    } catch (err) {
      console.error("Transfer failed:", err);
      const message = err.message || "Transfer failed";
      setError(message);
      setLoading(false);
    }
  };

  return {
    status,
    loading,
    error,
    txHashes,
    executeTransfer,
  };
};
