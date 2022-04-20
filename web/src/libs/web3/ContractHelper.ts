import { showError } from "@libs/ToastHelpers";
import { contractsStore, web3Store } from "@store/root.store";
import { toJS } from "mobx";

import { Contract } from "web3-eth-contract";

export class ContractHelper {
  public getContractFromJSON(name: string): Contract | undefined {
    try {
      const contract = require(`../../contracts/${name}.json`);

      const { abi, address, network } = contract;

      if (!this.isCorrectContractNetwork(network)) {
        throw new Error(
          `Please, connect to ${network.name} to interact with this Smart Contract`
        );
      }

      const { web3 } = web3Store;

      if (!web3) {
        throw new Error("Web3 is not initialized");
      }

      return new web3.eth.Contract(abi, address);
    } catch (error) {
      showError(error.message);
    }
  }

  public loadContractsToStore(name: string) {
    try {
      const contract = this.getContractFromJSON(name);

      if (!contract) {
        throw new Error(`Failed to load contract ${name}`);
      }

      contractsStore.setContract(name, contract);
    } catch (error) {
      console.error(error);
      showError(error.message);
    }
  }

  public async loadContractsData() {
    console.log("Refreshing contract information...");
    // once everything is connected...

    this.loadContractsToStore("DAIToken");
    this.loadContractsToStore("DappToken");
    this.loadContractsToStore("TokenFarm");

    await contractsStore.loadBalances();

    console.log(toJS(contractsStore));
  }

  private isCorrectContractNetwork(network: any): boolean {
    if (web3Store.network?.id !== network.chainId) {
      return false;
    }
    return true;
  }
}

export const contractHelper = new ContractHelper();
