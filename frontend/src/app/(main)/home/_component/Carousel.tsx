import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import ChevronLeftIcon from '@@/assets/icons/chevron-left.svg'
import ChevronRightIcon from '@@/assets/icons/chevron-right.svg'
import CarouselMain from './_atom/CarouselMain'
import CarouselWrapper from './_atom/CarouselWrapper'
import CarouselSlide from './_atom/CarouselSlide'
import { PrevButton, NextButton } from './_atom/CarouselButton'
import Pagination from './_atom/Pagination'

interface Props {
  images: Array<StaticImageData>| Array<string>
}

function Carousel({ images }: Props) {
  const endIdx = images.length - 1
  const [index, setIndex] = useState<number>(0)

  const handlePrev = () => {
    if (index <= 0) {
      setIndex(endIdx)
    } else {
      setIndex((prev) => prev - 1)
    }
  }
  const handleNext = () => {
    if (index >= endIdx) {
      setIndex(0)
    } else {
      setIndex((prev) => prev + 1)
    }
  }

  const renderImage = () => {
    return images.map((img, index) => {
      return (
        <CarouselSlide key={'carousel' + index}>
          <Image src={img} alt={'carousel' + index} />
        </CarouselSlide>
      )
    })
  }

  const renderPage = (length: number) => {
    const page = []
    for (let i = 0; i < length; i++) {
      page.push(<button />)
    }

    return page
  }

  return (
    <CarouselMain>
      <CarouselWrapper $translateX={-index * 70}>
        {renderImage()}
      </CarouselWrapper>
      <PrevButton onClick={handlePrev}>
        <ChevronLeftIcon />
      </PrevButton>
      <NextButton onClick={handleNext}>
        <ChevronRightIcon />
      </NextButton>
      <Pagination $idx={index+1}>
        {renderPage(images.length)}
      </Pagination>
    </CarouselMain>
  )
}

export default Carousel
