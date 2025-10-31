# Arc ↔️ Base Bridge - USDC Transfer DApp

A minimalist React DApp for transferring USDC between **Arc Testnet** and **Base Sepolia** using Circle's Cross-Chain Transfer Protocol (CCTP). Features **Base Account** and **Basename** integration, works seamlessly in **Base Apps** and **Farcaster**.

## Features

🔵 **Base Ecosystem Integration**
- **Base Account** smart wallet support
- **Basename** display (shows your .base name)
- Works in **Base Apps** and **Farcaster Frames**
- Farcaster MiniApp connector included

✨ **Clean UI/UX Design**
- Minimalist black, white, and blue color scheme
- Smooth animations and transitions
- Fully responsive design
- Real-time progress tracking

🌉 **Cross-Chain Transfer**
- Bridge between **Arc Testnet** ↔️ **Base Sepolia**
- **Native USDC** on Arc Testnet (no wrapped tokens)
- Instant transfers with Circle's CCTP
- Automatic network addition to wallet

🔐 **Multiple Wallet Options**
- Base Account (Smart Wallet)
- Farcaster MiniApp
- MetaMask
- Coinbase Wallet
- Auto-detection and network switching

## How It Works

1. **Connect Wallet** - Use Base Account, Farcaster, MetaMask, or Coinbase Wallet
2. **Basename Display** - If you have a Basename, it's automatically displayed
3. **Select Chain** - Choose Arc Testnet or Base Sepolia as source
4. **Enter Amount** - Input USDC amount to bridge
5. **Bridge** - Circle's CCTP handles the entire cross-chain transfer
6. **Done** - Receive native USDC on destination chain instantly

### Arc Testnet Special Features
- **USDC is the native token** on Arc Testnet (no ETH needed for gas!)
- Balance display optimized to show only USDC
- Automatic network addition if not in wallet

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Wagmi 2.12** - React hooks for Ethereum
- **Viem 2.38** - TypeScript interface for Ethereum
- **TanStack Query** - Async state management
- **Circle BridgeKit** - Official CCTP SDK
- **OnchainKit** - Base identity (Basename)
- **Farcaster MiniApp SDK** - Farcaster integration
- **Tailwind CSS** - Utility-first styling

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- MetaMask browser extension
- Sepolia ETH for gas fees
- Testnet USDC on Ethereum Sepolia

### Installation

1. Clone the repository:
```bash
cd arc_to_base_dapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000` and connect your MetaMask wallet

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Configuration

The DApp is pre-configured for **Arc Testnet ↔️ Base Sepolia** transfers:

### Arc Testnet
- **Chain ID**: 5042002 (0x4cef52)
- **RPC**: https://rpc.testnet.arc.network
- **Explorer**: https://testnet.arcscan.app
- **USDC** (Native): `0x3600000000000000000000000000000000000000`
- **CCTP Domain**: 7

### Base Sepolia
- **Chain ID**: 84532
- **RPC**: https://sepolia.base.org
- **Explorer**: https://sepolia.basescan.org
- **USDC**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- **CCTP Domain**: 6

Networks are **automatically added to your wallet** when needed!

## Getting Test Tokens

### Arc Testnet
- USDC is the **native token** - no separate faucet needed!
- Get Arc Testnet USDC from [Arc Faucet](https://faucet.arc.network)

### Base Sepolia
- **Base Sepolia ETH**: [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
- **USDC**: Bridge from Arc or use [Circle Faucet](https://faucet.circle.com/)

### Basename (Optional)
- Register your .base name on Base mainnet
- Visit [Basename Registration](https://www.base.org/names)

## Project Structure

```
arc_to_base_dapp/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.jsx        # Entry point with providers
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Key Features Explained

### Base Account Integration
- Create a smart wallet directly in the app
- No seed phrases needed
- Gasless transactions support
- Works across all Base apps

### Basename Display
- Shows your .base name instead of address
- Fetched from Base mainnet automatically
- Blue highlight for easy recognition
- Falls back to truncated address

### Farcaster Compatible
- Works as a Farcaster Frame
- Farcaster MiniApp connector included
- Use directly in Warpcast
- Share bridge links in casts

### Auto Network Addition
- Arc Testnet and Base Sepolia added automatically
- No manual RPC configuration needed
- One-click network switching
- Manual add buttons available

### Smart Balance Display
- Arc Testnet: Shows only USDC (native token)
- Base Sepolia: Shows ETH + USDC
- Real-time balance updates
- One-click refresh button

### BridgeKit Integration
- Official Circle CCTP SDK
- Simplified bridging flow
- Automatic attestation handling
- Progress tracking built-in

## Resources

### Documentation
- [Circle CCTP Documentation](https://developers.circle.com/stablecoins/docs/cctp-getting-started)
- [Circle BridgeKit SDK](https://github.com/circlefin/bridge-kit)
- [Base Documentation](https://docs.base.org/)
- [Base Account Guide](https://docs.base.org/base-account)
- [Basename Guide](https://docs.base.org/base-names)
- [Farcaster Frames](https://docs.farcaster.xyz/developers/frames)

### Tools & Libraries
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [OnchainKit](https://onchainkit.xyz/)
- [Farcaster MiniApp SDK](https://github.com/farcasterxyz/miniapp-wagmi-connector)

### Networks
- [Arc Network](https://arc.network)
- [Base Network](https://base.org)
- [Arc Testnet Explorer](https://testnet.arcscan.app)
- [Base Sepolia Explorer](https://sepolia.basescan.org)

## Deployment

### Base Apps
Deploy to Base with Vercel, Netlify, or any static host. The app automatically detects Base App environment.

### Farcaster Frames
Add frame metadata (already included) and deploy. Test with [Frame Validator](https://warpcast.com/~/developers/frames).

## License

MIT License - Open source and free to use!

## Support

Built by **@lynnthelight** for **@ARC_Devs** 🔵

For issues or questions:
- Check [Arc Network Documentation](https://docs.arc.network)
- Review transactions on block explorers
- Join [Arc Discord](https://discord.gg/arc)

---

Built with 🔵 for the Base and Arc ecosystems
