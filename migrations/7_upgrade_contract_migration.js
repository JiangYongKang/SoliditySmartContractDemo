const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const UpgradeContractV1 = artifacts.require('UpgradeContractV1');
const UpgradeContractV2 = artifacts.require('UpgradeContractV2');

module.exports = async function (deployer) {
    const instanceV1 = await deployProxy(UpgradeContractV1, [42], { deployer });
    console.log('Deployed', instanceV1.address);
    const instanceV2 = await upgradeProxy(instanceV1.address, UpgradeContractV2, { deployer });
    console.log("Upgraded", instanceV2.address);
};