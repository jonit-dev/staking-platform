import { showError } from "@libs/ToastHelpers";
import { contractsStore, web3Store } from "@store/root.store";
import { Web3Status } from "@store/web3.store";
import { toJS } from "mobx";
import Web3 from "web3";
import { provider } from "web3-core";
import { getContract } from "./contractHelpers";
import { getNetworkId, getNetworkName } from "./networkHelpers";

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

const loadContracts = (name: string) => {
  try {
    const contract = getContract(name);

    if (!contract) {
      throw new Error(`Failed to load contract ${name}`);
    }

    contractsStore.setContract(name, contract);
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
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

    // once everything is connected...

    web3Store.setAccounts(accounts);
    web3Store.setCurrentAccount(ethereum.selectedAddress || accounts[0]);
    web3Store.setStatus(Web3Status.Connected);
    const networkId = await getNetworkId();
    const networkName = await getNetworkName();
    web3Store.setNetwork(networkId, networkName);

    loadContracts("DAIToken");
    loadContracts("DappToken");
    loadContracts("TokenFarm");
    console.log(toJS(contractsStore));
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
