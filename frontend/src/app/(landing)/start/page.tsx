'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/Button'

function StartPage() {
  const router = useRouter()

  return (
    <>
      <h1>스타트 페이지</h1>
      <Button
        onClick={() => {
          router.push('/login')
        }}
      >
        시작하기
      </Button>
    </>
  )
}

export default StartPage
