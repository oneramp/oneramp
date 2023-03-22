const OneRamp = require("oneramp")
const { ethers } = require("hardhat")
require("dotenv").config()
const privateKey = process.env.PRIVATE_KEY

const provider = new ethers.providers.JsonRpcProvider(
  "https://alfajores-forno.celo-testnet.org"
)
const signer = new ethers.Wallet(privateKey, provider)
async function main() {
  try {
    // const signer = provider.getSigner()÷
    // console.log("signer", signer)
  } catch (error) {
    console.log("error", error)
  }
  const oneRamp = new OneRamp(provider, signer)
  console.log("oneRamp connected")
  const amount = ethers.utils.parseEther("1")
  const bigNumberAmount = ethers.BigNumber.from(amount).toString()
  // async function main() {
  oneRamp
    .deposit(
      "256782254444",
      bigNumberAmount,
      "0x7516FE3173Ce835Aa06fA384aa330F39D91135E7"
    )
    .then(() => {
      console.log("Deposit successful")
    })
    .catch((error) => {
      console.error("Deposit failed", error)
    })
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
