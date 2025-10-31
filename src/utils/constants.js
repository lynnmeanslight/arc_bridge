// Arc Testnet Chain Definition
// Arc Testnet Chain Definition
export const arcTestnet = {
  id: 5042002,
  name: "Arc Testnet",
  network: "arc-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "USDC",
    symbol: "USDC",
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.arc.network"] },
    public: { http: ["https://rpc.testnet.arc.network"] },
  },
  blockExplorers: {
    default: { name: "Arc Explorer", url: "https://testnet.arcscan.app" },
  },
  testnet: true,
};

// Contract addresses and domains
export const CONTRACTS = {
  ARC_TESTNET_USDC: "0x3600000000000000000000000000000000000000",
  BASE_SEPOLIA_USDC: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
};

export const DOMAINS = {
  ARC_TESTNET: 7,
  BASE_SEPOLIA: 6,
};

// Default transfer values
export const DEFAULTS = {
  AMOUNT: "1",
  MAX_FEE: "0.0005",
  MAX_ALLOWANCE: "10000",
  MIN_FINALITY_THRESHOLD: 1000,
};

// API endpoints
export const API = {
  ATTESTATION_BASE_URL: "https://iris-api-sandbox.circle.com/v2/messages",
};

// Transfer steps
export const STEPS = [
  "Connect Wallet",
  "Enter Amount",
  "Bridge Transfer",
  "Complete",
];
