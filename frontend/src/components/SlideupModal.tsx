'use client'

import styled, { keyframes } from 'styled-components'
import { White, Black } from '@@/assets/styles/pallete'
import { useRouter } from 'next/navigation'

const SlideUp = (height: string) => keyframes`
  from {
    bottom: -${height};
  }
  
  to {
    bottom: 0;
  }
`

const SlideDown = (height: string) => keyframes`
  from {
    bottom: 0;
  }

  to {
    bottom: -${height};
  }
`

const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const FadeOut = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`

const Background = styled.div<{ $isClose: boolean }>`
  position: fixed;
  background-color: ${Black}80;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  top: 0;
  animation-name: ${(props) => (props.$isClose ? FadeOut : FadeIn)};
  animation-timing-function: ease-out;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
`

const Modal = styled.div<{ $height: string, $isClose: boolean }>`
  position: fixed;
  background-color: ${White};
  width: 100vw;
  border-radius: 25px 25px 0 0;
  z-index: 2;
  padding: 0;
  margin: 0;
  height: ${(props) => props.$height};
  bottom: 0;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  animation-name: ${(props) =>
    props.$isClose ? SlideDown(props.$height) : SlideUp(props.$height)};
  animation-timing-function: ease-out;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
`

interface Props {
  children: React.ReactNode
  isClose: boolean
  height: string
  handleClose: (() => Promise<void>) | (() => void)
}

function SlideupModal({ children, isClose, handleClose, height }: Props) {
  const router = useRouter()
  return (
    <>
      <Background
        $isClose={isClose}
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
      />
      <Modal
        $isClose={isClose}
        $height={height}
        onClick={(e) => {
          e.stopPropagation
        }}
      >
        {children}
      </Modal>
    </>
  )
}

export default SlideupModal
