import { isBrowser } from "@libs/WindowHelper";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
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

export class Web3Store {
  public web3: Web3 | null = null;
  public accounts: string[] | null = null;
  public currentAccount: string | null = null;
  public status: Web3Status = Web3Status.Disconnected;
  public network: INetwork | null = null;
  public hasMetamask: boolean = false;

  constructor(public root: RootStore) {
    makeAutoObservable(this);

    makePersistable(this, {
      name: this.constructor.name,
      properties: ["status"],
      storage: isBrowser() ? window.localStorage : undefined,
    });
  }

  public initializeMetamask() {
    this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
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
