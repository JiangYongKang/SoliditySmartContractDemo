const SimpleERC721 = artifacts.require("SimpleERC721");

module.exports = function (deployer) {
    deployer.deploy(SimpleERC721);
};
