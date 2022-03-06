import { expect } from "chai";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import { Contract, ContractFactory, Signer } from "ethers";

describe("Merkle Tree Verify Tests", () => {

    let contractFactory: ContractFactory;
    let merkleTreeVerify: Contract;
    let merkleTree: MerkleTree;
    let signers: Signer[];

    beforeEach("deploy merkle tree verify", async () => {
        signers = await ethers.getSigners();
        let leaves = await Promise.all(
            signers.map(async signer => {
                let address = await signer.getAddress();
                return ethers.utils.keccak256(address);
            })
        )
        merkleTree = new MerkleTree(leaves, ethers.utils.keccak256, { sortPairs: true })

        contractFactory = await ethers.getContractFactory("MerkleTreeVerify");
        merkleTreeVerify = await contractFactory.deploy(merkleTree.getHexRoot());
        await merkleTreeVerify.deployed();
        console.log("0 -> " + merkleTree.getHexRoot())
        console.log("0 -> " + (await merkleTreeVerify.saleMerkleRoot()))
    })

    it("should return value of merkle tree root", async () => {
        console.log("1 -> " + merkleTree.getHexRoot())
        console.log("1 -> " + (await merkleTreeVerify.saleMerkleRoot()))
        expect(await merkleTreeVerify.saleMerkleRoot()).to.equal("0xd38a533706a576a634c618407eb607df606d62179156c0bed7ab6c2088b01de9");

    })

    it("should can verify caller access", async () => {

        let ownerAddress = await signers[0].getAddress()
        let hexProof = merkleTree.getHexProof(
            ethers.utils.keccak256(ownerAddress)
        )

        console.log("2 -> " + merkleTree.getHexRoot())
        console.log("2 -> " + (await merkleTreeVerify.saleMerkleRoot()))
        console.log(ownerAddress)
        console.log(ethers.utils.keccak256(ownerAddress))
        console.log(hexProof)

        // expect(await merkleTreeVerify.saleMerkleRoot()).to.equal("0xd38a533706a576a634c618407eb607df606d62179156c0bed7ab6c2088b01de9");
        expect(await merkleTreeVerify.connect(signers[0]).sendMessage(hexProof, "Hello World")).not.null
        // expect(merkleTreeVerify.redeem(hexProof, "Hello World")).not.null
        // expect(await merkleTreeVerify.connect(signers[1]).sendMessage(hexProof, "Hello World"))
        //     .to.be.revertedWith('MerkleTreeVerify: merkleProof Verification Failed')
    })

});
