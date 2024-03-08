"use client"

import { useSearchParams, useRouter } from "next/navigation"

import { useCallback, useEffect, useState } from "react"

interface ResponseType {
    ok: boolean;
    error?: any;
  }

const Redirect = function () {
    const params = useSearchParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [result , setResult] = useState('')

   
    const loginHandler = useCallback(
    async (code: string | string[]) => {
      
      // 백엔드에 전송
    const response: Response = await fetch('http://localhost:8080/api/v1/user/login/kakao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authCode: code,
        }),
      })
      
      response.json().then((data) =>{

        console.log(data)
        if (response.ok) { // 성공하면 홈으로 리다이렉트
          // 쿠키에 저장
          
          router.push('/');
        } 
        //   else { // 실패하면 에러 페이지로 리다이렉트
        //     router.push('/notifications/authentication-failed');
        //   }  에러페이지 만든후 수정
      });
      },
      [router]
  );
    
    useEffect(() =>{
        const code = params.get('code')
        console.log(code)
        setResult(String(code))
        if (code){
            loginHandler(code)
        }

    },[])

    console.log(result)

    return(
        <div>
            { result ? "로그인중입니다" : '다시 시도해주세요' } 
        </div>
    )
}

export default Redirect