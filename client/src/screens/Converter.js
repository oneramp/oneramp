import React from "react";
import CryptoConverter from "../components/Converter/CryptoConverter";

export default function Converter() {
  return (
    <>
      <div className="flexCenter" style={{ height: "100vh" }}>
        <CryptoConverter />
      </div>
    </>
  );
}
