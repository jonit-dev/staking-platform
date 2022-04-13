import { makeAutoObservable } from "mobx";
import { Contract } from "web3-eth-contract";
import { RootStore } from "./root.store";

export class ContractsStore {
  public Dapptoken: Contract | null = null;
  public DAIToken: Contract | null = null;
  public TokenFarm: Contract | null = null;

  public balances = {
    daiToken: 0,
    dappToken: 0,
    staking: 0,
  };

  constructor(public root: RootStore) {
    makeAutoObservable(this);
  }

  public setBalance(token: string, balance: number) {
    //@ts-ignore
    this.balances[token] = balance;
  }

  public setContract(token: string, contract: Contract) {
    //@ts-ignore
    return (this[token] = contract);
  }
}
