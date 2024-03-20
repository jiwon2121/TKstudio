'use client'

import styled, { keyframes } from 'styled-components'
import { White, Black } from '@@/assets/styles/pallete'
import { useRouter } from 'next/navigation'

const SlideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  
  to {
    transform: translate(-50%);
  }
`

const SlideDown = keyframes`
  from {
    transform: translate(-50%);
  }

  to {
    transform: translate(-50%, 100%);
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

const Modal = styled.div<{ $isClose: boolean }>`
  position: fixed;
  background-color: ${White};
  width: 100vw;
  max-width: 500px;
  border-radius: 25px 25px 0 0;
  left: 50%;
  transform: translate(-50%);
  z-index: 2;
  padding: 0;
  margin: 0;

  height: auto;
  bottom: 0;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  animation-name: ${(props) =>
    props.$isClose ? SlideDown : SlideUp};
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
