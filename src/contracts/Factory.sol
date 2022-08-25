// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply,
        address owner
    ) ERC20(name, symbol) {
        _mint(owner, initialSupply * 10**uint256(decimals));
    }
}

contract Factory {
    event ERC20TokenCreated(address tokenAddress);

    function deployNewERC20Token(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply
    ) public returns (address) {
        ERC20Token t = new ERC20Token(
            name,
            symbol,
            decimals,
            initialSupply,
            msg.sender
        );
        emit ERC20TokenCreated(address(t));

        return address(t);
    }
}
