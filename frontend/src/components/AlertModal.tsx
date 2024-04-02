'use client'

import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { White, Black, MainRed, MainGreen } from '@@/assets/styles/pallete'
import CircleAlert from '@@/assets/icons/circle-alert.svg'
import Button from './Button'

const Popup = keyframes`
  0% {
    width: 0;
    height: 0;
  }

  85% {
    padding: 15px;
  }

  100% {
    padding: 0;
  }
`

const Background = styled.div`
  position: fixed;
  background-color: ${Black}80;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 100;
`

const PopupDiv = styled.div`
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  border-radius: 10px;
  position: fixed;
  background-color: ${White};
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  top: 50%;
  left: 50%;
  font-size: 1.25rem;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  animation-fill-mode: forwards;

  animation-name: ${Popup};
  animation-timing-function: ease-out;
  animation-duration: 200ms;
  z-index: 101;
`

const ButtonsWrapper = styled.div`
  display: flex;
  width: 75%;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`

interface Props {
  children: React.ReactNode
  confirm?: string
  alertColor?: string
  handleClose: (() => Promise<void>) | (() => void)
  handleConfirm?: (() => Promise<void>) | (() => void)
}

function AlertModal({
  children,
  confirm,
  alertColor = MainRed,
  handleClose,
  handleConfirm,
}: Props) {
  const [show, setShow] = useState<boolean>(false)
  const Wait = async () => {
    await new Promise(() =>
      setTimeout(() => {
        setShow(true)
      }, 170),
    )
  }

  Wait()

  return (
    <>
      <Background
        onClick={(e) => {
          e.stopPropagation()
        }}
      />
      <PopupDiv
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {show && (
          <>
            <CircleAlert color={alertColor} width="40px" height="40px" />
            {children}
            <ButtonsWrapper>
              <Button
                $fontSize="1.25rem"
                $padding="6px 15px"
                $backgroundColor={MainRed}
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
              >
                닫기
              </Button>
              {confirm && (
                <Button
                  $fontSize="1.25rem"
                  $padding="6px 15px"
                  $backgroundColor={MainGreen}
                  onClick={() => {
                    handleConfirm ? handleConfirm() : null
                    handleClose()
                  }}
                >
                  {confirm}
                </Button>
              )}
            </ButtonsWrapper>
          </>
        )}
      </PopupDiv>
    </>
  )
}

export default AlertModal
