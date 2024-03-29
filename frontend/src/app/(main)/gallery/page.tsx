'use client'

import { useEffect, useState, useContext } from 'react'
import { GalleryContext } from '@/app/(main)/_components/ContextProvider'
import ImageWrapper from '@/components/ImageWrapper'
import Spinner from '@/components/Spinner'
import Link from 'next/link'
import Grid from './_components/Grid'
import NoImage from './_components/NoImage'
import { LightGray } from '@@/assets/styles/pallete'

function GalleryPage() {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [urls, setUrls] = useState<Array<string>>([])
  const {
    page,
    picInfo,
    pictures,
    setPage,
    setPictures,
    getBlob,
    getPicInfo,
    isLoading,
    setIsLoading,
  } = useContext(GalleryContext)

  const renderPictures = () => {
    if (page === null && pictures.length === 0 && isLoading === false) {
      return <NoImage />
    }
    return pictures.map((pic, index) => {
      const optString = picInfo[index].optionName
        ? `/${picInfo[index].optionName}`
        : ''

      const date = picInfo[index].createdTime.slice(0, 10).replaceAll('-', '.')

      return (
        <Link
          key={index}
          href={`/gallery/detail/${picInfo[index].imageInfoId}/${date}${optString}`}
          style={{
            width: '100%',
            aspectRatio: '1/1',
          }}
        >
          {urls[index] ? (
            <ImageWrapper
              src={urls[index]}
              alt="1"
              $width="100%"
              $aspectRatio="1 / 1"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', color: LightGray }} />
          )}
        </Link>
      )
    })
  }

  useEffect(() => {
    const get = async () => {
      const newInfo = await getPicInfo()
      const onIntersect: IntersectionObserverCallback = async (
        [entry],
        observer,
      ) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          setIsLoading(true)

          const start = pictures.length
          let end = start + 10
          let promises: Array<Promise<Blob>>

          if (newInfo) {
            if (newInfo.length <= end) {
              end = newInfo.length
              setPage(null)
            } else {
              setPage((prev) => (prev as number) + 1)
            }
            promises = newInfo.slice(start, end).map((info) => {
              return getBlob(info.imageInfoId)
            })
          } else {
            if (picInfo.length <= end) {
              end = picInfo.length
              setPage(null)
            } else {
              setPage((prev) => (prev as number) + 1)
            }
            promises = picInfo.slice(start, end).map((info) => {
              return getBlob(info.imageInfoId)
            })
          }
          const newPics = await Promise.all(promises)
          setPictures((prev) => prev.concat(newPics))
          setIsLoading(false)
        }
      }
      if (target) {
        const observer = new IntersectionObserver(onIntersect, { threshold: 1 })
        observer.observe(target)
      }
    }

    get()
  }, [target, pictures.length])

  useEffect(() => {
    return () => {
      urls.forEach((url) => {
        URL.revokeObjectURL(url)
      })
    }
  }, [urls])

  useEffect(() => {
    setUrls((prev) => {
      const newUrls = pictures
        .slice(prev.length, pictures.length)
        .map((pic) => {
          return URL.createObjectURL(pic)
        })
      return prev.concat(newUrls)
    })
  }, [pictures])

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
