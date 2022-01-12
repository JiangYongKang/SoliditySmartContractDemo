import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract, ContractFactory } from "ethers";

describe("Simple ERC721 V2 Tests", () => {

  let contractFactory: ContractFactory;
  let simpleERC721V2: Contract;

  beforeEach("deploy simple erc721", async () => {
    contractFactory = await ethers.getContractFactory("SimpleERC721V2");
    simpleERC721V2 = await upgrades.deployProxy(contractFactory, [])
    await simpleERC721V2.deployed();
  })

  it("should be return token name", async () => {
    expect(await simpleERC721V2.name()).to.equal("Simple ERC721");
  })

  it("should be return version", async () => {
    expect(await simpleERC721V2.showVersion()).to.equal("V2.0");
  })

  it("Should mint success", async () => {
    let response = await simpleERC721V2.safeMint("0x7E7B2Fe3842A3948459398d63f4D8F6c37e2714F", "1")
    expect(response).not.null
  })
});
