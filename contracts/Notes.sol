// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @dev 一个简单的链上记事本实现
 */
contract Notes {
    mapping(address => mapping(uint256 => string)) notes;

    function write(uint256 id, string memory data) public {
        notes[msg.sender][id] = data;
    }

    function read(uint256 id) public view returns (string memory) {
        return notes[msg.sender][id];
    }

    function change(uint256 id, string memory data) public {
        notes[msg.sender][id] = data;
    }

    function destory(uint256 id) public {
        delete notes[msg.sender][id];
    }
}
