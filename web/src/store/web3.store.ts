import { makeAutoObservable } from "mobx";
import { RootStore } from "./root.store";

export enum Web3Status {
  NotLoaded = "NotLoaded",
  Loading = "Loading",
  Connected = "Connected",
}

export class Web3Store {
  private account: string | null = null;
  private status: Web3Status = Web3Status.NotLoaded;

  public setAccount = (account: string | null) => {
    this.account = account;
  };

  public setStatus(status: Web3Status) {
    this.status = status;
  }

  public get currentStatus() {
    return this.status;
  }

  constructor(public root: RootStore) {
    makeAutoObservable(this);
  }
}
