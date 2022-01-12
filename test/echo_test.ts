import { expect } from "chai";
import { ethers } from "hardhat";

describe("Echo Tests", () => {
    it("Should echo message", async () => {
        let Echo = await ethers.getContractFactory("Echo");
        let echo = await Echo.deploy();
        await echo.deployed();
        expect(await echo.echo("Hello World")).to.equal("Hello World");
    });
});
