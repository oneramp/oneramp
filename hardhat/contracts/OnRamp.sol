// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract OnRampContract {
    function getEthBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
