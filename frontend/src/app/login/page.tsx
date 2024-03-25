'use client'

import kakaologin from '@/assets/images/kakaologin.png'
import Image from 'next/image'

const Login = function () {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI
  const kakaourl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  const naverurl =
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=3egGmArY73lN7IYX_gVy&redirect_uri=https://j10a101.p.ssafy.io/naver&state=c5d7e5430872429685dd6115803ca5d984f6063b2fe14efbad4dd2e2cb84809e'

  return (
    <div>
      <a href={kakaourl}>
        <Image alt="카톡로그인" src={kakaologin}></Image>
      </a>
      <a href={naverurl}>네이버</a>
    </div>
  )
}

export default Login
