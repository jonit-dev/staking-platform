export class TokensStore {
  public dappToken = null;
  public daiToken = null;
  public tokenFarm = null;

  public balances = {
    daiToken: 0,
    dappToken: 0,
    staking: 0,
  };

  public setBalance(token: string, balance: number) {
    //@ts-ignore
    this.balances[token] = balance;
  }
}
