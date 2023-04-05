import React, { useState, useEffect } from "react"
import chains from "../utils/supportedChains.json"
import { ethers } from "ethers"
import { handleNetworkSwitch } from "./switchNetworks"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const Networks = () => {
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
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>select network</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={activeChain}
          autoWidth
          label='select network'
          onChange={(event) => setActiveChain(event.target.value)}
        >
          {chains.map(({ chainName, chainid }, index) => (
            <MenuItem
              key={index}
              value={chainName}
              onClick={async () => {
                if (typeof onSelect === "function");

                if (chainId !== chainid) {
                  await handleNetworkSwitch(chainid)
                  setActiveChain(chainName)
                } else {
                  setActiveChain(chainName)
                }
              }}
            >
              {chainName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Networks
