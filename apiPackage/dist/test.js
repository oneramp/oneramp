"use strict";
// import OneRamp from "./auth"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const clientPub = "RMPPUBK-cacbc4ef3f9703a3429b-X"
// const secretKey = "RMPSEC-a2fd9f528ef158d4f7e8b55741f9ce34e9bb6892-X"
// const oneRamp = new OneRamp(clientPub, secretKey)
// // const oneRamp = new OneRamp("clientPub", "secretKey")
// const deposit = async () => {
//   const response = await oneRamp.deposit()
//   console.log(response)
// }
// deposit()
const index_1 = __importDefault(require("./index"));
const PRIVATEKEY = 'b40160445eefcaf633fe33063504955998f1e3636df2d6edb7055172a68ed440';
const { ethers } = require("ethers");
require("dotenv").config();
// Load private key from environment variables
// Create an ethers provider that connects to the Alfajores testnet
const provider = new ethers.providers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org");
// Create a wallet using the private key and the provider
const wallet = new ethers.Wallet(PRIVATEKEY, provider);
// Create a OneRamp instance, passing the network name, the provider, and the wallet to its constructor
const oneRamp = new index_1.default("alfajores", provider, wallet);
async function test() {
    try {
        // Attempt to deposit 1000 units of the specified token
        const tx = await oneRamp.deposit("0xc0EBB770F2c9CA7eD0dDeBa58Af101695Cf1BDc1", 6000000000);
        // If successful, log the transaction
        console.log(tx);
    }
    catch (error) {
        // If an error occurs, log it
        console.error("Error depositing:", error);
    }
}
// Run the test function
test();
