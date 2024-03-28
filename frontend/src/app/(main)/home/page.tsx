'use client'

import { useRouter } from 'next/navigation'
import Carousel1 from '@@/assets/images/carousel1.png'
import Carousel2 from '@@/assets/images/carousel2.png'
import Carousel3 from '@@/assets/images/carousel3.png'
import Carousel4 from '@@/assets/images/carousel4.png'
import Carousel5 from '@@/assets/images/carousel5.png'
import Carousel6 from '@@/assets/images/carousel6.png'
import Carousel7 from '@@/assets/images/carousel7.png'
import Button from '@/components/Button'
import Main from './_component/_atom/Main'
import Carousel from './_component/Carousel'

function MainPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BACK_URL
  const router = useRouter()
  const imgs = [Carousel1, Carousel2, Carousel3, Carousel4, Carousel5, Carousel6, Carousel7]

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      await fetch(baseUrl + '/api/v1/user/logout', {
        headers: {
          Authorization: refreshToken as string,
        },
      })
    } catch (err) {
      console.log(err)
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      router.push('/start')
    }
  }
  return (
    <Main>
      <Carousel images={imgs} />
      <Button
        $width="70%"
        onClick={() => {
          handleLogout()
        }}
      >
        로그아웃
      </Button>
    </Main>
  )
}

export default MainPage
