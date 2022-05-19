//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DappToken.sol";
import "./DAIToken.sol";

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenFarm is Ownable {
  string public name = "Dapp Token Farm";
  DappToken public dappToken;
  DAIToken public daiToken;

  address[] public stakers;
  mapping(address => uint256) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  event IssueToken(address indexed to, uint256 indexed amount);
  event StakeToken(address indexed from, uint256 indexed amount);
  event UnstakeToken(address indexed from, uint256 indexed amount);

  constructor(DappToken _daappToken, DAIToken _daiToken) {
    dappToken = _daappToken;
    daiToken = _daiToken;
  }

  function getOwnStakedTokensBalance() public view returns (uint256) {
    return stakingBalance[msg.sender];
  }

  function unstakeTokens(uint256 _amount) public {
    require(_amount > 0, "Amount must be greater than 0");
    require(hasStaked[msg.sender], "You have not staked any tokens");
    require(isStaking[msg.sender], "You have nothing staked on this contract.");
    require(stakingBalance[msg.sender] >= _amount, "Your staking balance is lower than the requested amount");

    daiToken.transfer(msg.sender, _amount);

    emit UnstakeToken(msg.sender, _amount);

    stakingBalance[msg.sender] -= _amount;

    if (stakingBalance[msg.sender] == 0) {
      isStaking[msg.sender] = false;
    }
  }

  function stakeTokens(uint256 _amount) public {
    require(_amount > 0, "Amount must be greater than 0");

    daiToken.transferFrom(msg.sender, address(this), _amount);

    stakingBalance[msg.sender] += _amount;

    console.log("stakingBalance: %s", stakingBalance[msg.sender]);

    if (!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
      hasStaked[msg.sender] = true;
      isStaking[msg.sender] = true;
      emit StakeToken(msg.sender, _amount);
    }
  }

  function issueTokens() public onlyOwner {
    for (uint256 i = 0; i < stakers.length; i++) {
      address recipient = stakers[i];
      if (isStaking[recipient]) {
        uint256 balance = stakingBalance[recipient];

        if (balance > 0) {
          // basically, for each 1 DAI token, you receive 1 DAPP token
          dappToken.transfer(recipient, balance);

          emit IssueToken(recipient, balance);
        }
      }
    }
  }
}
