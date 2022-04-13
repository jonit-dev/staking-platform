import { Web3Store } from "./web3.store";
export class RootStore {
  public web3Store: Web3Store;

  constructor() {
    this.web3Store = new Web3Store(this);
  }
}

export const rootStore = new RootStore();

export const web3Store = rootStore.web3Store;
