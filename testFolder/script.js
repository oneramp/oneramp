// Import necessary modules
const { OneRamp } = require("oneramp");
const { ethers } = require("ethers");
require("dotenv").config();

// Load private key from environment variables
const { PRIVATEKEY: testPrivateKey } = process.env;

// Create an ethers provider that connects to the Alfajores testnet
const provider = new ethers.providers.JsonRpcProvider(
  "https://neat-clean-pool.matic-testnet.discover.quiknode.pro/45c26e01961dc7f5bb4a3e7a99e16f4358774f61"
);

// Create a wallet using the private key and the provider
const wallet = new ethers.Wallet(testPrivateKey, provider);

const clientPub = "RMPPUBK-1d644510a0e0264bd5ee3480e5b3fc4b-X";
const secretKey =
  "RMPSEC-3eaf85d25e7b858fbf819d5377d6d0598a036261c0285a96842ba0212afefbe4-X";

// Create a OneRamp instance, passing the network name, the provider, and the wallet to its constructor
const oneRamp = new OneRamp("mumbai", clientPub, secretKey, provider, wallet);

async function test() {
  try {
    // Attempt to deposit 1000 units of the specified token
    const tx = await oneRamp.offramp(
      "0x0A50229182a25cFf077AFc6DcB168348f7d917dd",
      15,
      "256700719619"
    );
    // If successful, log the transaction

    console.log(tx);
  } catch (error) {
    // If an error occurs, log it
    console.error("Error depositing:", error);
  }
}

async function getQuote() {
  try {
    const quote = await oneRamp.quote(
      100,
      "0x0A50229182a25cFf077AFc6DcB168348f7d917dd"
    );

    console.log(quote);
  } catch (error) {
    console.log(error);
  }
}

// getQuote();
// Run the test function
test();
