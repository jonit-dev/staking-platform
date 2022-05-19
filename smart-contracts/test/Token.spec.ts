import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

import { expect } from "chai";
import { Token } from "../typechain/Token";

describe("Token.sol", function () {
  let token: Token;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  before(async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.deployed();
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    addr1 = accounts[1];
  });

  it("should return the token name and symbol", async () => {
    const tokenName = await token.name();
    const tokenSymbol = await token.symbol();

    expect(tokenName).to.equal("My hardhat test token");
    expect(tokenSymbol).to.equal("MHT");
  });

  it("should return the total supply", async () => {
    const totalSupply = await token.totalSupply();

    expect(totalSupply.toNumber()).to.equal(1000000);
  });

  it("should return the balance of an account", async () => {
    const balance = await token.balanceOf(addr1.address);

    expect(balance.toNumber()).to.equal(0);
  });

  it("should transfer properly between accounts", async () => {
    await token.connect(owner).transfer(addr1.address, 100);

    const balance = await token.balanceOf(addr1.address);

    expect(balance.toNumber()).to.equal(100);
  });

  it("should throw an insufficient balance error, if we try to transfer from an address without funds", async () => {
    await expect(token.connect(addr1).transfer(owner.address, 1000000)).to.be.revertedWith("Insufficient balance");
  });

  it("should update balances after transfers", async () => {
    const balance = await token.balanceOf(addr1.address);

    expect(balance.toNumber()).to.equal(100);

    await token.connect(owner).transfer(addr1.address, 100);

    const balance2 = await token.balanceOf(addr1.address);

    expect(balance2.toNumber()).to.equal(200);
  });
});
