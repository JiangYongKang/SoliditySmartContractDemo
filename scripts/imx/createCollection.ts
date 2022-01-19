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
  let ownerPrivateKey = process.env.PRIVATE_KEY || ''
  let ropstenURL = process.env.ROPSTEN_URL || ''
  let imxPublicApiURL = process.env.IMX_PUBLIC_API_URL || ''
  let starkContractAddress = process.env.IMX_STARK_CONTRACT_ADDRESS || ''
  let registrationContractAddress = process.env.IMX_REGISTRATION_CONTRACT_ADDRESS || ''
  let imxCollectionProjectId = process.env.IMX_COLLECTION_PROJECT_ID || ''
  let imxCollectionName = process.env.IMX_COLLECTION_NAME || ''
  let imxCollectionDescription = process.env.IMX_COLLECTION_DESCRIPTION || ''
  let imxCollectionContractAddress = process.env.IMX_COLLECTION_CONTRACT_ADDRESS || ''
  let imxCollectionOwnerPublicKey = process.env.IMX_COLLECTION_OWNER_PUBLIC_KEY || ''
  let imxCollectionIconURL = process.env.IMX_COLLECTION_ICON_URL || ''
  let imxCollectionMetadataApiURL = process.env.IMX_COLLECTION_METADATA_API_URL || ''
  let imxCollectionImageURL = process.env.IMX_COLLECTION_IMAGE_URL || ''

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

  let createCollectionResp = await imxClient.createCollection({
    name: imxCollectionName,
    description: imxCollectionDescription,
    contract_address: imxCollectionContractAddress,
    owner_public_key: imxCollectionOwnerPublicKey,
    icon_url: imxCollectionIconURL,
    metadata_api_url: imxCollectionMetadataApiURL,
    collection_image_url: imxCollectionImageURL,
    project_id: Number.parseInt(imxCollectionProjectId),
  });
  console.log("CREATE IMX COLLECTION RESPONSE: " + JSON.stringify(createCollectionResp));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
