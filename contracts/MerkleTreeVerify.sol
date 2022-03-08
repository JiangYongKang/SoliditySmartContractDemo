// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTreeVerify {
    /**
     * Merkle Root Hash Value
     */
    bytes32 public saleMerkleRoot =
        0xd38a533706a576a634c618407eb607df606d62179156c0bed7ab6c2088b01de9;

    constructor() {}

    /**
     * 需要有白名单权限才能正常调用
     */
    function sendMessage(
        bytes32[] calldata merkleProof,
        string calldata message
    )
        public
        view
        isValidMerkleProof(merkleProof, saleMerkleRoot)
        returns (string memory)
    {
        return message;
    }

    /**
     * 设置 Merkle Root 的值
     */
    function setSaleMerkleRoot(bytes32 merkleRoot) external {
        saleMerkleRoot = merkleRoot;
    }

    /**
     * 白名单修饰符
     */
    modifier isValidMerkleProof(bytes32[] calldata merkleProof, bytes32 root) {
        require(
            MerkleProof.verify(
                merkleProof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            ),
            "MerkleTreeVerify: merkleProof Verification Failed"
        );
        _;
    }
}
