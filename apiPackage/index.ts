import axios from "axios"
import { ethers, Signer } from "ethers"
import tokenABI from "./abi.json"
import onerampABI from "./abit.json"

import { createTransaction } from "./shared/transactions"

import addresses, {
  IfcOneNetworksAddresses,
  IfcAddresses,
} from "./src/utils/address"
import Request from "./src/utils/request"
import { KYCFormI } from "./types"
import { uuid } from "uuidv4"

type Network = "bscTestnet" | "bsc" | "celo" | "alfajores" | "mumbai"
type Token =
  | "stable"
  | "usdt"
  | "dai"
  | "0xc0EBB770F2c9CA7eD0dDeBa58Af101695Cf1BDc1"

function getTokenAddress(tokenName: Token, network: Network) {
  const tokenAddress = addresses[network][tokenName]
  return tokenAddress
}

export class OneRamp {
  private signer: Signer | undefined
  provider: ethers.providers.Provider | undefined
  network: Network
  private pubKey: string
  private secretKey: string
  private addresses: IfcOneNetworksAddresses

  constructor(
    network: Network,
    pubKey: string,
    secretKey: string,
    provider?: ethers.providers.Provider,
    signer?: Signer
  ) {
    this.network = network
    this.provider = provider
    this.signer = signer
    this.addresses = addresses[this.network]
    this.pubKey = pubKey
    this.secretKey = secretKey
  }

  /*
    Verify application creds middleware
    This is a private function, and it will only be accessed and called from the class body
  */
  private verifyCreds = async (): Promise<{
    success: boolean
    status: Number
    message: String
    store: string | null
  }> => {
    if (!this.pubKey || !this.secretKey) {
      return {
        success: false,
        status: 404,
        message: "No Credentials detected!",
        store: null,
      }
    }

    const request = new Request()

    /* 
        Extract the wanted store information from the db by matching the public and secret key that was entered
        THIS LINE CAN BE REPLACED WITH AN EXTRACT CALL TO THE DB
    */
    const data = {
      clientId: this.pubKey,
      secret: this.secretKey,
    }

    const authenticated: any = await request.db(data)

    return authenticated
  }

  private async requiresUserKYCApproved(): Promise<any> {
    const request = new Request()

    const data = {
      clientId: this.pubKey,
      secret: this.secretKey,
    }

    const approved = await request.kycApproved(data)
    return approved
  }

  private async createUserKYC(data: KYCFormI): Promise<KYCFormI | undefined> {
    const request = new Request()

    const credentials = {
      client: this.pubKey,
      secret: this.secretKey,
    }

    const created = await request.createKYC(data, credentials)

    return created
  }

  private setSigner = (signer: Signer) => {
    this.signer = signer
  }

  private setProvider = (provider: ethers.providers.Provider) => {
    this.provider = provider
  }

  async offramp(
    token: Token,
    amount: number,
    phoneNumber: string
  ): Promise<void> {
    const result = await this.verifyCreds()
    /* This will return true when the user creds are available in the db and false if they're not available */

    // Verify if the user app requires KYC approved for the user here...
    // const requiresKYC = await this.requiresUserKYCApproved()

    // if (requiresKYC)
    //   throw new Error(
    //     "User has not completed/approved their KYC " + requiresKYC
    //   )

    if (!result.success) throw new Error("Invalid credentials")

    if (!this.signer) throw new Error("No signer set")

    const signer = this.signer

    if (!this.provider) throw new Error("No provider set")
    const provider = this.provider

    const tokenAddress = getTokenAddress(token, this.network)

    if (!tokenAddress) {
      throw new Error("Services for this token not supported")
    }

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

    // const testTXHash = uuid()

    // console.log("Deposit successful. Transaction hash:", testTXHash)

    const fiat = await axios
      .get("https://open.er-api.com/v6/latest/USD")
      .then((res) => {
        const rate = res.data.rates.UGX.toFixed(0)
        const fiat = rate * amount
        // console.log("Fiat amount:", fiat)
        return fiat
      })

    // Create a new transaction in the database.
    const newTransaction = {
      store: result.store,
      txHash: tx.hash,
      // txHash: testTXHash,
      amount: amount,
      fiat: fiat,
      network: this.network,
      phone: phoneNumber,
      asset: token,
      status: "Pending",
    }

    const txData = await createTransaction(newTransaction)

    return txData
  }

  async quote(initialAmount: number, token: Token) {
    const withdrawalFeePercentage = 2.0 // Example withdrawal fee percentage

    const withdrawalFee = (initialAmount * withdrawalFeePercentage) / 100
    const finalAmount = initialAmount - withdrawalFee
    const data = {
      recives: finalAmount,
      estimated_fee: withdrawalFee,
      amount: initialAmount,
      asset: token,
      memo: "Prices may vary with local service providers",
    }

    return data
  }

  /* 
    This document will allow app create KYC links for their user for verifications
    This can only be used under the condition that the user has enabled Require KYC verification for their app
  */
  async createKYCVerification(kycData: KYCFormI) {
    const result = await this.verifyCreds()
    /* This will return true when the user creds are available in the db and false if they're not available */

    // Verify if the user app requires KYC approved for the user here...
    const requiresKYC = await this.requiresUserKYCApproved()

    if (!requiresKYC)
      throw new Error(
        "App doesnot require users to complete/approve their KYC to make transactions "
      )

    if (!result.success) throw new Error("Invalid credentials")

    // Creates the User's KYC request form here basing on the their payout address
    const createdKYCRequest = await this.createUserKYC(kycData)

    return createdKYCRequest
  }

  /*
    This method returns all the store's active transactions
  */
  async getTransactions() {}
}

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
