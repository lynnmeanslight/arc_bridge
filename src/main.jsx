import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected, coinbaseWallet } from 'wagmi/connectors';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';
import { baseAccount } from 'wagmi/connectors';
import App from './App.jsx';
import './index.css';
import { arcTestnet } from './utils/constants';

// Configure Wagmi with multiple wallet options
const config = createConfig({
  chains: [arcTestnet, baseSepolia],
  transports: {
    [arcTestnet.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors: [
    // Farcaster MiniApp (for Farcaster users)
    farcasterMiniApp(),

    // Coinbase Wallet
    coinbaseWallet({
      appName: 'AungGabarSoe',
      preference: 'all', // tries both extension and web/mobile SDK
    }),

    // Base Account (Smart Wallet)
    baseAccount({
      appName: 'AungGabarSoe',
      appLogoUrl: '/icon.png',
    }),
  ],
});

// Create React Query client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
