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

const clientPub = "RMPPUBK-5c097ab5011bb9b4123a51050042eddf-X";
const secretKey =
  "RMPSEC-939a0f08ccecb7cafd70eaf075a00fa1727fa60a08507a68943ea2e0b08138cf-X";

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
