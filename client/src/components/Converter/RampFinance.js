import React, { useState, useEffect } from "react";
import FullButton from "../Buttons/FullButton";
import Transfer from "../../assets/svg/Transfer";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { TextField, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme";
import TabView from "./TabPanel";

import { useProvider, useSigner } from "wagmi";
// import { parseEther } from "ethers/lib/utils.js"
import OneRamp from "oneramp";

const currencies = [
  {
    value: "CUSD",
    label: "CUSD",
  },

  {
    value: "CELO",
    label: "CELO",
  },
];
const countries = [
  {
    value: "UGX",
    label: "UG",
  },

  {
    value: "KES",
    label: "KE",
  },
];

export default function RampFinance() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const clientPub = "RMPPUBK-cacbc4ef3f9703a3429b-X";
  const secretKey = "RMPSEC-a2fd9f528ef158d4f7e8b55741f9ce34e9bb6892-X";

  const oneRamp = new OneRamp("alfajores", clientPub, secretKey);

  signer && oneRamp.setSigner(signer);
  provider && oneRamp.setProvider(provider);

  const [rate, setRate] = useState(0);
  const [value, setValue] = useState(0);
  const [cvalue, setcValue] = useState(0);
  const [cashValue, setCashValue] = useState(0);

  const [cryptoValue, setCryptoValue] = useState(0);
  // eslint-disable-next-line
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("CUSD");
  // eslint-disable-next-line
  const [selectedCountry, setSelectedCountry] = useState("UGX");

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data.rates);
        setRate(data.rates[selectedCountry].toFixed(0));
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, [selectedCountry]);

  async function handleClick() {
    try {
      // Attempt to deposit 1000 units of the specified token
      const tx = await oneRamp.deposit(
        "0xc0EBB770F2c9CA7eD0dDeBa58Af101695Cf1BDc1",
        34500000000
      );
      // If successful, log the transaction
      console.log(tx);
    } catch (error) {
      // If an error occurs, log it
      console.error("Error depositing:", error);
    }
  }

  return (
    <>
      <Box
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="1000"
        className="gradient-border"
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

          <TabView children={[SellView(handleClick), BuyView()]} />

          {/* ----- */}
          <div className="blue_gradient" />
        </Box>
      </Box>
      <div className="blue_gradient" />
    </>
  );
}
