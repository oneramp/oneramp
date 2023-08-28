"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneRamp = void 0;
const axios_1 = __importDefault(require("axios"));
const transactions_1 = require("./shared/transactions");
const address_1 = __importDefault(require("./src/utils/address"));
const request_1 = __importDefault(require("./src/utils/request"));
const uuidv4_1 = require("uuidv4");
function getTokenAddress(tokenName, network) {
    const tokenAddress = address_1.default[network][tokenName];
    return tokenAddress;
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
                    store: null,
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
    async requiresUserKYCApproved() {
        const request = new request_1.default();
        const data = {
            clientId: this.pubKey,
            secret: this.secretKey,
        };
        const approved = await request.kycApproved(data);
        return approved;
    }
    async createUserKYC(data) {
        const request = new request_1.default();
        const credentials = {
            client: this.pubKey,
            secret: this.secretKey,
        };
        const created = await request.createKYC(data, credentials);
        return created;
    }
    async offramp(token, amount, phoneNumber) {
        const result = await this.verifyCreds();
        /* This will return true when the user creds are available in the db and false if they're not available */
        // Verify if the user app requires KYC approved for the user here...
        const requiresKYC = await this.requiresUserKYCApproved();
        if (requiresKYC)
            throw new Error("User has not completed/approved their KYC " + requiresKYC);
        if (!result.success)
            throw new Error("Invalid credentials");
        if (!this.signer)
            throw new Error("No signer set");
        const signer = this.signer;
        if (!this.provider)
            throw new Error("No provider set");
        const provider = this.provider;
        const tokenAddress = getTokenAddress(token, this.network);
        if (!tokenAddress) {
            throw new Error("Services for this token not supported");
        }
        /*
        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer)
    
        const approveTx = await tokenContract.approve(
          addresses[this.network].contract,
          ethers.utils.parseEther(amount.toString())
        )
    
        const receipt = await provider.waitForTransaction(approveTx.hash, 1)
    
        // console.log("Transaction mined:", receipt)
    
        const signerAddress = await signer.getAddress()
    
        const allowance = await tokenContract.allowance(
          signerAddress,
          addresses[this.network].contract
        )
        // console.log("Current allowance:", allowance.toString())
    
        if (allowance < ethers.utils.parseEther(amount.toString()))
          throw new Error(
            "Insufficient allowance. Please approve more tokens before depositing."
          )
    
        const offRampAddress = addresses[this.network].contract
    
        const oneRampContract = new ethers.Contract(
          offRampAddress,
          onerampABI,
          signer
        )
    
        const tx = await oneRampContract.depositToken(
          tokenAddress,
          ethers.utils.parseEther(amount.toString())
        )
    
        // Wait for 2 block confirmations.
        await provider.waitForTransaction(tx.hash, 2)
    
        // console.log("Deposit successful. Transaction hash:", tx.hash)
      */
        const testTXHash = (0, uuidv4_1.uuid)();
        // console.log("Deposit successful. Transaction hash:", testTXHash)
        const fiat = await axios_1.default
            .get("https://open.er-api.com/v6/latest/USD")
            .then((res) => {
            const rate = res.data.rates.UGX.toFixed(0);
            const fiat = rate * amount;
            // console.log("Fiat amount:", fiat)
            return fiat;
        });
        // Create a new transaction in the database.
        const newTransaction = {
            store: result.store,
            // txHash: tx.hash,
            txHash: testTXHash,
            amount: amount,
            fiat: fiat,
            network: this.network,
            phone: phoneNumber,
            asset: token,
            status: "Pending",
        };
        const txData = await (0, transactions_1.createTransaction)(newTransaction);
        return txData;
    }
    async quote(initialAmount, token) {
        const withdrawalFeePercentage = 2.0; // Example withdrawal fee percentage
        const withdrawalFee = (initialAmount * withdrawalFeePercentage) / 100;
        const finalAmount = initialAmount - withdrawalFee;
        const data = {
            recives: finalAmount,
            estimated_fee: withdrawalFee,
            amount: initialAmount,
            asset: token,
            memo: "Prices may vary with local service providers",
        };
        return data;
    }
    /*
      This document will allow app create KYC links for their user for verifications
      This can only be used under the condition that the user has enabled Require KYC verification for their app
    */
    async createKYCVerification(kycData) {
        const result = await this.verifyCreds();
        /* This will return true when the user creds are available in the db and false if they're not available */
        // Verify if the user app requires KYC approved for the user here...
        const requiresKYC = await this.requiresUserKYCApproved();
        if (!requiresKYC)
            throw new Error("App doesnot require users to complete/approve their KYC to make transactions ");
        if (!result.success)
            throw new Error("Invalid credentials");
        // Creates the User's KYC request form here basing on the their payout address
        const createdKYCRequest = await this.createUserKYC(kycData);
        return createdKYCRequest;
    }
    /*
      This method returns all the store's active transactions
    */
    async getTransactions() { }
}
exports.OneRamp = OneRamp;
/*

export class offramp {
  signer: Signer | undefined
  provider: ethers.providers.Provider | undefined
  network: Network
  addresses: IfcOneNetworksAddresses

  constructor(
    network: Network,
    provider?: ethers.providers.Provider,
    signer?: Signer
  ) {
    this.network = network
    this.provider = provider
    this.signer = signer
    this.addresses = addresses[this.network]
  }

  setSigner = (signer: Signer) => {
    this.signer = signer
  }

  setProvider = (provider: ethers.providers.Provider) => {
    this.provider = provider
  }

  async approve(tokenAddress: string, amount: number): Promise<boolean> {
    if (!this.signer) throw new Error("No signer set")
    const signer = this.signer
    if (!this.provider) throw new Error("No provider set")
    const provider = this.provider

    const allAddresses = getAllAddresses(addresses)
    if (!allAddresses.includes(tokenAddress)) {
      throw new Error("Invalid token address")
    }

    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer)
    const approveTx = await tokenContract.approve(
      addresses[this.network].contract,
      ethers.utils.parseEther(amount.toString())
    )
    const receipt = await provider.waitForTransaction(approveTx.hash, 1)
    console.log("Transaction mined:", receipt)
    return true
  }

  async offramp(
    tokenAddress: string,
    amount: number,
    phoneNumber: string
  ): Promise<any> {
    if (!this.signer) throw new Error("No signer set")
    const signer = this.signer
    if (!this.provider) throw new Error("No provider set")
    const provider = this.provider

    const allAddresses = getAllAddresses(addresses)
    if (!allAddresses.includes(tokenAddress)) {
      throw new Error("Invalid token address")
    }

    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer)

    const signerAddress = await signer.getAddress()

    const allowance = await tokenContract.allowance(
      signerAddress,
      addresses[this.network].contract
    )
    // console.log("Current allowance:", allowance.toString())

    if (allowance < ethers.utils.parseEther(amount.toString()))
      throw new Error(
        "Insufficient allowance. Please approve more tokens before depositing."
      )

    const offRampAddress = addresses[this.network].contract
    const oneRampContract = new ethers.Contract(
      offRampAddress,
      onerampABI,
      signer
    )

    const tx = await oneRampContract.depositToken(
      tokenAddress,
      ethers.utils.parseEther(amount.toString())
    )

    // Wait for 2 block confirmations.
    await provider.waitForTransaction(tx.hash, 2)

    console.log("Deposit successful. Transaction hash:", tx.hash)

    const newTransaction = {
      store: "64650ac97b7e3975e9ee9133",
      txHash: tx.hash,
      amount: amount,
      fiat: amount,
      phone: phoneNumber,
      asset: "cUSD",
      status: "Success",
    }

    return newTransaction
  }
}

*/
