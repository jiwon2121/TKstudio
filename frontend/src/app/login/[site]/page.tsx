'use client'
import { useRouter, useParams, notFound } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface ResponseType {
  ok: boolean
  error?: any
}

const Redirect = function () {
  const router = useRouter()
  const [result, setResult] = useState('')
  const { site } = useParams()
  console.log(site)
  const loginHandler = useCallback(
    async (code: any) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/user/login/${site}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              authCode: code,
            }),
          },
        )

        const responseData = await response.json()

        if (response.ok) {
          // 성공적으로 응답을 받은 경우
          const accessToken = response.headers.get('accessToken') // 'Authorization' 헤더에서 토큰 값 가져오기
          const refreshToken = response.headers.get('refreshToken')

          if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', `Bearer ${accessToken}`)
            localStorage.setItem('refreshToken', `Bearer ${refreshToken}`)
          } else {
            console.error('토큰 값이 없습니다')
          }

          // 쿠키에 저장하거나 필요한 작업 수행
          router.push('/home')
        } else {
          // 실패한 경우에 대한 처리
          console.error('Request failed:', responseData.error)
          // 에러 페이지로 리다이렉트
          // router.push('/notifications/authentication-failed');
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
    [router, site],
  )

  useEffect(() => {
    if (site === 'kakao' || 'naver') {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')
      console.log('Auth Code:', code)
      setResult(String(code))
      if (code) {
        loginHandler(code)
      } else {
        alert('동의를 하지않아 로그인이 되지 않았습니다.')
        router.push('/login')
      }
    } else {
      notFound()
    }
  }, [loginHandler, site, router])

  return <div>{result ? '로그인중입니다' : '다시 시도해주세요'}</div>
}

export default Redirect
