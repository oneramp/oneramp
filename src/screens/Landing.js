import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Features from "../components/Sections/Features";
import Projects from "../components/Sections/Projects";
import Footer from "../components/Sections/Footer";

export default function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Features />
      <Projects />
      <Footer />
    </>
  );
}
