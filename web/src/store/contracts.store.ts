import { showError } from "@libs/ToastHelpers";
import { ToToken } from "@libs/web3/TokenHelpers";
import { makeAutoObservable, toJS } from "mobx";
import { Contract } from "web3-eth-contract";
import { RootStore } from "./root.store";

export class ContractsStore {
  public DappToken: Contract | null = null;
  public DAIToken: Contract | null = null;
  public TokenFarm: Contract | null = null;

  public balances = {
    DAIToken: 0,
    DappToken: 0,
    staked: 0,
  };

  constructor(public root: RootStore) {
    makeAutoObservable(this);
  }

  public async loadBalances() {
    try {
      this.root.uiStore.setLoading(true);
      const { currentAccount } = this.root.web3Store;

      if (!currentAccount) {
        throw new Error("Failed to load wallet account.");
      }

      const daiBalance = await this.DAIToken?.methods
        .balanceOf(currentAccount)
        .call();

      const dappBalance = await this.DappToken?.methods
        .balanceOf(currentAccount)
        .call();
      const totalStakedOnFarm = await this.TokenFarm?.methods
        .stakingBalance(currentAccount)
        .call();

      this.setBalance("DAIToken", daiBalance);
      this.setBalance("DappToken", dappBalance);
      this.setBalance("staked", ToToken(totalStakedOnFarm));

      console.log(toJS(this.balances));
      this.root.uiStore.setLoading(false);
    } catch (error) {
      console.error(error);
      showError(error.message);
    }
  }

  public setBalance(token: string, balance: number) {
    //@ts-ignore
    this.balances[token] = Number(balance);
  }

  public setContract(token: string, contract: Contract) {
    //@ts-ignore
    return (this[token] = contract);
  }
}
