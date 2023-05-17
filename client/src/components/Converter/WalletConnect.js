import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Link } from "react-scroll"
// Components
// Assets
import LogoIcon from "../../assets/svg/logo-light.svg"
import { Box } from "@mui/system"
import {
  useAccount,
  //  useDisconnect
} from "wagmi"
// import { useConnectModal } from "@rainbow-me/rainbowkit"
// import FullButton from "../Buttons/FullButton"
// import Networks from "../../utils/networks"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useLocation, useNavigate } from "react-router-dom"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import SwapView from "../Tabs/SwapView"
export default function Wallet() {
  const [isVisible, setIsVisible] = useState(false)
  const swapViewRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const [y, setY] = useState(window.scrollY)

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY))
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY))
    }
  }, [y])
  useEffect(() => {
    // Define the click handler
    const handleClickOutside = (event) => {
      if (
        // Check if the click was outside the SwapView and we are in desktop view
        swapViewRef.current &&
        !swapViewRef.current.contains(event.target)
      ) {
        setIsVisible(false)
      }
    }

    // Attach the click handler
    document.addEventListener("mousedown", handleClickOutside)

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  const { address, isConnected } = useAccount()

  function handleClick() {
    if (location.pathname !== "/") {
      navigate("/")
    }
  }
  const onClick = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <Wrapper
        className='flexCenter animate whiteBg2'
        style={y > 100 ? { height: "60px" } : { height: "80px" }}
      >
        <NavInner className='container'>
          <Link className='pointer flexNullCenter' to='home' smooth={true}>
            <Box
              component='img'
              src={LogoIcon}
              sx={{ height: 45, m: 1 }}
              onClick={handleClick}
            />
          </Link>
          <UlWrapperRight className='flexNullCenter'>
            <li className='semiBold font15 pointer flexCenter'>
              {address && isConnected ? (
                <>
                  <div style={containerStyle}>
                    <SwapHorizIcon style={iconStyle} onClick={onClick} />
                    {isVisible && (
                      <div
                        style={{ position: "absolute", top: 100 }}
                        ref={swapViewRef}
                      >
                        <SwapView />
                      </div>
                    )}
                  </div>
                  <ConnectButton
                    accountStatus={{
                      smallScreen: "avatar",
                      largeScreen: "full",
                    }}
                    showBalance={false}
                  />
                </>
              ) : (
                <ConnectButton />
              )}
            </li>
          </UlWrapperRight>
          <MobileRightWrapper>
            <li className='semiBold font15 pointer flexCenter'>
              {address && isConnected ? (
                <>
                  <div style={containerStyle}>
                    <SwapHorizIcon style={iconStyle} onClick={onClick} />
                    {isVisible && (
                      <div
                        style={{ position: "absolute", top: 100 }}
                        ref={swapViewRef}
                      >
                        <SwapView />
                      </div>
                    )}
                  </div>

                  <ConnectButton
                    accountStatus='avatar'
                    showBalance={false}
                    chainStatus='icon'
                  />
                </>
              ) : (
                <>
                  <ConnectButton />
                </>
              )}
            </li>
          </MobileRightWrapper>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`

const MobileRightWrapper = styled.div`
  display: none;

  @media (max-width: 760px) {
    display: flex;
    align-items: center;
  }
`

export const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.slice(0, 2)}...${str.slice(str.length - n)}`
  }
  return ""
}
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff",
  borderRadius: "50%",
  border: "1px solid #000",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  marginRight: "10px",
}

const iconStyle = {
  color: "#000",
}
