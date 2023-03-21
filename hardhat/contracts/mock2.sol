// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20TokenMock2 is ERC20 {
    constructor() ERC20("Dapp Token2", "DAPP2") {
        _mint(msg.sender, 100000000000000000000000000000000);
    }
}
