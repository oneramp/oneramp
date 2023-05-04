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
import { Valora } from "@celo/rainbowkit-celo/wallets"
import {
  // getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  // DisclaimerComponent,
} from "@rainbow-me/rainbowkit"
import { trustWallet } from "@rainbow-me/rainbowkit/wallets"
import { WagmiConfig, configureChains, createClient } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import {
  mainnet,
  polygon,
  bsc,
  bscTestnet,
  celo,
  celoAlfajores,
} from "wagmi/chains"
import { ToastContainer, Zoom, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
    alchemyProvider({ apiKey: "EPipXybe2a8n7lGnabv01Wia92Sz5J2Y" }),
    publicProvider(),
  ]
)
const projectId = "EPipXybe2a8n7lGnabv01Wia92Sz5J2Y"

const isMobileDevice = () => {
  const userAgent = window.navigator.userAgent
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  )
}
type WalletConnector = (p: { chains: Chain[] }) => Wallet
function withLocalIconUrl(
  connector: WalletConnector,
  iconUrl: string,
  chains: Chain[]
) {
  return { ...connector({ chains }), iconUrl }
}

const suggestedWallets = [
  injectedWallet({ chains }),
  rainbowWallet({ projectId, chains }),
  metaMaskWallet({ projectId, chains }),
  coinbaseWallet({ chains, appName: "My RainbowKit App" }),
  withLocalIconUrl(Valora, "./wallets/valora.svg", chains),
  // walletConnectWallet({ projectId, chains }),
]

if (isMobileDevice()) {
  suggestedWallets.push(trustWallet({ projectId, chains }))
  // suggestedWallets.push(walletConnectWallet({ projectId, chains }))
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
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
        appInfo={{
          appName: "Oneramp",
          appIcon: "./logo-light.svg",
        }}
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
          <ToastContainer
            transition={Zoom}
            position={toast.POSITION.BOTTOM_RIGHT}
            limit={2}
          />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
