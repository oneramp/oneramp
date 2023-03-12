import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";
import Transfer from "../../assets/svg/Transfer";
import { Box } from "@mui/system";
import { TextField, ThemeProvider } from "@mui/material";

import { theme } from "../../Theme";

const currencies = [
  {
    value: "CUSD",
    label: "$ CUSD",
  },
  {
    value: "EUR",
    label: "€ ETH",
  },
  {
    value: "BTC",
    label: "฿ BTC",
  },
  {
    value: "CELO",
    label: "¥ CELO",
  },
];

export default function CryptoConverter() {
  const [rate, setRate] = useState(3700);
  const [value, setValue] = useState(rate);

  const handleChange = (event) => {
    // 👇 Get input value from "event"
    let n = (event.target.value * rate).toLocaleString(); // add separator
    setValue(n);
  };
  var n = 34523453.345;
  console.log(n.toLocaleString());

  return (
    <>
      <Box
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="2000"
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
          <ThemeProvider theme={theme}>
            <Box fontSize={12}>You Buy</Box>

            <TextField
              fullWidth
              onChange={handleChange}
              className="inputRounded"
              defaultValue={1}
              type="number"
              variant="outlined"
            />

            <Box sx={{ height: 20, width: 20, m: 2 }}>
              <Transfer />
            </Box>

            <Box fontSize={12}>Select Your Currency</Box>

            <TextField
              className="inputRounded"
              select
              fullWidth
              type="number"
              defaultValue="ETH"
              SelectProps={{
                native: true,
              }}
              variant="outlined"
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            <Box sx={{ fontSize: 20, textAlign: "center" }}>
              1BTC = <b>UGX {value}</b>
            </Box>

            <FullButton title="Approve" />
          </ThemeProvider>
          <div className="blue_gradient" />
        </Box>
      </Box>
      <div className="blue_gradient" />
    </>
  );
}
