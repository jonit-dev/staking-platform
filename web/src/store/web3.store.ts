import { isBrowser } from "@libs/WindowHelper";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { RootStore } from "./root.store";

export enum Web3Status {
  Disconnected = "Disconnected",
  Loading = "Loading",
  Connected = "Connected",
}

export class Web3Store {
  public accounts: string[] | null = null;
  public currentAccount: string | null = null;
  public status: Web3Status = Web3Status.Loading;

  constructor(public root: RootStore) {
    makeAutoObservable(this);

    makePersistable(this, {
      name: this.constructor.name,
      properties: ["status"],
      storage: isBrowser() ? window.localStorage : undefined,
    });
  }

  public setAccounts = (accounts: string[] | null) => {
    this.accounts = accounts;
  };

  public setCurrentAccount = (account: string) => {
    this.currentAccount = account;
  };

  public setStatus(status: Web3Status) {
    this.status = status;
  }
}
