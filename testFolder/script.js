// Import necessary modules
const OneRamp = require("oneramp").default;
const { ethers } = require("ethers");
require("dotenv").config();

// Load private key from environment variables
const { PRIVATEKEY: testPrivateKey } = process.env;

// Create an ethers provider that connects to the Alfajores testnet
const provider = new ethers.providers.JsonRpcProvider(
  "https://alfajores-forno.celo-testnet.org"
);

// Create a wallet using the private key and the provider
const wallet = new ethers.Wallet(testPrivateKey, provider);

const clientPub = "RMPPUBK-eadde826d2aaab8aa78df232067cbcd2-X";
const secretKey =
  "RMPSEC-f14d4aa760f9889b87ab2ebbc20f5af61324d94f99610cff2d0b6800b15d3a85-X";

// 646f9fddb616847c96eddde3

// Create a OneRamp instance, passing the network name, the provider, and the wallet to its constructor
const oneRamp = new OneRamp(
  "alfajores",
  clientPub,
  secretKey,
  provider,
  wallet
);

async function test() {
  try {
    // Attempt to deposit 1000 units of the specified token
    const tx = await oneRamp.deposit(
      "0xc0EBB770F2c9CA7eD0dDeBa58Af101695Cf1BDc1",
      500
    );
    // If successful, log the transaction
    console.log(tx);
  } catch (error) {
    // If an error occurs, log it
    console.error("Error depositing:", error);
  }
}

// Run the test function
test();
