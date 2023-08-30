// Import necessary modules
const { OneRamp } = require("oneramp");
const { ethers } = require("ethers");
require("dotenv").config();

// Load private key from environment variables

const {
  PRIVATEKEY: testPrivateKey,
  ALFAJORES_PROVIDER,
  MUMBAI_PROVIDER,
} = process.env;

// Create an ethers provider that connects to the Alfajores testnet
const provider = new ethers.providers.JsonRpcProvider(
  // "https://neat-clean-pool.matic-testnet.discover.quiknode.pro/45c26e01961dc7f5bb4a3e7a99e16f4358774f61"
  ALFAJORES_PROVIDER
);

// Create a wallet using the private key and the provider
const wallet = new ethers.Wallet(testPrivateKey, provider);

const clientPub = "RMPPUBK-5e36e5afd356f263751e1e63e0db1062-X";
const secretKey =
  "RMPSEC-a179417380e6ed13f6112979bba7bab6fe709c166171567524872528b7e876ab-X";

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
    const tx = await oneRamp.offramp("stable", 45, "245779280949");
    // If successful, log the transaction

    console.log(tx);
  } catch (error) {
    // If an error occurs, log it
    console.error("Error depositing:", error);
  }
}

// oneRamp.offramp()

async function getQuote() {
  try {
    const quote = await oneRamp.quote(25, "usdt");

    console.log(quote);
  } catch (error) {
    console.log(error);
  }
}

async function createKYC() {
  try {
    const data = {
      address: "0xAddress4",
      firstName: "Pete",
      lastName: "Griffin",
      nationality: "UG",
      birthDate: "02/10/1995",
      email: "pete@gmail.com",
      age: 20,
      citizenShip: "Rwanda",
      nationalId: "NIN-7g87asvhg6ras45",
      fullName: "Peter Griffin",
    };

    const kyc = await oneRamp.createKYCVerification(data);

    // oneRamp.

    console.log(kyc);
  } catch (error) {
    console.log(error);
  }
}

// createKYC();

// getQuote();
test();

// Run the test function
