import React from "react";
import { Box } from "@mui/system";
import TabView from "./TabPanel";
import SellView from "../Tabs/SellView";
import BuyView from "../Tabs/BuyView";
import { useProvider, useSigner } from "wagmi";
import OneRamp from "oneramp";

export default function RampFinance() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const clientPub = "RMPPUBK-cacbc4ef3f9703a3429b-X";
  const secretKey = "RMPSEC-a2fd9f528ef158d4f7e8b55741f9ce34e9bb6892-X";

  async function handleClick() {
    const oneRamp = new OneRamp("alfajores", clientPub, secretKey);

    if (signer) {
      oneRamp.setSigner(signer);
    }

    if (provider) {
      oneRamp.setProvider(provider);
    }
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
