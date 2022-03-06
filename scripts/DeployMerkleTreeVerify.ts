// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import { Signer } from "ethers";

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // Compute whitelist Merkle Hash Root
    let signers: Signer[] = await ethers.getSigners();
    let leaves = await Promise.all(
        signers.map(async signer => {
            let address = await signer.getAddress();
            return ethers.utils.keccak256(address);
        })
    )
    let merkleTree = new MerkleTree(leaves, ethers.utils.keccak256, { sortPairs: true })

    // We get the contract to deploy
    const contractFactory = await ethers.getContractFactory("MerkleTreeVerify");
    const merkleTreeVerify = await contractFactory.deploy(merkleTree.getRoot());
    await merkleTreeVerify.deployed();
    console.log("MerkleTreeVerify Deployed To:", merkleTreeVerify.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
