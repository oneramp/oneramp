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
      url: `https://celo-mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    },
    celo: {
      url: `https://celo-alfajores.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 56,
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-2-s1.binance.org:8545",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
    },
  },
  etherscan: {
    apiKey: {
      alfajores: process.env.CELOSCAN_API_KEY,
      celo: process.env.CELOSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
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
    // enabled: true,
    currency: "USD",
    token: "BNB",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
}
