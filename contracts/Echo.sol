// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

contract Echo {
    function echo(string memory message) public pure returns (string memory) {
        return message;
    }
}
