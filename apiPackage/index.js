const { ethers } = require("ethers")
const { offRampCreated, initiatePayment } = require("./controllers/offramp")
class OneRamp {
  constructor(provider, signer) {
    this.provider = provider
    this.signer = signer
  }

  async deposit(chainId, phoneNumber, fiatAmount, tokenAddress, cryptoAmount) {
    // Add your logic for selecting the contract address based on the chainId.
    // For example, you can have a mapping of chainId to contract addresses.
    const contractAddresses = {
      1: "0xA3b848435255881189Db308D06E2D24B2ec0A818", // Ethereum Mainnet
      56: "0x1234567890123456789012345678901234567890", // Binance Smart Chain
      // ...
    }

    if (!contractAddress) {
      console.error(`Unsupported chainId: ${chainId}`)
      return
    }
    const abi = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
        ],
        name: "depositToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ]
    const contractAddress = contractAddresses[chainId]
    const contract = new ethers.Contract(
      // Deployed contract address. Replace with actual address.
      contractAddress,
      abi,
      this.signer
    )
    // Deposit token.
    const abit = [
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ]
    const tokenContract = new ethers.Contract(tokenAddress, abit, this.signer)
    const approveTx = await tokenContract.approve(
      "0xA3b848435255881189Db308D06E2D24B2ec0A818",
      amount
    )
    const receipt = await this.provider.waitForTransaction(approveTx.hash, 1)
    console.log("Transaction mined:", receipt)

    // await new Promise((resolve) => setTimeout(resolve, 5000)) // Wait for 5 seconds
    const allowance = await tokenContract.allowance(
      this.signer.address,
      "0xA3b848435255881189Db308D06E2D24B2ec0A818"
    )
    console.log("Current allowance:", allowance.toString())
    if (allowance < amount) {
      console.error(
        "Insufficient allowance. Please approve more tokens before depositing."
      )
      return
    }
    const tx = await contract.depositToken(tokenAddress, amount)

    // Wait for 10 block confirmations.
    await this.provider.waitForTransaction(tx.hash, 2)

    console.log("Deposit successful. Transaction hash:", tx.hash)

    // Initiate Flutterwave payment.
    // await initiatePayment(phoneNumber, 60000, "UGX")
  }
}

module.exports = OneRamp
