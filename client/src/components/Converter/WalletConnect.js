import React, { useEffect, useState } from "react"
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

export default function Wallet() {
  const [y, setY] = useState(window.scrollY)

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY))
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY))
    }
  }, [y])
  const { address, isConnected } = useAccount()

  // const { disconnect } = useDisconnect()
  // const { openConnectModal } = useConnectModal()
  return (
    <>
      <Wrapper
        className='flexCenter animate whiteBg2'
        style={y > 100 ? { height: "60px" } : { height: "80px" }}
      >
        <NavInner className='container'>
          <Link className='pointer flexNullCenter' to='home' smooth={true}>
            <Box component='img' src={LogoIcon} sx={{ height: 45, m: 1 }} />
          </Link>
          <UlWrapperRight className='flexNullCenter'>
            {/* <li className='semiBold font15 pointer'>
              <Networks />
            </li> */}
            <li className='semiBold font15 pointer flexCenter'>
              {address && isConnected ? (
                <ConnectButton
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                  showBalance={false}
                />
              ) : (
                <ConnectButton />
              )}
            </li>
          </UlWrapperRight>
          <MobileRightWrapper>
            {/* <li className='semiBold font15 pointer'>
              <Networks />
            </li> */}
            <li className='semiBold font15 pointer flexCenter'>
              {address && isConnected ? (
                <ConnectButton accountStatus='avatar' showBalance={false} />
              ) : (
                <ConnectButton />
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
