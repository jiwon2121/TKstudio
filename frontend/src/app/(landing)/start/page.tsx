'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import { MainRed } from '@@/assets/styles/pallete'
import Background from '../_components/Background'

function StartPage() {
  const router = useRouter()

  return (
    <Background start={true}>
      <Button
        onClick={() => {
          router.push('/login')
        }}
        $fontSize="1.5rem"
        $margin="1rem 0 0 0"
        $padding="0.5rem 1rem"
        $fontWeight="bold"
        $backgroundColor={MainRed}
      >
        시작하기
      </Button>
    </Background>
  )
}

export default StartPage
