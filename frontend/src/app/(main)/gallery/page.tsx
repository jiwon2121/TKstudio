'use client'

import { useEffect, useState } from 'react'
import ImageWrapper from '@/components/ImageWrapper'
import sampleImage from '@@/assets/images/sample.png'
import Spinner from '@@/assets/icons/spinner.svg'
import Link from 'next/link'
import Grid from './_components/Grid'

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
    <main>
      <Grid>
        <Link
          href={{
            pathname: '/gallery/detail',
            query: {
              arr: [1, 2, 3],
            },
          }}
        >
          디테일
        </Link>
        <ImageWrapper
          src={sampleImage}
          alt="1"
          $width="100%"
          $aspectRatio="1 / 1"
          priority={true}
        />
        <ImageWrapper
          src={sampleImage}
          alt="2"
          $width="100%"
          $aspectRatio="1 / 1"
          priority={true}
        />
        {renderPictures()}
      </Grid>
      {isLoading ? (
        <div style={{ verticalAlign: 'middle' }}>
          <Spinner height="4rem" />
        </div>
      ) : null}
      {page ? <div ref={setTarget} /> : null}
    </main>
  )
}

export default GalleryPage
