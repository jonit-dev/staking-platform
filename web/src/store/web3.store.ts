import { isBrowser } from "@libs/WindowHelper";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
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
  public accounts: string[] | null = null;
  public currentAccount: string | null = null;
  public status: Web3Status = Web3Status.Disconnected;
  public network: INetwork | null = null;

  constructor(public root: RootStore) {
    makeAutoObservable(this);

    makePersistable(this, {
      name: this.constructor.name,
      properties: ["status", "currentAccount", "network"],
      storage: isBrowser() ? window.localStorage : undefined,
    });
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
