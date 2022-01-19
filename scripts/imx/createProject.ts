// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { ImmutableXClient, } from '@imtbl/imx-sdk';

async function main() {

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  let ropstenURL = process.env.ROPSTEN_URL || ''
  let ownerPrivateKey = process.env.PRIVATE_KEY || ''
  let imxPublicApiURL = process.env.IMX_PUBLIC_API_URL || ''
  let starkContractAddress = process.env.IMX_STARK_CONTRACT_ADDRESS || ''
  let registrationContractAddress = process.env.IMX_REGISTRATION_CONTRACT_ADDRESS || ''
  let imxProjectName = process.env.IMX_PROJECT_NAME || ''
  let imxProjectCompanyName = process.env.IMX_PROJECT_COMPANY_NAME || ''
  let imxProjectContractEmail = process.env.IMX_PROJECT_CONTRACT_EMAIL || ''

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

  let createProjectResp = await imxClient.createProject({
    name: imxProjectName,
    company_name: imxProjectCompanyName,
    contact_email: imxProjectContractEmail,
  });
  console.log(`CALL CREATE PROJECT RESPONSE: ${JSON.stringify(createProjectResp)}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
