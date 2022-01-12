// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleERC721.sol";

contract SimpleERC721V2 is SimpleERC721 {
    function showVersion() public pure override returns (string memory) {
        return "V2.0";
    }
}
