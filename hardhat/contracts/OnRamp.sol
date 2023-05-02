// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OnRampContract is Ownable {
    event TokenFundsDeposited(
        address indexed tokenDeposited,
        address indexed addressDeposited,
        uint256 amountDeposited
    );
    event TokenFundsWithdrawn(
        address indexed tokenWithdrawn,
        address indexed addressWithdrawn,
        uint256 amountWithdrawn
    );

    mapping(address => uint256) public contractTokenBalances;
    mapping(address => bool) public tokenIsAllowed;

    function addAllowedToken(address _token) public onlyOwner {
        require(!tokenIsAllowed[_token], "token Already Exists");
        tokenIsAllowed[_token] = true;
    }

    function depositToken(address _token, uint256 _amount) public {
        require(tokenIsAllowed[_token], "token currently allowed");
        contractTokenBalances[_token] += _amount;

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        emit TokenFundsDeposited(_token, msg.sender, _amount);
    }

    function withdrawToken(
        address _withdrawerAddress,
        address _token,
        uint256 _amount
    ) public onlyOwner {
        require(tokenIsAllowed[_token], "token currently allowed");
        require(_amount > 0, "insufficient tokens in the contract");
        contractTokenBalances[_token] -= _amount;
        IERC20(_token).transfer(_withdrawerAddress, _amount);
        emit TokenFundsDeposited(_token, _withdrawerAddress, _amount);
    }
}
