// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract CommonUtil {
    /**
     * 将 bytes 转换为 string
     */
    function bytesToString(bytes calldata data)
        public
        pure
        returns (string memory)
    {
        return string(data);
    }

    /**
     * 将 string 转换为 bytes
     */
    function stringToBytes(string memory data)
        public
        pure
        returns (bytes memory)
    {
        return bytes(data);
    }

    /**
     * 连接字符串
     */
    function concat(string calldata s1, string calldata s2)
        public
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(s1, s2));
    }

    /**
     * 将 int 转换为 string
     */
    function uintToString(uint256 n) public pure returns (string memory) {
        return Strings.toString(n);
    }

    /**
     * 获取当前合约地址
     */
    function contractAddress() public view returns (address) {
        return address(this);
    }

    /**
     * 生成 0 ~ length - 1 范围内的随机数
     */
    function randomUint(uint256 length) public view returns (uint256) {
        uint256 random = uint256(
            keccak256(abi.encodePacked(block.difficulty, block.timestamp))
        );
        return random % length;
    }
}
