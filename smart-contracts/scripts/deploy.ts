// We require the Hardhat Runtime Environment explicitly here. This is optional

import { Contract, utils } from "ethers";
import fs from "fs";
import hre, { ethers } from "hardhat";

import path from "path";
import { deployContract } from "../helpers/deployHelpers";
import { DAIToken, DappToken, TokenFarm } from "../typechain";

interface IABIOutput {
  contract: Contract;
  name: string;
}

async function main() {
  //* 1) Add the deploy contract below
  //* 2) Then, just insert it into the abiOutputs array

  const daiToken = await deployContract<DAIToken>("DAIToken");
  const dappToken = await deployContract<DappToken>("DappToken");
  const tokenFarm = await deployContract<TokenFarm>("TokenFarm", {
    args: [dappToken.address, daiToken.address],
  });

  // provide liquidity to our token farm
  await dappToken.transfer(tokenFarm.address, await dappToken.totalSupply());

  // transfer 100 mock DAI tokens to investor
  const accounts = await ethers.getSigners();
  const investor = accounts[1];

  console.log(`transfering 100 mock DAI to address ${investor.address}`);
  const daiWei = utils.parseEther("100");
  await daiToken.transfer(accounts[1].address, daiWei);

  console.log(`Investor's balance: ${await daiToken.balanceOf(investor.address)}`);

  const abiOutputs: IABIOutput[] = [
    {
      contract: daiToken,
      name: "DAIToken",
    },
    {
      contract: dappToken,
      name: "DappToken",
    },
    {
      contract: tokenFarm,
      name: "TokenFarm",
    },
  ];

  generateABI(abiOutputs);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function generateABI(abiOutputs: IABIOutput[]) {
  for (const output of abiOutputs) {
    const artifactPath = path.resolve(__dirname, `../artifacts/contracts/${output.name}.sol/${output.name}.json`);

    const artifact = fs.readFileSync(artifactPath);

    const artifactData = JSON.parse(artifact.toString());
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;
    artifactData.address = output.contract.address;
    artifactData.network = {
      name: networkName,
      chainId: chainId,
    };

    fs.writeFileSync(artifactPath, JSON.stringify(artifactData));

    console.log("Saving Contract data on file: ", artifactPath);
  }
}

export { deployContract };
