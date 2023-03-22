// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const fs = require("fs")

async function main() {
  const OffRampContract = await ethers.getContractFactory("OffRampContract")
  const offRampContract = await OffRampContract.deploy()
  await offRampContract.deployed()

  const ERC20TokenMock = await ethers.getContractFactory("ERC20TokenMock")
  const ERC20TokenMock2 = await ethers.getContractFactory("ERC20TokenMock2")
  token = await ERC20TokenMock.deploy()
  token2 = await ERC20TokenMock2.deploy()
  await token.deployed()
  await token2.deployed()
  await offRampContract.addAllowedToken(token.address)
  await offRampContract.addAllowedToken(token2.address)

  // fs.writeFileSync(
  //   "deployContractsCelo.json",
  //   JSON.stringify(
  //     {
  //       contract: offRampContract.address,
  //       token: token.address,
  //       token2: token2.address,
  //     },
  //     null,
  //     2
  //   )
  // )

  console.log(
    `contract: ${offRampContract.address} \n token: ${token.address} \n token2: ${token2.address}`
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
