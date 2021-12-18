// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract SimpleERC1155 is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    constructor() ERC1155("https://www.example/api/item/{id}.json") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    // 添加新的代币
    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    // 批量添加新的代币
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    // 代币持有者销毁自己的代币
    function burn(
        address account,
        uint256 id,
        uint256 value
    ) public virtual override {
        super.burn(account, id, value);
    }

    // 代币持有者批量销毁代币
    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory values
    ) public virtual override {
        super.burnBatch(account, ids, values);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
