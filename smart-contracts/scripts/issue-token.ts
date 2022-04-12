import { lastDeployedContract } from "../helpers/deployHelpers";
import { TokenFarm } from "../typechain";

async function main() {
  const tokenFarm = await lastDeployedContract<TokenFarm>("TokenFarm");

  await tokenFarm.issueTokens();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
