import React from "react"
import RampFinance from "../components/Converter/RampFinance.js"
import Wallet from "../components/Converter/WalletConnect.js"

export default function Ramp() {
  return (
    <>
      <div className='flexCenter' style={{ height: "100vh" }}>
        <Wallet />
        <RampFinance />
      </div>
    </>
  )
}
