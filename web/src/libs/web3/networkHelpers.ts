import { web3Networks } from "@constants/web3";

export const getNetworkName = async () => {
  const { web3 } = window;
  const networkId = await getNetworkId();
  return web3Networks[networkId] || (await web3.eth.net.getNetworkType());
};

export const getNetworkId = async () => {
  const { web3 } = window;

  return await web3.eth.net.getId();
};
