"use client"

import kakaologin from "@/assets/images/kakaologin.png"
import Image from "next/image"

const Login = function() {
    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    
  
    return(

        <div>
        <a href={url}>
            <Image alt='카톡로그인' src={ kakaologin }></Image>
            </a>
        </div>
            ) 
    
}

export default Login