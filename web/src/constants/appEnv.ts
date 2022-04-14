export const appEnv = {
  web3: {
    infuraUrl: process.env.NEXT_PUBLIC_INFURA_URL!,
    currency: {
      name: process.env.NEXT_PUBLIC_APP_NETWORK_CHAIN_NATIVE_CURRENCY_NAME!,
      symbol: process.env.NEXT_PUBLIC_APP_NETWORK_CHAIN_NATIVE_CURRENCY_SYMBOL!,
      decimals: Number(
        process.env.NEXT_PUBLIC_APP_NETWORK_CHAIN_NATIVE_CURRENCY_DECIMALS!
      ),
    },
    network: {
      name: process.env.NEXT_PUBLIC_APP_NETWORK_CHAIN_NAME!,
      chainId: Number(process.env.NEXT_PUBLIC_APP_NETWORK_CHAIN_ID!),
      rpcUrls: process.env.NEXT_PUBLIC_APP_NETWORK_CHAIN_RPC_URLS!.split(","),
      explorerUrls:
        process.env.NEXT_PUBLIC_APP_NETWORK_CHAIN_BLOCK_EXPLORER_URLS!.split(
          ","
        ),
    },
  },
};
