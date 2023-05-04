import Aos from "aos"
import "aos/dist/aos.css"
import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { ThemeProvider } from "styled-components"
// Screens
import Landing from "./screens/Landing.js"
import { theme } from "./Theme.js"
import { Route, Routes } from "react-router-dom"
import Ramp from "./screens/Ramp.js"
import "@rainbow-me/rainbowkit/styles.css"
import {
  // getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit"
import { trustWallet } from "@rainbow-me/rainbowkit/wallets"
import { WagmiConfig, configureChains, createClient } from "wagmi"
import {
  mainnet,
  polygon,
  bsc,
  bscTestnet,
  celo,
  celoAlfajores,
} from "wagmi/chains"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"
// import { getDefaultProvider } from "ethers"
import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"
const { chains, provider } = configureChains(
  [mainnet, polygon, bsc, bscTestnet, celo, celoAlfajores],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
    publicProvider(),
  ]
)
// const connectors = connectorsForWallets([
//   {
//     groupName: 'Recommended for Celo chains',
//     wallets: getWalletConnectors(chains),
//   },
// ])
// const { connectors } = getDefaultWallets({
//   appName: "OneRamp finance",
//   chains,
//   wallets: connectorsForWallets(chains),
// })

const projectId = "EPipXybe2a8n7lGnabv01Wia92Sz5J2Y"

const isMobileDevice = () => {
  const userAgent = window.navigator.userAgent
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  )
}

const suggestedWallets = [
  injectedWallet({ chains }),
  rainbowWallet({ projectId, chains }),
  metaMaskWallet({ projectId, chains }),
  coinbaseWallet({ chains, appName: "My RainbowKit App" }),
]

if (isMobileDevice()) {
  suggestedWallets.push(trustWallet({ projectId, chains }))
} else {
  suggestedWallets.push(walletConnectWallet({ projectId, chains }))
}

const connectors = connectorsForWallets([
  {
    groupName: "Suggested",
    wallets: suggestedWallets,
  },
])
const client = createClient({
  autoConnect: true,
  provider,
  connectors,
})

export default function App() {
  useEffect(() => {
    Aos.init()
    Aos.refresh()
  }, [])

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "black",
          borderRadius: "small",
          fontStack: "system",
        })}
      >
        <ThemeProvider theme={theme}>
          <>
            <Helmet>
              <link rel='preconnect' href='https://fonts.googleapis.com' />
              <link
                rel='preconnect'
                href='https://fonts.gstatic.com'
                crossorigin
              />
              <link
                href='https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap'
                rel='stylesheet'
              />
            </Helmet>
            <Routes>
              <Route path='/' exact={true} element={<Landing />} />

              <Route path='/ramp' exact={true} element={<Ramp />} />
            </Routes>
          </>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
