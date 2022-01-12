import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract, ContractFactory } from "ethers";

describe("Simple ERC721 Tests", () => {

  let contractFactory: ContractFactory;
  let simpleERC721: Contract;

  beforeEach("deploy simple erc721", async () => {
    contractFactory = await ethers.getContractFactory("SimpleERC721");
    simpleERC721 = await upgrades.deployProxy(contractFactory, [])
    await simpleERC721.deployed();
  })

  it("should return token name", async () => {
    expect(await simpleERC721.name()).to.equal("Simple ERC721");
  })

  it("should return token symbol", async () => {
    expect(await simpleERC721.symbol()).to.equal("S-ERC721");
  })

  it("should be return version", async () => {
    expect(await simpleERC721.showVersion()).to.equal("V1.0");
  })

  it("Should mint success", async () => {
    let response = await simpleERC721.safeMint("0x7E7B2Fe3842A3948459398d63f4D8F6c37e2714F", "1")
    expect(response).not.null
  })
});
