'use client'

import Image from 'next/image'
import Logo from '@@/assets/icons/logo-small.svg'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
`

function Header() {
  return (
    <HeaderWrapper>
      <Logo />
    </HeaderWrapper>
  )
}

export default Header
