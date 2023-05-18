import React from "react"
import { Box } from "@mui/system"
import TabView from "./TabPanel"
import SellView from "../Tabs/SellView"
import BuyView from "../Tabs/BuyView"

export default function RampFinance() {
  return (
    <>
      <Box
        data-aos='fade-up'
        data-aos-duration='1500'
        data-aos-delay='1000'
        className='gradient-border'
        sx={{
          height: 500,
          backgroundColor: "#1a1a1a",
          borderRadius: 5,
          p: 0.3,
          width: 500,
          zIndex: 9,
        }}
      >
        <Box
          sx={{
            height: "-webkit-fill-available",
            backgroundColor: "black",
            borderRadius: 5,
            justifyContent: "space-around",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            py: "10%",
            px: "15%",
          }}
        >
          {/* ----- */}

          <TabView children={[SellView(), BuyView()]} />

          {/* ----- */}
          <div className='blue_gradient' />
        </Box>
      </Box>
      <div className='blue_gradient' />
    </>
  )
}
