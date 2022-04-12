import { expect } from "chai";
import { deployContract } from "../helpers/deployHelpers";
import { DAIToken } from "../typechain";

describe("DAIToken.sol", function () {
  let daiToken: DAIToken;

  before(async () => {
    daiToken = await deployContract<DAIToken>("DAIToken");
  });

  describe("DAIToken", async () => {
    it("has a name and symbol", async () => {
      const name = await daiToken.name();
      const symbol = await daiToken.symbol();

      expect(name).to.equal("Mock DAI Token");
      expect(symbol).to.equal("mDAI");
    });
  });
});
