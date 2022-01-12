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

  // We get the contract to deploy
  const Echo = await ethers.getContractFactory("Echo");
  const echo = await Echo.deploy();
  await echo.deployed();
  console.log("Echo deployed to:", echo.address);

  const SimpleERC721 = await ethers.getContractFactory("SimpleERC721");
  const simpleERC721 = await upgrades.deployProxy(SimpleERC721, [])
  await simpleERC721.deployed();
  console.log("SimpleERC721 deployed to:", simpleERC721.address);

  const SimpleERC721V2 = await ethers.getContractFactory("SimpleERC721V2");
  const simpleERC721V2 = await upgrades.deployProxy(SimpleERC721V2, [])
  await simpleERC721V2.deployed();
  console.log("SimpleERC721V2 deployed to:", simpleERC721V2.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
