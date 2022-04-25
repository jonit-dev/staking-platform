import { contractsStore, uiStore, web3Store } from "@store/root.store";
import { Contract } from "web3-eth-contract";
import { showError, showMessage } from "./ToastHelpers";

export const stakeTokens = async (
  DAIToken: Contract,
  TokenFarm: Contract,
  amount: number
) => {
  uiStore.setLoading(true);

  try {
    if (contractsStore.balances.DAIToken === 0) {
      throw new Error("You have no DAI to stake!");
    }

    //@ts-ignore
    const tokenFarmAddress = TokenFarm._address;

    console.log(web3Store.currentAccount);

    await DAIToken.methods
      .approve(tokenFarmAddress, amount)
      .send({ from: web3Store.currentAccount })
      .on("transactionHash", async (hash: string) => {
        await TokenFarm.methods
          .stakeTokens(amount)
          .send({ from: web3Store.currentAccount })
          .on("transactionHash", async (hash: string) => {
            showMessage(`${amount} tokens staked successfully!`, "success");

            console.log("Staked! Refreshing balances....");

            await contractsStore.loadBalances();
          });
      });
  } catch (error) {
    showError(error.message);
  }
  uiStore.setLoading(false);
};

export const unStakeTokens = async (
  DAIToken: Contract,
  TokenFarm: Contract,
  amount: number
) => {
  uiStore.setLoading(true);
  try {
    await TokenFarm.methods
      .unstakeTokens(amount)
      .send({ from: web3Store.currentAccount })
      .on("transactionHash", async (hash: string) => {
        showMessage("Successfully unstaked DAI tokens", "success");

        await contractsStore.loadBalances();
      });
  } catch (error) {
    showError(error.message);
  }
  uiStore.setLoading(false);
};
