'use client'

import { useEffect, useState, useCallback } from 'react'
import ImageWrapper from '@/components/ImageWrapper'
import Spinner from '@/components/Spinner'
import Link from 'next/link'
import Grid from './_components/Grid'
import NoImage from './_components/NoImage'

interface PicInfo {
  imageInfoId: number
  createdTime: string
  selectOptionDTOList: Array<number>
}

function GalleryPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BACK_URL
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [page, setPage] = useState<number | null>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [picInfo, setPicInfo] = useState<Array<PicInfo>>([])
  const [pictures, setPictures] = useState<Array<string>>([])

  const renderPictures = () => {
    if (page === null && pictures.length === 0) {
      return <NoImage />
    }
    return pictures.map((url, index) => {
      const init: string = ''
      const optString = picInfo[index].selectOptionDTOList.reduce(
        (accumulator, currentValue) => {
          return accumulator + `/${currentValue}`
        },
        init,
      )
      return (
        <Link
          key={index}
          href={`/gallery/detail/${picInfo[index].imageInfoId}${optString}`}
          locale="ko-kr"
        >
          <ImageWrapper
            src={url.toString()}
            alt="1"
            $width="100%"
            $aspectRatio="1 / 1"
          />
        </Link>
      )
    })
  }

  const getBlob = useCallback(
    (id: number, accTk: string) => {
      return fetch(`${baseUrl}/api/v1/image/getImage/thumbnailImage/${id}`, {
        method: 'GET',
        headers: { Authorization: accTk },
      })
        .then((res) => res.blob())
        .then((blob) => URL.createObjectURL(blob))
    },
    [baseUrl],
  )

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') as string

    async function getPictures() {
      setIsLoading(true)
      const picInfo = await fetch(`${baseUrl}/api/v1/image/getImageInfos`, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('accessToken') as string,
        },
      }).then((res) => res.json())

      if (Object.keys(picInfo).length === 0) {
        setPage(null)
      } else {
        const newInfo: Array<PicInfo> = []
        const promises: Array<Promise<string>> = []

        for (let i in picInfo) {
          newInfo.push(picInfo[i])
          promises.push(getBlob(picInfo[i].imageInfoId, accessToken))
        }

        const newPics = await Promise.all(promises)

        setPicInfo((prev) => prev.concat(newInfo))
        setPictures((prev) => prev.concat(newPics))
        setPage((prev) => (prev as number) + 1)
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
  }, [target, baseUrl, getBlob, page])

  return (
    <main>
      <Grid>{renderPictures()}</Grid>
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
