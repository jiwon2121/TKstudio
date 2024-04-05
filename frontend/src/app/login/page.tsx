'use client'

import { useRouter } from 'next/navigation'
import KakaoIcon from '@@/assets/icons/kakao.svg'
import NaverIcon from '@@/assets/icons/naver.svg'
import GoogleIcon from '@@/assets/icons/google.svg'
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
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`

const Login = function () {
  //카카오
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI
  //네이버
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI
  const NAVER_STATE = process.env.NEXT_PUBLIC_NAVER_STATE
  //구글
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
  //URI
  const kakaourl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`
  const naverurl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`
  const googleurl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`
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
          <KakaoIcon />
        </Link>
        <Link href={naverurl}>
          <NaverIcon />
        </Link>
        <Link href={googleurl}>
          <GoogleIcon />
        </Link>
      </div>
    </MainWrapper>
  )
}

export default Login
