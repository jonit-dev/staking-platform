import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deployContract } from "../helpers/deployHelpers";
import { ToToken } from "../helpers/utilsHelper";
import { DAIToken, DappToken, TokenFarm } from "../typechain";

describe("TokenFarm.sol", function () {
  let tokenFarm: TokenFarm;
  let daiToken: DAIToken;
  let dappToken: DappToken;
  let tokenFarmManager: SignerWithAddress;
  let investor: SignerWithAddress;
  let another: SignerWithAddress;

  before(async () => {
    const accounts = await ethers.getSigners();
    tokenFarmManager = accounts[0];
    investor = accounts[1];
    another = accounts[2];

    daiToken = await deployContract<DAIToken>("DAIToken");
    dappToken = await deployContract<DappToken>("DappToken");
    tokenFarm = await deployContract<TokenFarm>("TokenFarm", {
      args: [dappToken.address, daiToken.address],
    });

    const daiWei = ToToken("100");

    await daiToken.transfer(investor.address, daiWei, {
      from: accounts[0].address,
    });

    // provide liquidity to our token farm
    await dappToken.transfer(tokenFarm.address, await dappToken.totalSupply());

    console.log(`transfering 100 mock DAI to address ${investor.address}`);
  });

  it(`investor should have a DAI balance of ${ToToken("100")}`, async () => {
    const balance = await daiToken.balanceOf(investor.address);

    expect(balance).to.equal("100000000000000000000");
  });

  it("TokenFarm should have both daiToken and dappToken addresses", async () => {
    const daiTokenAddress = await tokenFarm.daiToken();
    const dappTokenAddress = await tokenFarm.dappToken();

    expect(daiTokenAddress).to.equal(daiToken.address);
    expect(dappTokenAddress).to.equal(dappToken.address);
  });

  it("DappToken should have a balance of 1M for TokenFarm", async () => {
    const balance = await dappToken.balanceOf(tokenFarm.address);

    expect(balance).to.equal(ToToken("1000000"));
  });

  it("should properly stakeTokens()", async () => {
    const balanceBefore = await daiToken.balanceOf(investor.address);
    expect(balanceBefore).to.equal(ToToken("100"));

    // stakeTokens has a .transferFrom method, which requires approval before running! Otherwise it will throw a revert error.

    await daiToken.connect(investor).approve(tokenFarm.address, ToToken("100"));

    await expect(tokenFarm.connect(investor).stakeTokens(ToToken("100"))).to.emit(tokenFarm, "StakeToken");

    const balanceAfter = await daiToken.balanceOf(investor.address);
    expect(balanceAfter).to.equal(ToToken("0"));

    const stakingBalance = await tokenFarm.stakingBalance(investor.address);
    expect(stakingBalance).to.equal(ToToken("100"));

    const isStaking = await tokenFarm.isStaking(investor.address);
    expect(isStaking).to.equal(true);
    const hasStaked = await tokenFarm.hasStaked(investor.address);
    expect(hasStaked).to.equal(true);

    const staker = await tokenFarm.stakers(0);
    expect(staker).to.be.equal(investor.address);
  });

  it("avoid users from staking if amount is <= than 0", async () => {
    await daiToken.connect(investor).approve(tokenFarm.address, ToToken("100"));

    await expect(tokenFarm.connect(investor).stakeTokens(ToToken("0"))).to.be.revertedWith(
      "Amount must be greater than 0"
    );
  });

  it("should have the owner as tokenFarmManager", async () => {
    const owner = await tokenFarm.owner();
    expect(owner).to.equal(tokenFarmManager.address);
  });

  it("should only trigger issueTokens() if msg.sender is the manager", async () => {
    await expect(tokenFarm.connect(investor).issueTokens()).to.be.revertedWith("Ownable: caller is not the owner'");
    // another way to do this: .should.be.rejected
  });

  it("should properly issueTokens()", async () => {
    await tokenFarm.connect(tokenFarmManager).issueTokens();

    const recipientBalance = await dappToken.balanceOf(investor.address);

    expect(recipientBalance).to.equal(ToToken("100"));

    // expect IssueToken event
  });

  it("should properly emit IssueToken event", async () => {
    await expect(tokenFarm.connect(tokenFarmManager).issueTokens()).to.emit(tokenFarm, "IssueToken");
  });

  it("should get the staked tokens balance", async () => {
    const stakedBalance = await tokenFarm.connect(investor).getOwnStakedTokensBalance();

    expect(stakedBalance).to.equal(ToToken("100"));
  });

  it("should revert transaction if unstake amount is zero", async () => {
    await expect(tokenFarm.connect(investor).unstakeTokens(ToToken("0"))).to.be.revertedWith(
      "Amount must be greater than 0"
    );
  });

  it("should revert transaction if account is not actually staking in the contract", async () => {
    await expect(tokenFarm.connect(another).unstakeTokens(ToToken("100"))).to.be.revertedWith(
      "You have not staked any tokens"
    );
  });

  it("should revert if trying to stake amount higher than staking balance", async () => {
    await expect(tokenFarm.connect(investor).unstakeTokens(ToToken("999"))).to.be.revertedWith(
      "Your staking balance is lower than the requested amount"
    );
  });

  it("should unstake a custom amount of tokens", async () => {
    await tokenFarm.connect(investor).unstakeTokens(ToToken("50"));

    const stakingBalance = await tokenFarm.stakingBalance(investor.address);

    expect(stakingBalance).to.equal(ToToken("50"));

    const daiBalance = await daiToken.balanceOf(investor.address);

    expect(daiBalance).to.equal(ToToken("50"));
  });

  it("if no tokens are left in the stakingBalance, isStaking should be set to false", async () => {
    await tokenFarm.connect(investor).unstakeTokens(ToToken("50"));

    const isStaking = await tokenFarm.isStaking(investor.address);

    expect(isStaking).to.equal(false);
  });
});
