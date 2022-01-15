// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./Roles.sol";


contract VigneronRole {
  using Roles for Roles.Role;

  
  event VigneronAdded(address indexed account);
  event VigneronRemoved(address indexed account);

  
  Roles.Role private vignerons;

  
  constructor(){
    _addVigneron(msg.sender);
  }

  
  modifier onlyVigneron() {
    require(isVigneron(msg.sender), "Only a Vigneron can call this function");
    _;
  }

  
  function isVigneron(address account) public view returns (bool) {
    return vignerons.has(account);
  }

  
  function addVigneron(address account) public onlyVigneron {
    _addVigneron(account);
  }

  
  function renounceVigneron() public {
    _removeVigneron(msg.sender);
  }

  
  function _addVigneron(address account) internal {
    vignerons.add(account);
    emit VigneronAdded(account);
  }

  
  function _removeVigneron(address account) internal {
    vignerons.remove(account);
    emit VigneronRemoved(account);
  }
}