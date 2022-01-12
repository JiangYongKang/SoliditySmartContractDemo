// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // Deploying
    let SimpleERC721 = await ethers.getContractFactory("SimpleERC721");
    let simpleERC721 = await upgrades.deployProxy(SimpleERC721, []);
    await simpleERC721.deployed();
    console.log("SimpleERC721 deployed to:", simpleERC721.address);

    // Upgrading
    let SimpleERC721V2 = await ethers.getContractFactory("SimpleERC721V2");
    let simpleERC721V2 = await upgrades.upgradeProxy(simpleERC721.address, SimpleERC721V2);
    console.log("SimpleERC721V2 deployed to:", simpleERC721V2.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
