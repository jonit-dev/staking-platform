import { web3Store } from "@store/root.store";
import { Web3Status } from "@store/web3.store";
import Web3 from "web3";
import { provider } from "web3-core";
import { showError } from "./ToastHelpers";

export const disconnectWallet = async () => {
  web3Store.setStatus(Web3Status.Disconnected);
};

export const isMetamaskConnected = () => {
  const { ethereum } = window;

  if (!ethereum) {
    showError("Please, install Metamask before!");
    return;
  }

  const isMetamaskConnected = ethereum.selectedAddress === null ? false : true;

  if (isMetamaskConnected) {
    web3Store.setStatus(Web3Status.Connected);
  } else {
    web3Store.setStatus(Web3Status.Disconnected);
  }

  return isMetamaskConnected;
};

export const isMetamaskInstalled = () => {
  if (window.ethereum && window.ethereum.isMetaMask) {
    return true;
  }
  return false;
};

export const connectToWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      showError("Please, install Metamask before!");
      return;
    }

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum as provider);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }

    web3Store.setStatus(Web3Status.Loading);

    const accounts = (await ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    if (!accounts) {
      showError(
        "Oops! Failed to load your Metamask accounts. Please, try again."
      );
      return;
    }

    web3Store.setAccounts(accounts);
    web3Store.setCurrentAccount(ethereum.selectedAddress || accounts[0]);
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
};
