'use client'

import NavLink from './_molecules/NavLink'
import NavMargin from './_molecules/NavMargin'
import styled from 'styled-components'
import { White, Black } from '@@/assets/styles/pallete'

const NavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 4rem;
  background-color: ${White};
  border-top: 1px solid ${Black};
  box-sizing: border-box;
`

function Nav() {
  return (
    <>
      <NavMargin>{' '}</NavMargin>
      <NavWrapper>
        <NavLink to="home" />
        <NavLink to="create" />
        <NavLink to="store" />
        <NavLink to="gallery" />
      </NavWrapper>
    </>
  )
}

export default Nav
