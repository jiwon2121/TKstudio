'use client'

import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import BackGround from '@@/assets/images/background.jpg'
import Body1 from '@@/assets/images/Body1.png'
import Body2 from '@@/assets/images/Body2.png'
import Body3 from '@@/assets/images/Body3.png'
import { MainGreen, MainOrange, Black, White } from '@@/assets/styles/pallete'
import DownIcon from '@@/assets/icons/chevrons-down.svg'
import Logo from '@@/assets/icons/logo.svg'

const MainDiv = styled.div`
  position: relative;
  background-color: ${Black};
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    width: 80vw;
    max-width: 400px;
  }

  @media screen and (max-width: 512px) {
    height: 100vh;
    img {
      width: 150vw;
      height: auto;
    }
  }

  @media screen and (min-width: 513px) {
    img {
      height: 100vh;
      width: auto;
    }
  }
`

const IntroDiv = styled.div<{ $backgroundColor: string; $color?: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => (props.$color ? props.$color : White)};
  padding: 5vw 0;

  span {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  @media screen and (max-width: 512px) {
    flex-direction: column;
    height: 100vh;
    gap: 32px;

    img {
      width: 70%;
      height: auto;
    }

    span {
      width: 80vw;
    }
  }

  @media screen and (min-width: 513px) {
    gap: min(10%, 300px);
    img {
      height: 90vh;
      width: auto;
    }

    span {
      width: 300px;
      font-size: 1.7rem;
    }
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
`

interface Props {
  children?: React.ReactNode
}

function Background({ children }: Props) {
  return (
    <>
      <MainDiv>
        <Image src={BackGround} alt="back-ground" priority={true} />
        <div
          className="content"
          style={{
            position: 'absolute',
            backgroundColor: `${Black}99`,
            width: '100%',
            height: '100%',
            bottom: 0,
            left: 0,
          }}
        >
          <div className="logo">
            <Logo />
          </div>
          <span
            style={{
              color: White,
              fontWeight: 'bold',
              marginTop: '2rem',
              fontSize: '2rem',
            }}
          >
            내 손안에 사진관
          </span>
          <span style={{ color: White }}>클릭 한 번으로 간편하게</span>
          {children}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <DownIcon width="32px" height="32px" color={White} />
        </div>
      </MainDiv>
      <IntroDiv $backgroundColor={MainGreen}>
        <Content>
          <span>원하는 스타일로</span>
          <span>증명사진을 찍어보세요</span>
        </Content>
        <Image src={Body1} alt="body1" priority={true} />
      </IntroDiv>
      <IntroDiv $backgroundColor={White} $color={Black}>
        <Content>
          <span>마음껏 사진을 찍고</span>
          <span>비교해 보세요</span>
        </Content>
        <Image src={Body2} alt="body2" priority={true} />
      </IntroDiv>
      <IntroDiv $backgroundColor={MainOrange}>
        <Content>
          <span>사진을 저장하고</span>
          <span>공유해 보세요</span>
        </Content>
        <Image src={Body3} alt="body3" priority={true} />
      </IntroDiv>
    </>
  )
}

export default Background
