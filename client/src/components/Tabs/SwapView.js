import React from "react"

import { useConnectModal } from "@rainbow-me/rainbowkit"

import { Theme, SwapWidget } from "@uniswap/widgets"
import "@uniswap/widgets/fonts.css"
import { ethers } from "ethers"

const theme: Theme = {
  primary: "#000",
  secondary: "#666",
  interactive: "#AFAFAF",
  container: "#DADADA",
  module: "#FFF",
  accent: "#0018F4",
  outline: "#000",
  dialog: "#FFF",
  fontFamily: "Comic Sans MS",
  borderRadius: 0.2,
}
export default function SwapView() {
  const { openConnectModal } = useConnectModal()
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const jsonRpcUrlMap = {
    42220: [
      "https://celo-mainnet.infura.io/v3/26e72a10855f4d949647a2802b9d17de",
    ],
    44787: [
      "https://celo-alfajores.infura.io/v3/26e72a10855f4d949647a2802b9d17de",
    ],
    1: ["https://mainnet.infura.io/v3/26e72a10855f4d949647a2802b9d17de"],
    5: ["https://goerli.infura.io/v3/26e72a10855f4d949647a2802b9d17de"],
    11155111: ["https://sepolia.infura.io/v3/26e72a10855f4d949647a2802b9d17de"],
    97: ["https://data-seed-prebsc-2-s1.binance.org:8545"],
    56: ["https://bsc-dataseed.binance.org"],
  }

  return (
    <div className='flexCenter flexColumn'>
      <div className='Uniswap'>
        {provider ? (
          <SwapWidget
            theme={theme}
            provider={provider}
            jsonRpcUrlMap={jsonRpcUrlMap}
          />
        ) : (
          <SwapWidget
            theme={theme}
            hideConnectionUI={true}
            onConnectWalletClick={() => openConnectModal}
            defaultChainId={56}
          />
        )}
      </div>
    </div>
  )
}
