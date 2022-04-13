import { makeAutoObservable } from "mobx";
import { RootStore } from "./root.store";

export class Web3Store {
  private account: string | null = null;

  public setAccount = (account: string | null) => {
    this.account = account;
  };

  public getAccount() {
    return this.account;
  }

  constructor(public root: RootStore) {
    makeAutoObservable(this);
  }
}
