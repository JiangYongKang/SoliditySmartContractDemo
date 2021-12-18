const SimpleERC1155 = artifacts.require("SimpleERC1155");

module.exports = function (deployer) {
    deployer.deploy(SimpleERC1155);
};
