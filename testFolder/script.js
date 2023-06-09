// Import necessary modules
const { OneRamp } = require("oneramp")
const { ethers } = require("ethers")
require("dotenv").config()

// Load private key from environment variables
const { PRIVATEKEY: testPrivateKey } = process.env

// Create an ethers provider that connects to the Alfajores testnet
const provider = new ethers.providers.JsonRpcProvider(
  "https://neat-clean-pool.matic-testnet.discover.quiknode.pro/45c26e01961dc7f5bb4a3e7a99e16f4358774f61"
)

// Create a wallet using the private key and the provider
const wallet = new ethers.Wallet(testPrivateKey, provider)

const clientPub = "RMPPUBK-29c8c6b9ff0507d49d6215f12f2ca893-X"
const secretKey =
  "RMPSEC-eb575b881e46a922758d3931e70544d48b4f06937ff9ba5d0980809c3329a671-X"

// Create a OneRamp instance, passing the network name, the provider, and the wallet to its constructor
const oneRamp = new OneRamp("mumbai", clientPub, secretKey, provider, wallet)

async function test() {
  try {
    // Attempt to deposit 1000 units of the specified token
    const tx = await oneRamp.offramp(
      "0x0A50229182a25cFf077AFc6DcB168348f7d917dd",
      450,
      "25679898100987"
    )
    // If successful, log the transaction
    console.log(tx)
  } catch (error) {
    // If an error occurs, log it
    console.error("Error depositing:", error)
  }
}

// Run the test function
test()
