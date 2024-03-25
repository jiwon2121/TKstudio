'use client'

import { useEffect, useState } from 'react'
import ImageWrapper from '@/components/ImageWrapper'
import Spinner from '@/components/Spinner'
import Link from 'next/link'
import Grid from './_components/Grid'

function GalleryPage() {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [page, setPage] = useState<number | null>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
        <Link href="/gallery/detail/1/option1/option2">
          <ImageWrapper
            src={
              'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/processedImages/06ee5334-e5bc-11ee-8b06-0242ac110004.png'
            }
            alt="1"
            $width="100%"
            $aspectRatio="1 / 1"
            priority={true}
          />
        </Link>
        {renderPictures()}
      </Grid>
      {isLoading ? (
        <div style={{ verticalAlign: 'middle' }}>
          <Spinner />
        </div>
      ) : null}
      {page ? <div ref={setTarget} /> : null}
    </main>
  )
}

export default GalleryPage
