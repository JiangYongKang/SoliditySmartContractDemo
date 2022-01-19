// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@imtbl/imx-contracts/contracts/Mintable.sol";

contract IMXERC721 is ERC721, Mintable {
    constructor(
        string memory _name,
        string memory _symbol,
        address _owner,
        address _imx
    ) ERC721(_name, _symbol) Mintable(_owner, _imx) {
        // 初始化合约的逻辑
    }

    // 这个函数会在 L2 -> L1 的时候被调用
    function _mintFor(
        address to,
        uint256 id,
        bytes memory blueprint
    ) internal override {
        _safeMint(to, id);
    }
}
