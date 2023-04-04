import React, { useState } from "react"
import FullButton from "../Buttons/FullButton"
import Transfer from "../../assets/svg/Transfer"
import { Box } from "@mui/system"
import { Grid } from "@mui/material"
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
const countries = [
  {
    value: "UGX",
    label: "UG",
  },

  {
    value: "KES",
    label: "KE",
  },
]

export default function CryptoConverter() {
  const navigate = useNavigate()
  const location = useLocation()

  const [rate, setRate] = useState(3700)
  const [value, setValue] = useState(rate)
  const [number, setNumber] = useState(1)
  const [selectedCurrency, setSelectedCurrency] = useState("CUSD")
  // eslint-disable-next-line
  const [selectedCountry, setSelectedCountry] = useState("UGX")

  function handleClick() {
    if (location.pathname !== "/ramp") {
      navigate("/ramp")
    }
  }
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value)
  }
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value)
    if (event.target.value === "UGX") {
      setRate(3700)
    } else {
      // Add conversion rate for other countries
      setRate(1)
    }
  }

  const handleChange = (event) => {
    // 👇 Get input value from "event"
    let n = (event.target.value * rate).toLocaleString() // add separator
    setValue(n)
    setNumber(event.target.value)
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

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                onChange={handleChange}
                className='inputRounded'
                defaultValue={1}
                type='number'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className='inputRounded'
                select
                fullWidth
                defaultValue='UGX'
                onChange={handleCountryChange}
                SelectProps={{
                  native: true,
                }}
                variant='outlined'
              >
                {countries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Box sx={{ height: 20, width: 20, m: 2 }}>
            <Transfer />
          </Box>

          <Box fontSize={12} marginBottom={1}>
            Select Your Currency
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                onChange={handleChange}
                className='inputRounded'
                defaultValue={1}
                type='number'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className='inputRounded'
                select
                fullWidth
                type='number'
                defaultValue='CUSD'
                onChange={handleCurrencyChange}
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
            </Grid>
          </Grid>

          <Box sx={{ fontSize: 20, textAlign: "center", py: 2 }}>
            {number}
            {selectedCurrency}= <b>UGX {value}</b>
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
            You sell
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                className='inputRounded'
                select
                fullWidth
                type='number'
                defaultValue='CUSD'
                onChange={handleCurrencyChange}
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
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                onChange={handleChange}
                className='inputRounded'
                defaultValue={1}
                type='number'
                variant='outlined'
              />
            </Grid>
          </Grid>

          <Box sx={{ height: 20, width: 20, m: 2 }}>
            <Transfer />
          </Box>

          <Box fontSize={12} marginBottom={1}>
            Select Your Currency
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                className='inputRounded'
                select
                fullWidth
                defaultValue='UGX'
                onChange={handleCountryChange}
                SelectProps={{
                  native: true,
                }}
                variant='outlined'
              >
                {countries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                onChange={handleChange}
                className='inputRounded'
                defaultValue={1}
                type='number'
                variant='outlined'
              />
            </Grid>
          </Grid>

          <Box sx={{ fontSize: 20, textAlign: "center", py: 2 }}>
            {number}
            {selectedCurrency}= <b>UGX {value}</b>
          </Box>

          <FullButton title='Launch App' action={handleClick} />
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
