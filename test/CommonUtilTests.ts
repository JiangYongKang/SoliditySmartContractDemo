import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("CommonUtil Tests", () => {

    let contractFactory: ContractFactory;
    let commonUtil: Contract;

    beforeEach("deploy byte utils", async () => {
        contractFactory = await ethers.getContractFactory("CommonUtil");
        commonUtil = await contractFactory.deploy()
        await commonUtil.deployed();
    })

    it("should can convert bytes to string", async () => {
        let data = ethers.utils.toUtf8Bytes("SOLIDITY")
        expect(await commonUtil.bytesToString(data)).to.equal("SOLIDITY");
    })

    it("should can convert string to bytes", async () => {
        expect(await commonUtil.stringToBytes("SOLIDITY")).to.equal("0x534f4c4944495459");
    })

    it("should can concat string successful", async () => {
        expect(await commonUtil.concat("ABC", "DEF")).to.equal("ABCDEF");
    })

    it("should can convert uint to string", async () => {
        expect(await commonUtil.uintToString(100)).to.equal("100");
    })

    it("should can return this contract address", async () => {
        expect(await commonUtil.contractAddress()).to.equal(commonUtil.address);
    })

    it("should can return random uint", async () => {
        let number = (await commonUtil.randomUint(5)).toString()
        expect(["0", "1", "2", "3", "4"]).to.include(number)
    })


});
