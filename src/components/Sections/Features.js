import React from "react";
import styled from "styled-components";
// Components
import ClientSlider from "../Elements/ClientSlider";
import ServiceBox from "../Elements/ServiceBox";
import FullButton from "../Buttons/FullButton";
// Assets
import HeaderImage from "../../assets/svg/crypto-portfolio.svg";
import Image1 from "../../assets/svg/illustration3.svg";

export default function Features() {
  return (
    <Wrapper id="services">
      <div className="lightBg" style={{ padding: "50px 0" }}>
        <div className="container">
          <ClientSlider />
        </div>
      </div>
      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <div data-aos="fade-up" data-aos-duration="1500">
              <h1 className="font40 extraBold">Our Features</h1>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="200"
            >
              <p className="font13">
                Sign up for a <b>OneRamp</b> account today and start ramping
                your crypto!
              </p>
            </div>
          </HeaderInfo>

          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <ServiceBox
                icon="roller"
                title="Simple & Intuitive Interface"
                subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="monitor"
                title="Fast & Secure Transactions"
                subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
              />
            </ServiceBoxWrapper>

            <ServiceBoxWrapper>
              <ServiceBox
                icon="printer"
                title="24/7 Customer Support"
                subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
              />
            </ServiceBoxWrapper>
          </ServiceBoxRow>

          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <ServiceBox
                icon="browser"
                title="Wide Range of Supported Cryptocurrencies"
                subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="printer"
                title="Competitive Exchange Rates"
                subtitle="Lorem ipsum dolor sit amet, consetetur sadipscin."
              />
            </ServiceBoxWrapper>

            <ServiceBoxWrapper>
              <ServiceBox
                icon="monitor"
                title="API Integration with your Dapps"
                subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
              />
            </ServiceBoxWrapper>
          </ServiceBoxRow>
        </div>
        <div className="lightBg">
          <div className="container">
            <Advertising className="flexSpaceCenter">
              <AddLeft>
                <div
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-offset="300"
                >
                  <h4 className="font15 semiBold">
                    OneRamp is the <b>Perfect</b> Solution
                  </h4>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="200"
                  data-aos-offset="300"
                >
                  <h2 className="font40 extraBold">How it Works</h2>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="200"
                  data-aos-offset="300"
                >
                  <p className="font12">
                    OneRamp is easy to use. Simply connect your wallet and
                    you're ready to buy or sell crypto in minutes. Our platform
                    is designed to make it simple and straightforward to manage
                    your crypto assets, so you can focus on what's important:
                    your investments.
                  </p>
                </div>

                <ButtonsRow
                  className="flexNullCenter"
                  style={{ margin: "30px 0" }}
                >
                  <div style={{ width: "190px" }}>
                    <FullButton
                      title="Get Started"
                      action={() => alert("clicked")}
                    />
                  </div>
                  <div style={{ width: "190px", marginLeft: "15px" }}></div>
                </ButtonsRow>
              </AddLeft>
              <AddRight>
                <AddRightInner>
                  <div className="flexNullCenter">
                    <AddImgWrapper
                      data-aos="fade-up"
                      data-aos-duration="1500"
                      data-aos-delay="1000"
                    >
                      <img src={HeaderImage} alt="office" />
                    </AddImgWrapper>
                  </div>
                </AddRightInner>
                {/* <AddRightInner>
                  <div className="flexNullCenter">
                    <AddImgWrapp1 className="flexCenter">
                      <img src={AddImage1} alt="office" />
                    </AddImgWrapp1>
                    <AddImgWrapp2>
                      <img src={AddImage2} alt="office" />
                    </AddImgWrapp2>
                  </div>
                  <div className="flexNullCenter">
                    <AddImgWrapp3>
                      <img src={AddImage3} alt="office" />
                    </AddImgWrapp3>
                    <AddImgWrapp4>
                      <img src={AddImage4} alt="office" />
                    </AddImgWrapp4>
                  </div>
                </AddRightInner> */}
              </AddRight>
            </Advertising>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  @media (max-width: 860px) {
    width: 100%;
    text-align: center;
    padding: 40px 0;
  }
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  margin: 80px 0;
  padding: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 100px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const AddLeft = styled.div`
  color: #000;
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  position: absolute;
  top: -70px;
  right: 0;
  @media (max-width: 860px) {
    width: 80%;
    position: relative;
    order: 1;
    top: -40px;
  }
`;
const AddRightInner = styled.div`
  width: 100%;
`;

const AddImgWrapper = styled.div`
  width: 100%;
  margin: 0 6% 10px 6%;
  img {
    width: 100%;
    height: auto;
  }
`;

const AddImgWrapper2 = styled.div`
  width: 50%;
  margin-top: 30%;
  img {
    width: 100%;
    height: auto;
  }
`;
