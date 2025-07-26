import { mainnet, sepolia } from "wagmi/chains";
import { defineChain } from "viem";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const holesky = defineChain({
  id: 17000,
  name: "Holesky",
  nativeCurrency: { name: "Holesky Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/eth_holesky"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://holesky.etherscan.io",
      apiUrl: "https://api-holesky.etherscan.io/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 77,
    },
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      blockCreated: 801613,
    },
    ensUniversalResolver: {
      address: "0xa6AC935D4971E3CD133b950aE053bECD16fE7f3b",
      blockCreated: 973484,
    },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: "My Token App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, sepolia, holesky],
  ssr: true,
});
