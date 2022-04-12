import { expect } from "chai";
import { deployContract } from "../helpers/deployHelpers";
import { DappToken } from "../typechain";

describe("DappToken.sol", function () {
  let dappToken: DappToken;

  before(async () => {
    dappToken = await deployContract<DappToken>("DappToken");
  });

  describe("DAPP Token", async () => {
    it("has a name and symbol", async () => {
      const name = await dappToken.name();
      const symbol = await dappToken.symbol();

      expect(name).to.equal("DApp Token");
      expect(symbol).to.equal("DAPP");
    });

    it("has total supply of 1M", async () => {
      const totalSupply = await dappToken.totalSupply();

      expect(totalSupply).to.equal("1000000000000000000000000");
    });
  });
});
