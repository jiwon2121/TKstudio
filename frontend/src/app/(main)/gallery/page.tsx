'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import ImageWrapper from '@/components/ImageWrapper'
import sampleImage from '@@/assets/images/sample.png'
import styled from 'styled-components'
import Spinner from '@@/assets/icons/spinner.svg'
import Link from 'next/link'

const MainGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1vw;
  padding: 1vw;
`

const SpinnerDiv = styled.div`
  position: relative;
  grid-column: 1 / 3;
  height: 4rem;
  vertical-align: middle;
  svg {
    height: 4rem;
  }
`

function GalleryPage() {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [page, setPage] = useState<number | null>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pictures, setPictures] = useState<Array<number>>([])

  const renderPictures = () => {
    return pictures.map((pictureId, index) => {
      return <p key={index}>{pictureId}</p>
    })
  }

  useEffect(() => {
    async function getPictures() {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const newPictures: Array<number> = []
      for (let i = 0; i < 10; i++) {
        newPictures.push(page as number)
      }
      setPictures((prev) => prev.concat(newPictures))
      if (page === 10) {
        setPage(null)
      } else if (page !== null) {
        setPage(page + 1)
      }
      setIsLoading(false)
    }

    const onIntersect: IntersectionObserverCallback = async function (
      [entry],
      observer,
    ) {
      if (entry.isIntersecting) {
        observer.disconnect()
        getPictures()
      }
    }
    if (target) {
      const observer = new IntersectionObserver(onIntersect, { threshold: 1 })
      observer.observe(target)
    }
  }, [target, page])

  return (
    <MainGrid>
      <Link href={{
        pathname: '/gallery/detail',
        query: {
          arr: [1,2,3]
        }
      }}>디테일</Link>
      <ImageWrapper
        src={sampleImage}
        alt="1"
        $width="100%"
        $aspectRatio="1 / 1"
      />
      <ImageWrapper
        src={sampleImage}
        alt="2"
        $width="100%"
        $aspectRatio="1 / 1"
      />
      {renderPictures()}
      {isLoading ? (
        <SpinnerDiv>
          <Spinner />
        </SpinnerDiv>
      ) : null}
      {page ? <div ref={setTarget}></div> : null}
    </MainGrid>
  )
}

export default GalleryPage
