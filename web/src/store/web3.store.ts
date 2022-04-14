import { networkHelper } from "@libs/web3/NetworkHelper";
import { metamask } from "@libs/web3/wallets/MetamaskProvider";
import { makeAutoObservable } from "mobx";
import Web3 from "web3";
import { RootStore } from "./root.store";

export enum Web3Status {
  Disconnected = "Disconnected",
  Loading = "Loading",
  Connected = "Connected",
}

export interface INetwork {
  id: number;
  name: string;
}

export enum NetworkConnectionStatus {
  CorrectNetwork,
  WrongNetwork,
}

export class Web3Store {
  public web3: Web3 | null = null;
  public accounts: string[] | null = null;
  public currentAccount: string | null = null;
  public status: Web3Status = Web3Status.Loading;
  public network: INetwork | null = null;
  public networkConnectionStatus: NetworkConnectionStatus | null = null;
  public hasMetamask: boolean = false;

  constructor(public root: RootStore) {
    makeAutoObservable(this);
  }

  public async initializeMetamask() {
    this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    await networkHelper.refreshNetworkInfo();
    await metamask.refreshAccounts();
  }

  public setNetworkConnectionStatus(status: NetworkConnectionStatus) {
    this.networkConnectionStatus = status;
  }

  public setAccounts = (accounts: string[] | null) => {
    this.accounts = accounts;
  };

  public setCurrentAccount = (account: string) => {
    this.currentAccount = account;
  };

  public clear() {
    this.accounts = null;
    this.currentAccount = null;
    this.status = Web3Status.Disconnected;
    this.network = null;
  }

  public setStatus(status: Web3Status) {
    if (status === Web3Status.Disconnected) {
      this.clear();
    }

    this.status = status;
  }

  public setNetwork(id: number, name: string) {
    this.network = {
      id,
      name,
    };
  }
}
