// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./Roles.sol";


contract ConsumerRole {
    using Roles for Roles.Role;

    event ConsumerAdded(address indexed account);
    event ConsumerRemoved(address indexed account);
 
    Roles.Role private consumers;

  constructor() {
    _addConsumer(msg.sender);
  }


  modifier onlyConsumer() {
    require(isConsumer(msg.sender), "Only a Consumer can call this function");
    _;
  }


  function isConsumer(address account) public view returns (bool) {
    return consumers.has(account);
  }


  function addConsumer(address account) public onlyConsumer {
    _addConsumer(account);
  }


  function renounceConsumer(address account) public onlyConsumer{
    _removeConsumer(account);
  }


  function _addConsumer(address account) internal {
    consumers.add(account);
    emit ConsumerAdded(account);
  }

 
  function _removeConsumer(address account) internal {
    consumers.remove(account);
    emit ConsumerRemoved(account);
  }
}