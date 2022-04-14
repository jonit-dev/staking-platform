import { showError, showMessage } from "@libs/ToastHelpers";
import { isBrowser } from "@libs/WindowHelper";
import { web3Store } from "@store/root.store";
import { Web3Status } from "@store/web3.store";
import { networkHelper } from "../NetworkHelper";
import { IWalletProvider } from "./WalletProvider";

class MetamaskProvider implements IWalletProvider {
  public isInstalled() {
    if (isBrowser()) {
      if (window.ethereum && window.ethereum.isMetaMask) {
        return true;
      }
    }

    return false;
  }

  public async getAccounts(): Promise<string[] | undefined> {
    if (this.isInstalled()) {
      const { web3 } = web3Store;
      const accounts = await web3?.eth.getAccounts();
      return accounts;
    }
  }

  public async refreshAccounts(): Promise<void> {
    const accounts = await this.getAccounts();
    if (accounts && accounts.length > 0) {
      web3Store.setAccounts(accounts);
      web3Store.setCurrentAccount(accounts[0]);
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

  public async updateConnectionStatus() {
    const accounts = await metamask.getAccounts();

    if (!accounts) {
      return;
    }

    if (accounts && accounts.length > 0) {
      web3Store.setStatus(Web3Status.Connected);
    } else {
      web3Store.setStatus(Web3Status.Disconnected);
    }

    await this.refreshAccounts();
    await networkHelper.refreshNetworkInfo();
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

        await networkHelper.refreshNetworkInfo();

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
