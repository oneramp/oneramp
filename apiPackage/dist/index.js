"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const abi_json_1 = __importDefault(require("./abi.json"));
const abit_json_1 = __importDefault(require("./abit.json"));
const transactions_1 = require("./shared/transactions");
const address_1 = __importDefault(require("./src/utils/address"));
const request_1 = __importDefault(require("./src/utils/request"));
function getAllAddresses(addresses) {
    let allAddresses = [];
    for (const networkKey in addresses) {
        const network = addresses[networkKey];
        allAddresses.push(network.usdt, network.stable, network.dai);
    }
    return allAddresses;
}
class OneRamp {
    constructor(network, pubKey, secretKey, provider, signer) {
        /*
          Verify application creds middleware
          This is a private function, and it will only be accessed and called from the class body
        */
        this.verifyCreds = async () => {
            if (!this.pubKey || !this.secretKey) {
                return {
                    success: false,
                    status: 404,
                    message: "No Credentials detected!",
                };
            }
            const request = new request_1.default();
            /*
                Extract the wanted store information from the db by matching the public and secret key that was entered
                THIS LINE CAN BE REPLACED WITH AN EXTRACT CALL TO THE DB
            */
            const data = {
                clientId: this.pubKey,
                secret: this.secretKey,
            };
            const authenticated = await request.db(data);
            return authenticated;
        };
        this.setSigner = (signer) => {
            this.signer = signer;
        };
        this.setProvider = (provider) => {
            this.provider = provider;
        };
        this.network = network;
        this.provider = provider;
        this.signer = signer;
        this.addresses = address_1.default[this.network];
        this.pubKey = pubKey;
        this.secretKey = secretKey;
    }
    async deposit(tokenAddress, amount) {
        const result = await this.verifyCreds();
        /* This will return true when the user creds are available in the db and false if they're not available */
        console.log("DEBUG----", result);
        if (!result.success)
            throw new Error("Invalid credentials");
        if (!this.signer)
            throw new Error("No signer set");
        const signer = this.signer;
        if (!this.provider)
            throw new Error("No provider set");
        const provider = this.provider;
        const allAddresses = getAllAddresses(address_1.default);
        if (!allAddresses.includes(tokenAddress)) {
            throw new Error("Invalid token address");
        }
        const tokenContract = new ethers_1.ethers.Contract(tokenAddress, abi_json_1.default, signer);
        const approveTx = await tokenContract.approve(address_1.default[this.network].contract, ethers_1.ethers.utils.parseEther(amount.toString()));
        const receipt = await provider.waitForTransaction(approveTx.hash, 1);
        console.log("Transaction mined:", receipt);
        const signerAddress = await signer.getAddress();
        const allowance = await tokenContract.allowance(signerAddress, address_1.default[this.network].contract);
        console.log("Current allowance:", allowance.toString());
        if (allowance < ethers_1.ethers.utils.parseEther(amount.toString()))
            throw new Error("Insufficient allowance. Please approve more tokens before depositing.");
        const offRampAddress = address_1.default[this.network].contract;
        const oneRampContract = new ethers_1.ethers.Contract(offRampAddress, abit_json_1.default, signer);
        const tx = await oneRampContract.depositToken(tokenAddress, ethers_1.ethers.utils.parseEther(amount.toString()));
        // Wait for 2 block confirmations.
        await provider.waitForTransaction(tx.hash, 2);
        console.log("Deposit successful. Transaction hash:", tx.hash);
        // Create a new transaction in the database.
        const newTransaction = {
            store: "646155d093fc21f5211f8920",
            txHash: tx.hash,
            amount: amount,
            fiat: amount,
            phone: "256700719619",
            asset: "cUSD",
            status: "Success",
        };
        const txData = await (0, transactions_1.createTransaction)(newTransaction);
        // const newTx = await createTransaction(newTransaction)
        // await createTransaction(newTransaction);
        console.log("New transaction created:", txData);
        return;
        // Initiate Flutterwave payment.
        // await initiatePayment(phoneNumber, 60000, "UGX")
    }
}
exports.default = OneRamp;
