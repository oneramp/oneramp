import { ethers, Signer } from "ethers"
import tokenABI from "./abi.json"
import onerampABI from "./abit.json"

import { createTransaction } from "./shared/transactions"

import addresses, {
  IfcOneNetworksAddresses,
  IfcAddresses,
} from "./src/utils/address"
import Request from "./src/utils/request"

type Network = "bscTestnet" | "bsc" | "celo" | "alfajores"

function getAllAddresses(addresses: IfcAddresses): string[] {
  let allAddresses: string[] = []
  for (const networkKey in addresses) {
    const network = addresses[networkKey as keyof IfcAddresses]
    allAddresses.push(network.usdt, network.stable, network.dai)
  }
  return allAddresses
}

export class OneRamp {
  signer: Signer | undefined
  provider: ethers.providers.Provider | undefined
  network: Network
  pubKey: string
  secretKey: string
  addresses: IfcOneNetworksAddresses

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

  setSigner = (signer: Signer) => {
    this.signer = signer
  }

  setProvider = (provider: ethers.providers.Provider) => {
    this.provider = provider
  }

  async deposit(tokenAddress: string, amount: number): Promise<void> {
    const result = await this.verifyCreds()
    /* This will return true when the user creds are available in the db and false if they're not available */

    console.log("DEBUG----", result)

    if (!result.success) throw new Error("Invalid credentials")

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

    const signerAddress = await signer.getAddress()

    const allowance = await tokenContract.allowance(
      signerAddress,
      addresses[this.network].contract
    )
    console.log("Current allowance:", allowance.toString())

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

    // Create a new transaction in the database.
    const newTransaction = {
      store: result.store,
      txHash: tx.hash,
      amount: amount,
      fiat: amount,
      phone: "256700719619",
      asset: "cUSD",
      status: "Success",
    }

    const txData = await createTransaction(newTransaction)

    // const newTx = await createTransaction(newTransaction)
    // await createTransaction(newTransaction);

    console.log("New transaction created:", txData)

    return
    // Initiate Flutterwave payment.
    // await initiatePayment(phoneNumber, 60000, "UGX")
  }
}
