'use client'

import React from 'react'
import Lottie from 'react-lottie-player'
import Lottienot from '@@/assets/lottie/notfound.json'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Animation() {
  return (
    <Wrapper>
      <Lottie loop animationData={Lottienot} play />
    </Wrapper>
  )
}
