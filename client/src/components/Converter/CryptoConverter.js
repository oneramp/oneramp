import React, { useState } from "react"
import FullButton from "../Buttons/FullButton"
import Transfer from "../../assets/svg/Transfer"
import { Box } from "@mui/system"
import { TextField, ThemeProvider } from "@mui/material"
import { theme } from "../../Theme"
import TabView from "./TabPanel"
import { useLocation, useNavigate } from "react-router-dom"

const currencies = [
  {
    value: "CUSD",
    label: "CUSD",
  },

  {
    value: "CELO",
    label: "CELO",
  },
]

export default function CryptoConverter() {
  const navigate = useNavigate()
  const location = useLocation()

  const [rate] = useState(3700)
  const [value, setValue] = useState(rate)

  function handleClick() {
    if (location.pathname !== "/ramp") {
      navigate("/ramp")
    }
  }

  const handleChange = (event) => {
    // 👇 Get input value from "event"
    let n = (event.target.value * rate).toLocaleString() // add separator
    setValue(n)
  }
  var n = 34523453.345
  console.log(n.toLocaleString())

  function BuyView() {
    return (
      <div className='flexCenter flexColumn'>
        <ThemeProvider theme={theme}>
          <Box fontSize={12} marginBottom={1}>
            You Buy
          </Box>

          <TextField
            fullWidth
            onChange={handleChange}
            className='inputRounded'
            defaultValue={1}
            type='number'
            variant='outlined'
          />

          <Box sx={{ height: 20, width: 20, m: 2 }}>
            <Transfer />
          </Box>

          <Box fontSize={12} marginBottom={1}>
            Select Your Currency
          </Box>

          <TextField
            className='inputRounded'
            select
            fullWidth
            type='number'
            defaultValue='ETH'
            SelectProps={{
              native: true,
            }}
            variant='outlined'
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <Box sx={{ fontSize: 20, textAlign: "center", py: 2 }}>
            1CUSD = <b>UGX {value}</b>
          </Box>

          <FullButton title='Launch App' action={handleClick} />
        </ThemeProvider>
      </div>
    )
  }

  function SellView() {
    return (
      <div className='flexCenter flexColumn'>
        <ThemeProvider theme={theme}>
          <Box fontSize={12} marginBottom={1}>
            Select Your Currency
          </Box>

          <TextField
            className='inputRounded'
            select
            fullWidth
            type='number'
            defaultValue='ETH'
            SelectProps={{
              native: true,
            }}
            variant='outlined'
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <Box sx={{ height: 20, width: 20, m: 2 }}>
            <Transfer />
          </Box>

          <Box fontSize={12} marginBottom={1}>
            You Sell
          </Box>

          <TextField
            fullWidth
            onChange={handleChange}
            className='inputRounded'
            defaultValue={1}
            type='number'
            variant='outlined'
          />

          <Box sx={{ fontSize: 20, textAlign: "center", py: 2 }}>
            1BTC = <b>UGX {value}</b>
          </Box>

          <FullButton title='Approve' />
        </ThemeProvider>
      </div>
    )
  }

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

          <TabView children={[BuyView(), SellView()]} />

          {/* ----- */}
          <div className='blue_gradient' />
        </Box>
      </Box>
      <div className='blue_gradient' />
    </>
  )
}
