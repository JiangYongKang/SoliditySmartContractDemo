import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Simple ERC20 Tests", () => {

  let contractFactory: ContractFactory;
  let simpleERC20: Contract;
  let owner: SignerWithAddress, account1: SignerWithAddress, account2: SignerWithAddress;

  beforeEach("deploy simple erc20", async () => {
    contractFactory = await ethers.getContractFactory("SimpleERC20");
    simpleERC20 = await contractFactory.deploy();
    await simpleERC20.deployed();
    [owner, account1, account2] = await ethers.getSigners();
  })

  it("should return token name", async () => {
    expect(await simpleERC20.name()).to.equal("Simple ERC20");
  })

  it("should return token symbol", async () => {
    expect(await simpleERC20.symbol()).to.equal("S-ERC20");
  })

  it("should return balance of owner", async () => {
    expect(await simpleERC20.balanceOf(owner.address)).to.equal("1000000000000000000000000");
  })

  it("the transfer should be successful", async () => {
    expect(await simpleERC20.balanceOf(owner.address)).to.equal("1000000000000000000000000");
    expect(await simpleERC20.balanceOf(account1.address)).to.equal("0");
    await simpleERC20.transfer(account1.address, 1);
    expect(await simpleERC20.balanceOf(owner.address)).to.equal("999999999999999999999999");
    expect(await simpleERC20.balanceOf(account1.address)).to.equal("1");
  })
});
