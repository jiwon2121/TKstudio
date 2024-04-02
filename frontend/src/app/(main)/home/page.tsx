'use client'

import Carousel1 from '@@/assets/images/carousel1.png'
import Carousel2 from '@@/assets/images/carousel2.png'
import Carousel3 from '@@/assets/images/carousel3.png'
import Carousel4 from '@@/assets/images/carousel4.png'
import Carousel5 from '@@/assets/images/carousel5.png'
import Carousel6 from '@@/assets/images/carousel6.png'
import Carousel7 from '@@/assets/images/carousel7.png'
import Main from './_component/_atom/Main'
import Carousel from './_component/Carousel'

function MainPage() {
  const imgs = [
    Carousel1,
    Carousel2,
    Carousel3,
    Carousel4,
    Carousel5,
    Carousel6,
    Carousel7,
  ]

  return (
    <Main>
      <Carousel images={imgs} />
    </Main>
  )
}

export default MainPage
