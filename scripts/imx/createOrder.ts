// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { ERC721TokenType, ETHTokenType, ImmutableXClient, } from '@imtbl/imx-sdk';
import { BigNumber } from "ethers";

async function main() {

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  let ownerPrivateKey = process.env.PRIVATE_KEY || ''
  let ropstenURL = process.env.ROPSTEN_URL || ''
  let imxPublicApiURL = process.env.IMX_PUBLIC_API_URL || ''
  let starkContractAddress = process.env.IMX_STARK_CONTRACT_ADDRESS || ''
  let registrationContractAddress = process.env.IMX_REGISTRATION_CONTRACT_ADDRESS || ''
  let imxCollectionContractAddress = process.env.IMX_COLLECTION_CONTRACT_ADDRESS || ''

  let signer = new ethers.Wallet(ownerPrivateKey).connect(
    new ethers.providers.JsonRpcProvider(ropstenURL)
  );

  let imxClient = await ImmutableXClient.build({
    signer: signer,
    publicApiUrl: imxPublicApiURL,
    starkContractAddress: starkContractAddress,
    registrationContractAddress: registrationContractAddress,
    gasLimit: "7000000",
    gasPrice: "40000000000",
    enableDebug: true,
  });

  let createOrderResp = await imxClient.createOrder({
    user: signer.address,
    tokenSell: {
      type: ERC721TokenType.ERC721,
      data: {
        tokenId: "1",
        tokenAddress: imxCollectionContractAddress
      }
    },
    amountSell: BigNumber.from("1"),
    tokenBuy: {
      type: ETHTokenType.ETH,
      data: {
        decimals: 18,
      },
    },
    amountBuy: BigNumber.from("50000000000000"),
  })
  console.log(`CALL CREATE ORDER RESPONSE: ${JSON.stringify(createOrderResp)}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
