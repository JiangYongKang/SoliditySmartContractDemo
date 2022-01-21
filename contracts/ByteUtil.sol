// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ByteUtil {
    function toS(bytes memory data) public pure returns (string memory) {
        return string(data);
    }

    function toB(string memory data) public pure returns (bytes memory) {
        return bytes(data);
    }
}
