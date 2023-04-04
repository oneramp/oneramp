import React, { useState, useRef, useEffect } from "react"
import { handleNetworkSwitch } from "./switchNetwork"
// import { chevronDown } from "../assets"÷
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useOnClickOutside } from "./helpers"
import styles from "../styles"
import chains from "../utils/cryptoname.json"
import { ethers } from "ethers"
const Networks = () => {
  const [showList, setShowList] = useState(false)
  const [chainId, setChainId] = useState(0)
  const [activeChain, setActiveChain] = useState("Select Network")

  useEffect(() => {
    async function getChainId() {
      const provider = new ethers.providers.getDefaultProvider()
      const network = await provider.getNetwork()
      const chainName = chains.find(
        (chain) => chain.chainid === network.chainId
      )
      setChainId(network.chainId)
      setActiveChain(chainName.chainName)
    }
    getChainId()
  }, [chainId, activeChain])

  const ref = useRef()

  useOnClickOutside(ref, () => setShowList(false))
  return (
    <div className='relative' onClick={() => setShowList(!showList)}>
      <button className={styles.currencyButton}>
        {activeChain}
        <img
          src={ExpandMoreIcon}
          alt='cheveron-down'
          className={`w-4 h-4 object-contain ml-2 ${
            showList ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {showList && (
        <ul ref={ref} className={styles.currencyList}>
          {chains.map(({ chainName, chainid }, index) => (
            <li
              key={index}
              className={`${styles.currencyListItem} ${
                activeChain === chainName ? "bg-site-dim2" : ""
              } cursor-pointer`}
              onClick={async () => {
                if (typeof onSelect === "function");

                if (chainId !== chainid) {
                  await handleNetworkSwitch(chainid)
                  setActiveChain(chainName)
                } else {
                  setActiveChain(chainName)
                }

                setShowList(false)
              }}
            >
              {chainName}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Networks
