'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import kakaologin from '@@/assets/images/kakaologin.png'
import Image from 'next/image'
import { useEffect } from 'react'
import styled from 'styled-components'
import { MainGreen } from '@@/assets/styles/pallete'
import Logo from '@@/assets/icons/logo-big.svg'

const MainWrapper = styled.main`
  width: 90vw;
  height: 80vh;
  border: 2px solid ${MainGreen};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  margin: 10vh auto;
`
const TextWrapper = styled.p`
  font-weight: bold;
  font-size: 3rem;
`

const Login = function () {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  const router = useRouter()
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      router.push('/home')
    }
  }, [router])

  return (
    <MainWrapper>
      <Logo />
      <a href={url}>
        <Image alt="카톡로그인" src={kakaologin}></Image>
      </a>
    </MainWrapper>
  )
}

export default Login
