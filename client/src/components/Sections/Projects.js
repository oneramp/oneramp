import React from "react";
import styled from "styled-components";
// Components
import ProjectBox from "../Elements/ProjectBox";
import FullButton from "../Buttons/FullButton";
// Assets
import ProjectImg1 from "../../assets/svg/logo-light.svg";
import AddImage2 from "../../assets/svg/illustration2.svg";

export default function Projects() {
  return (
    <Wrapper id="projects">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <div data-aos="fade-up" data-aos-duration="1500">
              <h1 className="font40 extraBold">Easy, Fast & Secure</h1>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="200"
            >
              <p className="font13">
                Our platform is easy to use and secure.
                <br />
                Get started now and experience the future of crypto on- and
                off-ramping.
              </p>
            </div>
          </HeaderInfo>
          <div
            className="row textCenter"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="200"
            data-aos-offset="300"
          >
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg1}
                title="OneRamp"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                action={() => alert("clicked")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg1}
                title="OneRamp"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                action={() => alert("clicked")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg1}
                title="OneRamp"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                action={() => alert("clicked")}
              />
            </div>
          </div>

          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton title="Load More" action={() => alert("clicked")} />
            </div>
          </div>
        </div>
      </div>
      <div className="lightBg">
        <div className="container">
          <Advertising className="flexSpaceCenter">
            <AddLeft>
              <AddLeftInner>
                <ImgWrapper className="flexCenter">
                  <img
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    data-aos-delay="200"
                    data-aos-offset="300"
                    className="radius8"
                    src={AddImage2}
                    alt="add"
                  />
                </ImgWrapper>
              </AddLeftInner>
            </AddLeft>
            <AddRight>
              <h4 className="font15 semiBold">
                We make <b>Crypto</b> accessible to Everyone
              </h4>
              <div data-aos="fade-up" data-aos-duration="1500">
                <h2 className="font40 extraBold">Why OneRamp?</h2>
              </div>

              <div
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-offset="300"
              >
                <p className="font12">
                  At OneRamp, we believe in making crypto accessible to
                  everyone. That's why we've built a platform that is easy to
                  use, fast, and secure. We having easy to implement apis for
                  your Dapp solutions. OneRamp is the perfect solution for all
                  your on- and off-ramping needs.
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
                <div style={{ width: "190px", marginLeft: "15px" }}>
                  <FullButton
                    title="Contact Us"
                    action={() => alert("clicked")}
                    border
                  />
                </div>
              </ButtonsRow>
            </AddRight>
          </Advertising>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  padding: 100px 0;
  margin: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
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
  position: relative;
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
  color: #000;
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
const AddLeftInner = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    order: 1;
    position: relative;
    top: -60px;
    left: 0;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 400px) {
    padding: 0;
  }
`;
