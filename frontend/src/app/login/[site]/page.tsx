'use client'
import { useRouter, useParams, notFound } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie-player'
import Login from '@@/assets/lottie/landing_logo.json'
import AlertModal from '@/components/AlertModal'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Redirect = function () {
  const router = useRouter()
  const { site } = useParams()
  const [modalShow, setModalShow] = useState<boolean>(false)

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
          router.replace('/home')
        } else {
          // 실패한 경우에 대한 처리
          console.error('Request failed:', responseData.error)
          // 에러 페이지로 리다이렉트
          router.replace('/login')
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
      if (code) {
        loginHandler(code)
      } else {
        setModalShow(true)
      }
    } else {
      notFound()
    }
  }, [loginHandler, site, router])

  return (
    <>
      <Wrapper>
        <Lottie loop animationData={Login} play />
      </Wrapper>
      {modalShow && (
        <AlertModal
          handleClose={() => {
            router.replace('/login')
          }}
        >
          동의를 하지 않아 로그인이 되지 않았습니다
        </AlertModal>
      )}
    </>
  )
}

export default Redirect
