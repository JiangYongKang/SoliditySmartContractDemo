// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract SimpleERC721 is ERC721Upgradeable, OwnableUpgradeable {
    function initialize() external initializer {
        __Ownable_init();
        __ERC721_init("Simple ERC721", "S-ERC721");
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function showVersion() public pure virtual returns (string memory) {
        return "V1.0";
    }
}
