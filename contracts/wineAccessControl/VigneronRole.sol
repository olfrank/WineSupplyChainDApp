// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'VigneronRole' to manage this role - add, remove, check
contract VigneronRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event VigneronAdded(address indexed account);
  event VigneronRemoved(address indexed account);

  // Define a struct 'Vignerons' by inheriting from 'Roles' library, struct Role
  Roles.Role private vignerons;

  // In the constructor make the address that deploys this contract the 1st farmer
  constructor(){
    _addVigneron(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyVigneron() {
    require(isVigneron(msg.sender), "Only a Vigneron can call this function");
    _;
  }

  // Define a function 'isVigneron' to check this role
  function isVigneron(address account) public view returns (bool) {
    return vignerons.has(account);
  }

  // Define a function 'addVigneron' that adds this role
  function addVigneron(address account) public onlyVigneron {
    _addVigneron(account);
  }

  // Define a function 'renounceVigneron' to renounce this role
  function renounceVigneron() public {
    _removeVigneron(msg.sender);
  }

  // Define an internal function '_addVigneron' to add this role, called by 'addVigneron'
  function _addVigneron(address account) internal {
    vignerons.add(account);
    emit VigneronAdded(account);
  }

  // Define an internal function '_removeVigneron' to remove this role, called by 'removeVigneron'
  function _removeVigneron(address account) internal {
    vignerons.remove(account);
    emit VigneronRemoved(account);
  }
}