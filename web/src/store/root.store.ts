import { UIStore } from "./ui.store";
import { Web3Store } from "./web3.store";
export class RootStore {
  public web3Store: Web3Store;
  public uiStore: UIStore;

  constructor() {
    this.web3Store = new Web3Store(this);
    this.uiStore = new UIStore(this);
  }
}

export const rootStore = new RootStore();

export const web3Store = rootStore.web3Store;
export const uiStore = rootStore.uiStore;
