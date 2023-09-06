// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { appendFileSync } = require("fs")
const {
  DefenderRelayProvider,
  DefenderRelaySigner,
} = require("defender-relay-client/lib/ethers")

const credentials = {
  apiKey: process.env.BSC_TESTNET_RELAYER_API_KEY,
  apiSecret: process.env.BSC_TESTNET_RELAYER_API_SECRET,
}
const provider = new DefenderRelayProvider(credentials)
const relaySigner = new DefenderRelaySigner(credentials, provider, {
  speed: "fast",
})

async function main() {
  const OffRampContract = await ethers.getContractFactory("OffRampContract")
  const offRampContract = await OffRampContract.connect(relaySigner).deploy()
  await offRampContract.deployed()

  const ERC20TokenMock = await ethers.getContractFactory("ERC20TokenMock")
  const ERC20TokenMock2 = await ethers.getContractFactory("ERC20TokenMock2")
  const ERC20TokenMock3 = await ethers.getContractFactory("ERC20TokenMock")
  const ERC20TokenMock4 = await ethers.getContractFactory("ERC20TokenMock2")
  token1 = await ERC20TokenMock.deploy()
  token2 = await ERC20TokenMock2.deploy()
  token3 = await ERC20TokenMock3.deploy()
  token4 = await ERC20TokenMock4.deploy()
  await token1.deployed()
  await token2.deployed()
  await token3.deployed()
  await token4.deployed()
  await offRampContract.connect(relaySigner).addAllowedToken(token1.address)
  await offRampContract.connect(relaySigner).addAllowedToken(token2.address)
  await offRampContract.connect(relaySigner).addAllowedToken(token3.address)
  await offRampContract.connect(relaySigner).addAllowedToken(token4.address)

  appendFileSync(
    "deployContracts.json",
    `\nBSC_contract=${forwarder.address}\nBSC_token1 =${offRamp.address}\n BSC_token2 : ${token1.address} BSC_token2 : ${token2.address} BSC_token3 : ${token3.address} BSC_token4 : ${token3.address}`
  )

  console.log(
    `contract: ${offRampContract.address} \n token: ${token1.address} \n token2: ${token2.address} \n token3: ${token3.address} \n token3: ${token4.address}`
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
