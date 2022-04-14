export const appEnv = {
  web3: {
    infuraUrl: process.env.NEXT_PUBLIC_INFURA_URL!,
    network: {
      name: process.env.NEXT_PUBLIC_APP_NETWORK_NAME!,
      id: Number(process.env.NEXT_PUBLIC_APP_NETWORK_ID!),
    },
  },
};
