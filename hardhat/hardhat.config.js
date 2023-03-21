require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-foundry")
require("hardhat-gas-reporter")
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
    ],
  },
  networks: {
    alfajores: {
      // url: "https://alfajores-forno.celo-testnet.org",
      url: "https://celo-hackathon.lavanet.xyz/celo-alfajores/http",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    },
    celo: {
      // url: "https://forno.celo.org",
      url: "https://celo-hackathon.lavanet.xyz/celo/http",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
  },
  etherscan: {
    apiKey: {
      alfajores: process.env.CELOSCAN_API_KEY,
      celo: process.env.CELOSCAN_API_KEY,
    },
    customChains: [
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io",
        },
      },
      {
        network: "celo",
        chainId: 44220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io",
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    token: "BNB",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
}
