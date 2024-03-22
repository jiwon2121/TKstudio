import { useEffect, useRef, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import ChevronLeftIcon from '@@/assets/icons/chevron-left.svg'
import ChevronRightIcon from '@@/assets/icons/chevron-right.svg'
import CarouselMain from './_atom/CarouselMain'
import CarouselWrapper from './_atom/CarouselWrapper'
import CarouselSlide from './_atom/CarouselSlide'
import { PrevButton, NextButton } from './_atom/CarouselButton'
import Pagination from './_atom/Pagination'

interface Props {
  images: Array<StaticImageData> | Array<string>
}

function Carousel({ images }: Props) {
  const endIdx = images.length
  const changeRef = useRef<any>()
  const [index, setIndex] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [reset, setReset] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [translateX, setTranslateX] = useState<string>('-70vw')

  const handlePrev = () => {
    setIndex((prev) => prev - 1)
    setTranslateX(`-${(index - 1) * 70}vw`)

    if (index == 1) {
      setPage(endIdx)
      setTimeout(() => {
        setReset(true)
        setIndex(endIdx)
        setTranslateX(`-${endIdx * 70}vw`)
      }, 350)
    } else {
      setPage((prev) => prev - 1)
    }
  }
  const handleNext = () => {
    setIndex((prev) => prev + 1)
    setTranslateX(`-${(index + 1) * 70}vw`)
    if (index == endIdx) {
      setPage(1)
      setTimeout(() => {
        setReset(true)
        setIndex(1)
        setTranslateX(`-${1 * 70}vw`)
      }, 350)
    } else {
      setPage((prev) => prev + 1)
    }
  }

  const renderImage = () => {
    const result = []
    result.push(
      <CarouselSlide key="copy-last">
        <p>copy-last</p>
        <Image
          src={images[images.length - 1]}
          alt="copy-last"
          priority={true}
        />
      </CarouselSlide>,
    )

    images.forEach((img, index) => {
      result.push(
        <CarouselSlide key={'carousel' + index}>
          <p>{index}</p>
          <Image src={img} alt={'carousel' + index} priority={true} />
        </CarouselSlide>,
      )
    })

    result.push(
      <CarouselSlide key="copy-first">
        <p>copy-first</p>
        <Image src={images[0]} alt="copy-first" priority={true} />
      </CarouselSlide>,
    )

    return result
  }

  const renderPage = (length: number) => {
    const page = []
    for (let i = 1; i <= length; i++) {
      page.push(
        <button
          key={`page-${i}`}
          onClick={() => {
            setIndex(i)
            setPage(i)
            setTranslateX(`-${i * 70}vw`)
          }}
        />,
      )
    }

    return page
  }

  const callback = () => {
    handleNext()
    setReset(false)
  }

  const changeStart = () => {
    if (!changeRef.current) {
      changeRef.current = setInterval(callback, 3000)
    }
  }

  const changeStop = () => {
    if (changeRef.current) {
      clearInterval(changeRef.current)
      changeRef.current = null
    }
  }

  useEffect(() => {
    changeStart()

    return () => {
      changeStop()
    }
  })

  return (
    <CarouselMain
      onTouchStart={(e) => {
        changeStop()
        setStartX(e.touches[0].clientX)
        setReset(true)
      }}
      onTouchMove={(e) => {
        const currentX: number = e.touches[0].clientX
        setTranslateX(`calc(${-70 * page}vw - ${startX - currentX}px)`)
      }}
      onTouchEnd={(e) => {
        setReset(false)
        const currentX = e.changedTouches[0].clientX
        if (Math.abs(currentX - startX) > 40) {
          if (currentX > startX) {
            handlePrev()
            setReset(false)
          } else {
            handleNext()
            setReset(false)
          }
          setStartX(0)
        } else {
          setTranslateX(`${-70 * page}vw`)
        }
        changeStart()
      }}
    >
      <CarouselWrapper $translateX={translateX} $reset={reset}>
        {renderImage()}
      </CarouselWrapper>
      <PrevButton
        onClick={() => {
          changeStop()
          handlePrev()
          setReset(false)
          changeStart()
        }}
      >
        <ChevronLeftIcon />
      </PrevButton>
      <NextButton
        onClick={() => {
          changeStop
          handleNext()
          setReset(false)
          changeStart()
        }}
      >
        <ChevronRightIcon />
      </NextButton>
      <Pagination $idx={page}>{renderPage(images.length)}</Pagination>
    </CarouselMain>
  )
}

export default Carousel
