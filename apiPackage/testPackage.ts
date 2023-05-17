// // Import necessary modules
// import OneRamp from "oneramp";
// import { ethers } from "ethers";
// import dotenv from "dotenv";

// dotenv.config();

// // Load private key from environment variables
// const testPrivateKey: string | undefined = process.env.PRIVATEKEY;

// // Create an ethers provider that connects to the Alfajores testnet
// const provider: any = new ethers.providers.JsonRpcProvider(
//   "https://alfajores-forno.celo-testnet.org"
// );

// // Create a wallet using the private key and the provider
// // Check if testPrivateKey is not undefined before creating the Wallet.
// if (!testPrivateKey) {
//   throw new Error("Private Key not found in environment variables");
// }
// const wallet:any = new ethers.Wallet(testPrivateKey, provider);

// const clientPub: string = "RMPPUBK-cacbc4ef3f9703a3429b-X";
// const secretKey: string = "RMPSEC-a2fd9f528ef158d4f7e8b55741f9ce34e9bb6892-X";

// // Create a OneRamp instance, passing the network name, the provider, and the wallet to its constructor
// const oneRamp = new OneRamp("alfajores", clientPub, secretKey, provider, wallet);

// async function test() {
//   try {
//     // Attempt to deposit 1000 units of the specified token
//     const tx = await oneRamp.deposit(
//       "0xc0EBB770F2c9CA7eD0dDeBa58Af101695Cf1BDc1",
//       66600000000
//     );
//     // If successful, log the transaction
//     console.log(tx);
//   } catch (error) {
//     // If an error occurs, log it
//     console.error("Error depositing:", error);
//   }
// }

// // Run the test function
// test();
