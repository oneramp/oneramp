// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract polygonOffRampContract is
    Pausable,
    Ownable,
    AutomationCompatibleInterface
{
    event TokenFundsDeposited(
        address indexed tokenDeposited,
        address indexed addressDeposited,
        uint256 amountDeposited
    );
    event TokenFundsWithdrawn(
        address indexed tokenWithdrawn,
        address indexed withdrawAddress,
        uint256 amountWithdrawn
    );
    event FundsWithdrawn(
        address indexed withdrawAddressNative,
        uint256 amountWithdrawnNative
    );
    event UniqueTokenAdded(address indexed addedToken);
    event contractTokenBalanceAdjusted(address indexed token, uint256 amount);
    uint256 minimumDepositAmount;
    uint256 maximumDepositAmount;
    uint256 triggerWithdrawAmount;
    address[] public allowedTokensAddresses;
    mapping(address => uint256) public contractTokenBalances;
    mapping(address => bool) public tokenIsAllowed;
    mapping(address => bool) public tokenTriggerAmountReached;
    mapping(address => address) public tokenPriceFeed;

    constructor() {
        minimumDepositAmount = 10; // $10
        maximumDepositAmount = 1000; // $1000
        triggerWithdrawAmount = 50; // $50
    }

    function getAddressLength() public view returns (uint256) {
        return allowedTokensAddresses.length;
    }

    function setMinimumDepositAmount(uint256 _amount) public onlyOwner {
        minimumDepositAmount = _amount;
    }

    //so as to adjust the maximum deposit amount in depending on available liqiudity
    function setMaximumDepositAmount(
        uint256 _amount
    ) public whenNotPaused onlyOwner {
        maximumDepositAmount = _amount;
    }

    // at what price should the contract trigger a withdraw in dollars
    function setTriggerWithdrawAmount(
        uint256 _amount
    ) public whenNotPaused onlyOwner {
        triggerWithdrawAmount = _amount;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function addAllowedToken(
        address _token,
        address _priceFeedAddress
    ) public onlyOwner {
        require(!tokenIsAllowed[_token], "token Already Exists");
        allowedTokensAddresses.push(_token);
        tokenIsAllowed[_token] = true;
        tokenTriggerAmountReached[_token] = false;
        tokenPriceFeed[_token] = _priceFeedAddress;
        emit UniqueTokenAdded(_token);
    }

    // get the lastest price of the token
    function getLatestPrice(address _token) public view returns (uint256) {
        address _priceFeed = tokenPriceFeed[_token];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(_priceFeed);
        (, int256 price, , , ) = priceFeed.latestRoundData();

        return uint256(price);
    }

    function minimumTokenDepositAmount(
        address _token
    ) public view returns (uint256) {
        uint256 price = getLatestPrice(_token);
        // the price is scale up by 10**8
        uint256 tokenAmount = (minimumDepositAmount * 1e26) / price;
        return tokenAmount;
    }

    function maximumTokenDepositAmount(
        address _token
    ) public view returns (uint256) {
        uint256 price = getLatestPrice(_token);
        // the price is scale up by 10**8
        uint256 tokenAmount = (maximumDepositAmount * 1e26) / price;
        return tokenAmount;
    }

    // depending on  the triggerWithdrawAmount dollar price, how much token should be withdrawn
    function triggerTokenWithdrawAmount(
        address _token
    ) public view returns (uint256) {
        uint256 price = getLatestPrice(_token);
        uint256 tokenAmount = (triggerWithdrawAmount * 1e26) / price;
        return tokenAmount;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        whenNotPaused
        returns (bool upkeepNeeded, bytes memory performData)
    {
        // first number of tokens requiring upkeep
        uint256 counter;
        for (uint256 i = 0; i < allowedTokensAddresses.length; i++) {
            address token = allowedTokensAddresses[i];
            if (
                contractTokenBalances[token] > triggerTokenWithdrawAmount(token)
            ) {
                counter++;
            }
        }
        // initialize an array tokenAddress requiring upkeep
        address[] memory tokens = new address[](counter);
        upkeepNeeded = false;
        uint256 indexCounter;
        for (uint256 i = 0; i < allowedTokensAddresses.length; i++) {
            address token = allowedTokensAddresses[i];
            require(
                tokenTriggerAmountReached[token] == false,
                "token has not been withdrawn yet"
            );
            if (
                contractTokenBalances[token] > triggerTokenWithdrawAmount(token)
            ) {
                upkeepNeeded = true;
                // store the index of the token which needs to be withdrawn
                tokens[indexCounter] = token;
                indexCounter++;
            }
        }
        performData = abi.encode(tokens);
        return (upkeepNeeded, performData);
    }

    function performUpkeep(
        bytes calldata performData
    ) external override whenNotPaused {
        address[] memory tokens = abi.decode(performData, (address[]));
        for (uint256 i = 0; i < tokens.length; i++) {
            address token = tokens[i];
            require(
                contractTokenBalances[token] >
                    triggerTokenWithdrawAmount(token),
                "Token hasn't reached trigger amount"
            );
            require(
                tokenTriggerAmountReached[token] == false,
                "token has not been withdrawn yet"
            );
            IERC20(token).transfer(owner(), contractTokenBalances[token]);
        }
    }

    function depositToken(address _token, uint256 _amount) public {
        require(tokenIsAllowed[_token], "the token is not currently allowed");
        require(
            _amount >= minimumTokenDepositAmount(_token),
            "amount less than minimum allowed withdraw"
        );
        require(
            _amount <= maximumTokenDepositAmount(_token),
            "amount more than maximum allowed withdraw"
        );
        IERC20(_token).transferFrom(_msgSender(), address(this), _amount);
        uint256 contractTokenBalance = contractTokenBalances[_token] += _amount;
        emit contractTokenBalanceAdjusted(_token, contractTokenBalance);
        emit TokenFundsDeposited(_token, _msgSender(), _amount);
    }

    function withdrawToken(
        address _withdrawerAddress,
        address _token
    ) public onlyOwner whenNotPaused {
        require(tokenIsAllowed[_token], "the token is currently not allowed");
        require(
            IERC20(_token).balanceOf(address(this)) >= 0,
            "insufficient tokens available in the contract"
        );
        uint256 _amount = IERC20(_token).balanceOf(address(this));
        IERC20(_token).transfer(_withdrawerAddress, _amount);
        uint256 contractTokenBalance = contractTokenBalances[_token] = 0;
        tokenTriggerAmountReached[_token] = false;
        emit contractTokenBalanceAdjusted(_token, contractTokenBalance);
        emit TokenFundsWithdrawn(_token, _withdrawerAddress, _amount);
    }
}
