//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
  string public name = "My hardhat test token";
  string public symbol = "MHT";
  uint256 public totalSupply = 1000000;
  address public owner;
  mapping(address => uint256) balances;

  constructor() {
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address to, uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    balances[to] += amount;

    console.log("Sender balance is %s tokens", balances[msg.sender]);
    console.log("Trying to send %s tokens to %s", amount, to);
  }

  function balanceOf(address account) external view returns (uint256) {
    return balances[account];
  }
}
