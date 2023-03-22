const OneRamp = require("oneramp")
const { ethers } = require("ethers")

const provider = new ethers.providers.JsonRpcProvider(
  "https://alfajores-forno.celo-testnet.org"
)

const oneRamp = new OneRamp(provider)

console.log(oneRamp)
