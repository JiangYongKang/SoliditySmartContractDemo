// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract SimpleERC20 is ERC20, ERC20Burnable, Ownable {
    // 设置代币的名称，缩写
    constructor() ERC20("SimpleERC20", "SERC20") {
        // 初始化发行代币数量
        _mint(msg.sender, 10000 * 10**decimals());
    }

    /**
     * @dev 增发代币，只有合约的创建者才可以调用这个方法
     * @param to 增发代币的地址
     * @param amount 增发代币数量，单位是 wei
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
