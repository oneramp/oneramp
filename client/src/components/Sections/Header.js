import React from "react";
import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import HeaderImage from "../../assets/svg/crypto-portfolio.svg";
import QuotesIcon from "../../assets/svg/Quotes";
import Dots from "../../assets/svg/Dots";
import Transfer from "../../assets/svg/Transfer";
import { Box } from "@mui/system";
import { Button, TextField, ThemeProvider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { theme } from "../../Theme";
import CryptoConverter from "../Converter/CryptoConverter";

export default function Header() {
  return (
    <Wrapper id="home" className="container flexSpaceCenter">
      <LeftSide className="flexCenter">
        <div>
          <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="1500">
            <h1 className="extraBold font60">Welcome to OneRamp.</h1>
          </div>
          <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
            <Box sx={{ fontSize: 20 }}>
              Your <b>One-Stop</b> Crypto On- and Off-Ramping Solution
            </Box>
          </div>

          <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="800">
            <HeaderP className="font13 semiBold">
              At OneRamp, we believe in making crypto accessible to everyone.
              That's why we've created a seamless, user-friendly platform that
              makes it easy to buy, and sell your crypto assets.
            </HeaderP>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="1000"
            // data-aos-offset="150"
          >
            <BtnWrapper>
              <FullButton title="Get Started" />
            </BtnWrapper>
          </div>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
          {/* <Img
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="2000"
            data-aos-offset="-150"
            backgroundColor="white"
            className="radius8"
            src={HeaderImage}
            alt="office"
            style={{ zIndex: 9 }}
          />
          <QuoteWrapper
            className="flexCenter darkBg radius8"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="1500"
          >
            <QuotesWrapper>
              <QuotesIcon />
            </QuotesWrapper>
            <div>
              <p className="font15 whiteColor">
                <em>
                  At OneRamp, we believe in making crypto accessible to
                  everyone.
                </em>
              </p>
              <p
                className="font13 highlightColor textRight"
                style={{ marginTop: "10px" }}
              >
                Let's start today!
              </p>
            </div>
          </QuoteWrapper> */}

          <CryptoConverter />

          <DotsWrapper>
            <Dots />
          </DotsWrapper>
        </ImageWrapper>
        <GreyDiv style={{ backgroundColor: "#191919" }}></GreyDiv>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            backgroundImage:
              "https://t3.ftcdn.net/jpg/02/06/66/26/360_F_206662634_16JnrFAXoGVlBok3CEMX3oJdM7aqg5LX.jpg",
            backgroundColor: "white",
            opacity: 0.8,
            height: "100%",
            width: "100vw",
          }}
        />
      </RightSide>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin-top: 30px;
    margin-bottom: 50px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 700px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;
const QuoteWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 50px;
  max-width: 330px;
  padding: 30px;
  z-index: 99;
  @media (max-width: 960px) {
    left: 20px;
  }
  @media (max-width: 560px) {
    bottom: -50px;
  }
`;
const QuotesWrapper = styled.div`
  position: absolute;
  left: -20px;
  top: -10px;
`;
const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 960px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;
