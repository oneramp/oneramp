import React, { useState, useEffect } from "react"
import FullButton from "../Buttons/FullButton"
import Transfer from "../../assets/svg/Transfer"
import { Box } from "@mui/system"
import { Grid } from "@mui/material"
import { TextField, ThemeProvider } from "@mui/material"
import { theme } from "../../Theme"
import { useSigner, useProvider } from "wagmi"
import addresses from "../../utils/addresses"
import { offramp } from "oneramp"

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
const countryPhonePrefixes = {
  UGX: "+256",
  KES: "+254",
  NGN: "+234",
  // add other countries here as needed
}
export default function SellView() {
  const provider = useProvider()
  const { data: signer } = useSigner()

  const [rate, setRate] = useState(0)
  // eslint-disable-next-line
  const [value, setValue] = useState(0)
  const [cvalue, setcValue] = useState(0)
  const [cashValue, setCashValue] = useState(0)
  // eslint-disable-next-line
  const [cryptoValue, setCryptoValue] = useState(0)
  // eslint-disable-next-line
  const [exchangeRates, setExchangeRates] = useState({})
  const [selectedToken, setSelectedToken] = useState("CUSD")
  // eslint-disable-next-line
  const [selectedCountry, setSelectedCountry] = useState("UGX")
  const [tokens, setTokens] = useState([])
  const [phonePrefix, setPhonePrefix] = useState("+256") // Default to UG
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isApproved, setIsApproved] = useState(false)

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data.rates)
        setRate(data.rates[selectedCountry].toFixed(0))
      })
      .catch((error) => console.error("Error fetching exchange rates:", error))
  }, [selectedCountry])
  useEffect(() => {
    if (provider) {
      async function setTokensList() {
        let network = await provider.getNetwork()
        let chainId = network.chainId
        let tokenList = addresses[chainId].tokens
        if (Object.keys(tokenList).length > 0) {
          setSelectedToken(Object.keys(tokenList)[0])
        }
        setTokens(tokenList)
      }

      setTokensList()
    }
  }, [signer, provider])

  async function handleApprove() {
    if (!signer && !provider) return
    const offRamp = new offramp("bscTestnet")
    offRamp.setSigner(signer)
    offRamp.setProvider(provider)
    if (phoneNumber === phonePrefix) {
      alert("Please enter your phone number")
      return
    }

    // Here is where you get the address of the selected token.
    const selectedTokenAddress = tokens[selectedToken]

    // Use selectedTokenAddress in your approveToken function
    const tx = await offRamp.approve(selectedTokenAddress, cvalue)

    console.log("selectedTokenAddress", selectedTokenAddress)
    setIsApproved(tx)
    return tx
  }
  async function handleOfframp() {
    if (!signer && !provider) return
    const offRamp = new offramp("bscTestnet")
    offRamp.setSigner(signer)
    offRamp.setProvider(provider)

    // Here is where you get the address of the selected token.
    const selectedTokenAddress = tokens[selectedToken]

    // Use selectedTokenAddress in your approveToken function
    const tx = await offRamp.deposit(selectedTokenAddress, cvalue, phoneNumber)

    console.log("transaction", tx)
    setIsApproved(false)
    return tx
  }
  const handleTokenChange = (event) => {
    setSelectedToken(event.target.value)
  }
  const handleSellChange = (event) => {
    // Get input value from "event"
    let inputValue = event.target.value
    // Display USD equivalent
    setcValue(inputValue)
    setCashValue((inputValue * rate).toFixed(2))
  }
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value)
    setPhonePrefix(countryPhonePrefixes[event.target.value])
  }
  const handlePhoneNumberChange = (event) => {
    // Get the input value without the prefix
    const rawNum = event.target.value.replace(phonePrefix, "")

    // Limit input to 9 digits and only allow numbers
    const onlyNums = rawNum.replace(/[^0-9]/g, "")
    if (onlyNums.length <= 9) {
      setPhoneNumber(phonePrefix + onlyNums)
    }
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
              onChange={handleTokenChange}
              SelectProps={{
                native: true,
              }}
              variant='outlined'
            >
              {Object.keys(tokens).map((tokenName) => (
                <option key={tokenName} value={tokenName}>
                  {tokenName}
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
              onChange={handlePhoneNumberChange}
              className='inputRounded'
              value={phoneNumber}
              type='tel'
              variant='outlined'
            />
          </Grid>
        </Grid>
        {cvalue > 0 ? (
          <Box sx={{ fontSize: 20, textAlign: "center", py: 2 }}>
            {cvalue}
            {selectedToken}={" "}
            <b>
              {selectedCountry} {cashValue}
            </b>
          </Box>
        ) : (
          <Box sx={{ fontSize: 20, textAlign: "center", py: 2 }}>
            1{selectedToken}={" "}
            <b>
              {selectedCountry} {rate}
            </b>
          </Box>
        )}
        {isApproved ? (
          <FullButton title='OFFRAMP' action={handleOfframp} />
        ) : (
          <FullButton title='APPROVE' action={handleApprove} />
        )}
      </ThemeProvider>
    </div>
  )
}
