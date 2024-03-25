'use client'

import { useRouter } from 'next/navigation'
import kakaologin2 from '@@/assets/images/kakaologin2.png'
import naverlogin2 from '@@/assets/images/naverlogin2.png'
import Image from 'next/image'
import { useEffect } from 'react'
import styled from 'styled-components'
import { MainGreen } from '@@/assets/styles/pallete'
import Logo from '@@/assets/icons/logo-big.svg'
import Link from 'next/link'

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

const Login = function () {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI
  const NAVER_STATE = process.env.NEXT_PUBLIC_NAVER_STATE
  const kakaourl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`
  const naverurl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`

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
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link href={kakaourl}>
          <Image alt="카톡로그인" src={kakaologin2} width={64}></Image>
        </Link>
        <Link href={naverurl}>
          <Image alt="네이버로그인" src={naverlogin2} width={64}></Image>
        </Link>
      </div>
    </MainWrapper>
  )
}

export default Login
