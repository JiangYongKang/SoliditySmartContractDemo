import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("ByteUtil Tests", () => {

  let contractFactory: ContractFactory;
  let byteUtil: Contract;

  beforeEach("deploy byte utils", async () => {
    contractFactory = await ethers.getContractFactory("ByteUtil");
    byteUtil = await contractFactory.deploy()
    await byteUtil.deployed();
  })

  it("should convert bytes to string", async () => {
    let data = ethers.utils.toUtf8Bytes("SOLIDITY")
    expect(await byteUtil.toS(data)).to.equal("SOLIDITY");
  })

  it("should convert string to bytes", async () => {
    expect(await byteUtil.toB("SOLIDITY")).to.equal("0x534f4c4944495459");
  })


});
