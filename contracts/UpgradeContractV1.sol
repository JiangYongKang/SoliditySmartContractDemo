// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract UpgradeContractV1 is Initializable {
    uint256 public value;

    function initialize(uint256 initialValue) public initializer {
        value = initialValue;
    }

    function message() public pure returns (string memory) {
        return "UpgradeContractV1#message()";
    }
}
