import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";

describe("Simple ERC721 Tests", () => {

    let contractFactory: ContractFactory;
    let simpleERC721: Contract;
    let owner: Signer, account: Signer;

    beforeEach("deploy simple erc721", async () => {
        contractFactory = await ethers.getContractFactory("SimpleERC721");
        simpleERC721 = await contractFactory.deploy();
        await simpleERC721.deployed();
        [owner, account] = await ethers.getSigners();
    })

    it("should be return token name", async () => {
        expect(await simpleERC721.name()).to.equal("Simple ERC721");
    })

    it("should be return token symbol", async () => {
        expect(await simpleERC721.symbol()).to.equal("S-ERC721");
    })

    it("should be return contract owner", async () => {
        let ownerAddress = await owner.getAddress()
        expect(await simpleERC721.owner()).to.equal(ownerAddress);
    })

    it("should be return balance of address", async () => {
        let ownerAddress = await owner.getAddress()
        expect(await simpleERC721.balanceOf(ownerAddress)).to.eq(0)
    })

    it("should be safe mint successfully", async () => {
        let ownerAddress = await owner.getAddress()
        expect(await simpleERC721.connect(owner).safeMint(ownerAddress)).to.emit(simpleERC721, 'Transfer')
        expect(await simpleERC721.balanceOf(ownerAddress)).to.eq(1)
        expect(await simpleERC721.ownerOf(0)).to.eq(ownerAddress)
        expect(await simpleERC721.tokenURI(0)).to.eq("https://ipfs.io/ipfs/QmeWDV5JdCv9x5DCavAdHf3cgbhbQTErHVkgGrson7Fgk6/0.json")
    })
});
