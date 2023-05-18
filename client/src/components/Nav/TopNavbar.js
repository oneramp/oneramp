import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-scroll"
// Components
import Sidebar from "./Sidebar"
import Backdrop from "../Elements/Backdrop"
// Assets
import LogoIcon from "../../assets/svg/logo-light.svg"
import BurgerIcon from "../../assets/svg/BurgerIcon"
import { Box } from "@mui/system"
import { navLinks } from "../../data/NavLinks"
import { useLocation, useNavigate } from "react-router-dom"
export default function TopNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [y, setY] = useState(window.scrollY)
  const [sidebarOpen, toggleSidebar] = useState(false)

  function handleClick() {
    if (location.pathname !== "/ramp") {
      navigate("/ramp")
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY))
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY))
    }
  }, [y])

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper
        className='flexCenter animate whiteBg2'
        style={y > 100 ? { height: "60px" } : { height: "80px" }}
      >
        <NavInner className='container flexSpaceCenter'>
          <Link className='pointer flexNullCenter' to='home' smooth={true}>
            <Box component='img' src={LogoIcon} sx={{ height: 45, m: 1 }} />
          </Link>
          <BurderWrapper
            className='pointer'
            onClick={() => toggleSidebar(!sidebarOpen)}
          >
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className='flexNullCenter'>
            {navLinks.map((val, i) => {
              const { label, offset } = val
              return (
                <li className='semiBold font15 pointer' key={i}>
                  <Link
                    activeClass='active'
                    style={{ padding: "10px 15px" }}
                    to={label.toLowerCase()}
                    spy={true}
                    smooth={true}
                    offset={offset}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </UlWrapper>
          <UlWrapperRight className='flexNullCenter'>
            <li className='semiBold font15 pointer'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://oneramp.gitbook.io/oneramp-docs/'
                style={{ padding: "10px 30px 10px 0" }}
              >
                API Docs
              </a>
            </li>
            <li className='semiBold font15 pointer flexCenter'>
              <li
                className='radius8 lightBg2'
                style={{
                  padding: "10px 15px",
                  color: "#000",
                  backgroundColor: "#fff",
                  border: "1px solid #000",
                }}
                // onClick={handleClick}
              >
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://onerampdashboard.vercel.app/'
                  // style={{ padding: "10px 30px 10px 0" }}
                >
                  Get Started
                </a>
              </li>
            </li>
            <li
              className='semiBold font15 pointer flexCenter'
              style={{ marginLeft: "10px" }}
            >
              <li
                className='radius8 lightBg2'
                style={{
                  padding: "10px 15px",
                  color: "#fff",
                  backgroundColor: "#000",
                }}
                onClick={handleClick}
              >
                Launch App
              </li>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`
