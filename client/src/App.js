import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
// Screens
import Landing from "./screens/Landing.js";
import { theme } from "./Theme.js";
import { Navigate, Route, Routes } from "react-router-dom";
import Converter from "./screens/Converter.js";

export default function App() {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Routes>
          <Route path="/" exact={true} element={<Landing />} />

          <Route path="/converter" exact={true} element={<Converter />} />
        </Routes>
      </>
    </ThemeProvider>
  );
}
