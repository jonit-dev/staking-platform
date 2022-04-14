import { web3Networks } from "@constants/web3";
import { web3Store } from "@store/root.store";

class NetworkHelper {
  public async getNetworkName(): Promise<string> {
    const { web3 } = web3Store;
    const networkId = await this.getNetworkId();
    return web3Networks[networkId] || (await web3.eth.net.getNetworkType());
  }

  public async getNetworkId(): Promise<number> {
    const { web3 } = web3Store;

    return await web3.eth.net.getId();
  }
}

export const networkHelper = new NetworkHelper();
