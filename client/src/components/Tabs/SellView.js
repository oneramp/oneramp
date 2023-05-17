import React, { useState, useEffect } from "react"
import FullButton from "../Buttons/FullButton"
import Transfer from "../../assets/svg/Transfer"
import { Box } from "@mui/system"
import { Grid } from "@mui/material"
import { TextField, ThemeProvider } from "@mui/material"
import { theme } from "../../Theme"

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

export default function SellView(signer) {
  const navigate = useNavigate()
  const location = useLocation()

  const [rate, setRate] = useState(0)
  // eslint-disable-next-line
  const [value, setValue] = useState(0)
  const [cvalue, setcValue] = useState(0)
  const [cashValue, setCashValue] = useState(0)
  // eslint-disable-next-line
  const [cryptoValue, setCryptoValue] = useState(0)
  // eslint-disable-next-line
  const [exchangeRates, setExchangeRates] = useState({})
  const [selectedCurrency, setSelectedCurrency] = useState("CUSD")
  // eslint-disable-next-line
  const [selectedCountry, setSelectedCountry] = useState("UGX")

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data.rates)
        setRate(data.rates[selectedCountry].toFixed(0))
      })
      .catch((error) => console.error("Error fetching exchange rates:", error))
  }, [selectedCountry])

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
  }

  const handleChange = (event) => {
    // Get input value from "event"
    let inputValue = event.target.value
    // Display USD equivalent
    setValue(inputValue)
    setCryptoValue((inputValue / rate).toFixed(2))
  }
  const handleSellChange = (event) => {
    // Get input value from "event"
    let inputValue = event.target.value
    // Display USD equivalent
    setcValue(inputValue)
    setCashValue((inputValue * rate).toFixed(2))
  }
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
              onChange={handleSellChange}
              className='inputRounded'
              defaultValue={1}
              value={cvalue}
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
              value={cashValue}
              type='number'
              variant='outlined'
              disabled
            />
          </Grid>
        </Grid>
        {cvalue > 0 ? (
          <Box sx={{ fontSize: 20, textAlign: "center", py: 2 }}>
            {cvalue}
            {selectedCurrency}={" "}
            <b>
              {selectedCountry} {cashValue}
            </b>
          </Box>
        ) : (
          <Box sx={{ fontSize: 20, textAlign: "center", py: 2 }}>
            1{selectedCurrency}={" "}
            <b>
              {selectedCountry} {rate}
            </b>
          </Box>
        )}

        <FullButton title='Approve' action={handleClick} />
      </ThemeProvider>
    </div>
  )
}