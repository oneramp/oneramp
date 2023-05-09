import React from "react"
import styled from "styled-components"
import { Link } from "react-scroll"
// Assets
import CloseIcon from "../../assets/svg/CloseIcon"
import LogoIcon from "../../assets/svg/logo-light.svg"
import { Box } from "@mui/system"
import { navLinks } from "../../data/NavLinks"
import { useLocation, useNavigate } from "react-router-dom"

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate()
  const location = useLocation()
  function handleClick() {
    if (location.pathname !== "/ramp") {
      navigate("/ramp")
    }
  }
  return (
    <Wrapper className='animate darkBg' sidebarOpen={sidebarOpen}>
      <SidebarHeader className='flexSpaceCenter'>
        <div className='flexNullCenter'>
          <Box component='img' src={LogoIcon} sx={{ height: 45, m: 1 }} />
        </div>
        <CloseBtn
          onClick={() => toggleSidebar(!sidebarOpen)}
          className='animate pointer'
        >
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className='flexNullCenter flexColumn'>
        {navLinks.map((val, i) => {
          const { label, offset } = val
          return (
            <li className='semiBold font15 pointer' key={i}>
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass='active'
                className='whiteColor'
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
      </UlStyle>
      <UlStyle className='flexSpaceCenter'>
        <li className='semiBold font15 pointer'>
          <a
            target='_blank'
            className='whiteColor'
            rel='noopener noreferrer'
            href='https://oneramp.gitbook.io/oneramp-docs/'
            style={{ padding: "10px 30px 10px 0" }}
          >
            API Docs
          </a>
        </li>
        <li className='semiBold font15 pointer flexCenter'>
          <li
            className='radius8 lightBg2 '
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
      </UlStyle>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`
const SidebarHeader = styled.div`
  padding: 20px 0;
`
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`
