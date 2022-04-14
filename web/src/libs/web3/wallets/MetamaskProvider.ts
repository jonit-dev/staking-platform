import { appEnv } from "@constants/appEnv";
import { showError, showMessage } from "@libs/ToastHelpers";
import { web3Store } from "@store/root.store";
import { Web3Status } from "@store/web3.store";
import { networkHelper } from "../NetworkHelper";
import { IWalletProvider } from "./WalletProvider";

class MetamaskProvider implements IWalletProvider {
  public isInstalled() {
    if (window.ethereum && window.ethereum.isMetaMask) {
      web3Store.initializeMetamask();
      return true;
    }

    return false;
  }

  public async isCorrectNetwork(): Promise<boolean | undefined> {
    if (this.isInstalled()) {
      const requiredNetwork = appEnv.web3.network.id;

      const currentNetwork = await networkHelper.getNetworkId();

      return requiredNetwork === currentNetwork;
    }
  }

  public async getAccounts(): Promise<string[] | undefined> {
    if (this.isInstalled()) {
      const { web3 } = web3Store;
      const accounts = await web3?.eth.getAccounts();
      return accounts;
    }
  }

  public async isConnected() {
    if (this.isInstalled()) {
      const { web3 } = web3Store;

      const accounts = await web3?.eth.getAccounts();

      if (accounts!.length > 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  public async connect() {
    try {
      web3Store.setStatus(Web3Status.Loading);
      if (this.isInstalled()) {
        const { ethereum } = window;

        const accounts = (await ethereum.request({
          method: "eth_requestAccounts",
        })) as string[];

        if (!accounts) {
          throw new Error(
            "Oops! Failed to load your Metamask accounts. Please, try again."
          );
        }

        const networkName = await networkHelper.getNetworkName();
        const networkId = await networkHelper.getNetworkId();

        web3Store.setNetwork(networkId, networkName);

        web3Store.setStatus(Web3Status.Connected);

        web3Store.setCurrentAccount(accounts[0]);
        showMessage("You've successfully connected with Metamask.", "success");
      } else {
        throw new Error(
          "Error: you must have MetaMask installed to use this dApp."
        );
      }
    } catch (error) {
      web3Store.setStatus(Web3Status.Disconnected);
      console.error(error);

      if (error.message.includes("User rejected the request.")) {
        showError("Please, authorize Metamask to proceed.");
        return;
      }

      showError(error.message);
    }
  }

  public async disconnect() {
    showMessage(
      "Please disconnect directly through your Metamask wallet.",
      "warning"
    );
  }
}

export const metamask = new MetamaskProvider();
