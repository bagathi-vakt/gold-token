// // SPDX-License-Identifier: MIT

// pragma solidity >=0.6.0 <0.9.0;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

// contract Gold_Token is ERC20 {
//     constructor(uint256 initialSupply) ERC20("Gold_Token", "GLD") {
//         _mint(msg.sender, initialSupply);
//         emit BalanceUpdate(msg.sender, balanceOf(msg.sender));
//     }

//     event BalanceUpdate(address user, uint256 curBalance);

//     function decimals() public view virtual override returns (uint8) {
//         return 2;
//     }

//     function transfer(address to, uint256 amount)
//         public
//         virtual
//         override
//         returns (bool)
//     {
//         address owner = _msgSender();
//         _transfer(owner, to, amount);
//         emit BalanceUpdate(msg.sender, balanceOf(msg.sender));
//         emit BalanceUpdate(to, balanceOf(to));
//         return true;
//     }
// }
