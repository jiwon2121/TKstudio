'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import { MainYellow, MainOrange, MainRed } from '@@/assets/styles/pallete'

function StartPage() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          router.push('/login')
        }}
        $fontSize="1.5rem"
        $margin="1rem 0 0 0"
        $padding="0.5rem 1rem"
        $fontWeight='bold'
        $backgroundColor={MainRed}
      >
        시작하기
      </Button>
    </>
  )
}

export default StartPage
