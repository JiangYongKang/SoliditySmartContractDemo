import { expect } from "chai";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import { Contract, ContractFactory, Signer } from "ethers";

describe("Merkle Tree Verify Tests", () => {

    let contractFactory: ContractFactory;
    let merkleTreeVerify: Contract;

    let createMerkleTree = async () => {
        let signers: Signer[] = await ethers.getSigners();
        let leaves = await Promise.all(
            signers.map(async signer => {
                let address = await signer.getAddress();
                return ethers.utils.keccak256(address);
            })
        );
        return new MerkleTree(leaves, ethers.utils.keccak256, { sortPairs: true });
    };

    beforeEach("deploy merkle tree verify", async () => {
        contractFactory = await ethers.getContractFactory("MerkleTreeVerify");
        merkleTreeVerify = await contractFactory.deploy();
        await merkleTreeVerify.deployed();
    });

    it("should return value of merkle tree root", async () => {
        let merkleTree = await createMerkleTree();
        expect(await merkleTreeVerify.saleMerkleRoot()).to.equal(merkleTree.getHexRoot());
    });

    it("should can verify caller access", async () => {

        let merkleTree = await createMerkleTree();

        let signers = await ethers.getSigners();
        let ownerAddress = await signers[0].getAddress();
        let hexProof = merkleTree.getHexProof(
            ethers.utils.keccak256(ownerAddress)
        );

        expect(await merkleTreeVerify.connect(signers[0]).sendMessage(hexProof, "Hello World")).to.eq("Hello World");

        await expect(merkleTreeVerify.connect(signers[1]).sendMessage(hexProof, "Hello World"))
            .to.be.revertedWith('MerkleTreeVerify: merkleProof Verification Failed');
    });

});
