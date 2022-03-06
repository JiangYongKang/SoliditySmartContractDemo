import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";

describe("Simple ERC20 Tests", () => {

    let contractFactory: ContractFactory;
    let simpleERC20: Contract;
    let owner: Signer, account: Signer;

    beforeEach("deploy simple erc20", async () => {
        contractFactory = await ethers.getContractFactory("SimpleERC20");
        simpleERC20 = await contractFactory.deploy();
        await simpleERC20.deployed();
        [owner, account] = await ethers.getSigners();
    })

    it("should return token name", async () => {
        expect(await simpleERC20.name()).to.equal("Simple ERC20");
    })

    it("should return token symbol", async () => {
        expect(await simpleERC20.symbol()).to.equal("S-ERC20");
    })

    it("should return decimals of token", async () => {
        expect(await simpleERC20.decimals()).to.equal(18);
    })

    it("should return owner of contract", async () => {
        let ownerAddress = await owner.getAddress();
        expect(await simpleERC20.owner()).to.equal(ownerAddress);
    })

    it("should return total supply of contract", async () => {
        expect(await simpleERC20.totalSupply()).to.equal("1000000000000000000000000");
    })

    it("should return balance of owner", async () => {
        let ownerAddress = await owner.getAddress();
        expect(await simpleERC20.balanceOf(ownerAddress)).to.equal("1000000000000000000000000");
    })

    it("the transfer should be successful", async () => {
        let ownerAddress = await owner.getAddress();
        let accountAddress = await account.getAddress();
        expect(await simpleERC20.balanceOf(ownerAddress)).to.equal("1000000000000000000000000");
        expect(await simpleERC20.balanceOf(accountAddress)).to.equal("0");
        await simpleERC20.transfer(accountAddress, 1);
        expect(await simpleERC20.balanceOf(ownerAddress)).to.equal("999999999999999999999999");
        expect(await simpleERC20.balanceOf(accountAddress)).to.equal("1");
    })
});
