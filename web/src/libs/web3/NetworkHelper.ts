import { appEnv } from "@constants/appEnv";
import { web3Networks } from "@constants/web3";
import { showError, showMessage } from "@libs/ToastHelpers";
import { web3Store } from "@store/root.store";
import { toHex } from "web3-utils";
import { metamask } from "./wallets/MetamaskProvider";

class NetworkHelper {
  public async getNetworkName(): Promise<string | undefined> {
    const { web3 } = web3Store;
    const networkId = await this.getNetworkId();
    if (networkId) {
      return (await web3?.eth.net.getNetworkType()) || web3Networks[networkId];
    }
  }

  public async getNetworkId(): Promise<number | undefined> {
    const { web3 } = web3Store;

    return await web3?.eth.net.getId();
  }

  public async refreshNetworkInfo(): Promise<void> {
    const networkName = await networkHelper.getNetworkName();
    const networkId = await networkHelper.getNetworkId();

    if (!networkId || !networkName) {
      showError("Failed to fetch network information!");
      return;
    }

    web3Store.setNetwork(networkId, networkName);
  }

  public async addNetwork() {
    try {
      const hexChainId = toHex(appEnv.web3.network.chainId);

      const payload = {
        chainId: hexChainId,
        chainName: appEnv.web3.network.name,
        rpcUrls: appEnv.web3.network.rpcUrls,
        blockExplorerUrls: appEnv.web3.network.explorerUrls,
        nativeCurrency: {
          symbol: appEnv.web3.currency.symbol,
          decimals: appEnv.web3.currency.decimals,
        },
      };

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [payload],
      });
    } catch (error) {
      console.error(error);
      showError(
        `Failed to add network ${appEnv.web3.network.name}. Please try adding it manually.`
      );
    }
  }

  public async isCorrectNetwork(): Promise<boolean | undefined> {
    if (metamask.isInstalled()) {
      const requiredNetwork = appEnv.web3.network.chainId;

      const currentNetwork = await networkHelper.getNetworkId();

      return requiredNetwork === currentNetwork;
    }
  }

  public async networkSwitch() {
    if (metamask.isInstalled()) {
      try {
        const { web3 } = web3Store;

        if (!web3) {
          showError("Web3 is not initialized!");
          return;
        }

        const hexChainId = toHex(appEnv.web3.network.chainId);

        //@ts-ignore
        await web3.currentProvider!.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: hexChainId }],
        });

        await this.refreshNetworkInfo();

        if (await this.isCorrectNetwork()) {
          showMessage(
            `You've successfully switched to ${appEnv.web3.network.name} network.`,
            "success"
          );
        } else {
          showError(
            "Failed to switch to the correct network. Please try switching manually."
          );
        }

        console.log(await web3.eth.net.getNetworkType());
      } catch (switchError) {
        console.log(switchError);
        // The network has not been added to MetaMask
        if (switchError.code === 4902) {
          await this.addNetwork();

          return;
        }
        showError("Cannot switch to the network");
      }
    }
  }
}

export const networkHelper = new NetworkHelper();
