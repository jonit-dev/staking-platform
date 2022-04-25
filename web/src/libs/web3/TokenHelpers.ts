import { fromWei } from "web3-utils";

export const ToToken = (amount: number): number =>
  Number(fromWei(String(amount)));
