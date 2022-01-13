// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
  struct Role {
    mapping (address => bool) bearer;
  }

  /**
   * @dev give an account access to this role
   */
  function add(Role storage role, address account) internal {
    require(account != address(0), "Roles.sol/add: Must be a valid address");
    require(!has(role, account), "You are already added to this role");

    role.bearer[account] = true;
  }

  /**
   * @dev remove an account's access to this role
   */
  function remove(Role storage role, address account) internal {
    require(account != address(0), "Roles.sol/remove: Must be a valid address");
    require(has(role, account), "You must be added to be removed");

    role.bearer[account] = false;
  }

  /**
   * @dev check if an account has this role
   * @return bool
   */
  function has(Role storage role, address account) internal view returns (bool){
    require(account != address(0), "Roles.sol/has: Must be a valid address");
    return role.bearer[account];
  }
}