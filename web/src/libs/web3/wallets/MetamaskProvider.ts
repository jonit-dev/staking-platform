import { appEnv } from "@constants/appEnv";
import { showError } from "@libs/ToastHelpers";
import { web3Store } from "@store/root.store";
import { Web3Status } from "@store/web3.store";
import { networkHelper } from "../NetworkHelper";
import { IWalletProvider } from "./WalletProvider";

class MetamaskProvider implements IWalletProvider {
  public isInstalled() {
    if (window.ethereum && window.ethereum.isMetaMask) {
      return true;
    }

    return false;
  }

  public async isCorrectNetwork(): Promise<boolean> {
    const requiredNetwork = appEnv.web3.network.id;

    const currentNetwork = await networkHelper.getNetworkId();

    return requiredNetwork === currentNetwork;
  }

  public async isConnected() {
    if (this.isInstalled()) {
      const { web3 } = web3Store;

      web3Store.setStatus(Web3Status.Loading);

      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        console.log(accounts);
        web3Store.setCurrentAccount(accounts[0]);
        const networkId = await networkHelper.getNetworkId();
        const networkName = await networkHelper.getNetworkName();
        web3Store.setNetwork(networkId, networkName);
        web3Store.setStatus(Web3Status.Connected);
        return true;
      }

      web3Store.setStatus(Web3Status.Disconnected);
      return false;
    }
    return false;
  }

  public async connect() {
    try {
      const { web3 } = web3Store;

      web3Store.setStatus(Web3Status.Loading);

      const accounts = await web3.eth.getAccounts();

      if (!accounts) {
        showError(
          "Oops! Failed to load your Metamask accounts. Please, try again."
        );
        return;
      }

      const updatedAccount = accounts[0];

      if (web3Store.currentAccount !== updatedAccount) {
        web3Store.setCurrentAccount(updatedAccount);
      }
      web3Store.setStatus(Web3Status.Connected);
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
    web3Store.setStatus(Web3Status.Disconnected);
  }
}

export const metamask = new MetamaskProvider();
