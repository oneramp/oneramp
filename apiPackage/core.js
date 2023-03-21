const { ethers } = require("ethers")
const { offRampCreated } = require("../controllers/offramp")

class OneRamp {
  constructor(provider, privateKey) {
    this.provider = new ethers.providers.JsonRpcProvider(provider)
    this.signer = new ethers.Wallet(privateKey, this.provider)
  }

  async deposit(network, name, phoneNumber, amount, tokenAddress, chainId) {
    const contract = new ethers.Contract(
      // Deployed contract address. Replace with actual address.
      "0xCONTRACT_ADDRESS",
      CashOutContract.abi,
      this.signer
    )

    // Deposit token.
    const tokenContract = new ethers.Contract(
      tokenAddress,
      CashOutContract.abi,
      this.signer
    )
    await tokenContract.approve(contract.address, amount)
    const tx = await contract.depositToken(tokenAddress, amount)

    // Wait for 10 block confirmations.
    await this.provider.waitForTransaction(tx.hash, 10)

    // Initiate Flutterwave payment.
    cashoutCreated({
      body: {
        phoneNumber,
        intocurrency: amount,
        currency: "UGX",
      },
    })
  }
}

module.exports = OneRamp
