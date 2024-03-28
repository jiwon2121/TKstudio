'use client'

import React, { createContext, useState, useCallback, useEffect } from 'react'
import { fetchDataWithAuthorization as fetchAuth } from '@/utils/api'

export interface PicInfo {
  imageInfoId: number
  createdTime: string
  optionName: string
}

interface ContextType {
  page: number | null
  picInfo: Array<PicInfo>
  pictures: Array<Blob>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setPage: React.Dispatch<React.SetStateAction<number | null>>
  setPictures: React.Dispatch<React.SetStateAction<Array<Blob>>>
  getBlob: (id: number) => Promise<Blob>
  reset: () => void
  getPicInfo: () => Promise<Array<PicInfo> | null>
  getPictures: () => Promise<void>
}

interface Props {
  children: React.ReactNode
}

export const GalleryContext = createContext<ContextType>({} as ContextType)

function GalleryProvider({ children }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_BACK_URL
  const [page, setPage] = useState<number | null>(1)
  const [picInfo, setPicInfo] = useState<Array<PicInfo>>([])
  const [pictures, setPictures] = useState<Array<Blob>>([])
  const [isGetInfo, setIsGetInfo] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const reset = () => {
    setPage(1)
    setPicInfo([])
    setPictures([])
    setIsGetInfo(false)
    setIsLoading(true)
  }

  useEffect(() => {
    return reset
  }, [])

  const getPicInfo = useCallback(async () => {
    if (!isGetInfo) {
      const newInfo: Array<PicInfo> = []
      const response = await fetchAuth(
        `${baseUrl}/api/v1/image/getImageInfos`,
        localStorage.getItem('accessToken') as string,
        localStorage.getItem('refreshToken') as string,
        {
          method: 'GET',
        },
      ).then((res) => (res as Response).json())

      for (let key in response) {
        newInfo.push(response[key])
      }

      const res = newInfo.sort((a, b) => b.imageInfoId - a.imageInfoId)
      setPicInfo(res)
      setIsGetInfo(true)

      return res
    }
    return null
  }, [baseUrl, isGetInfo])

  const getBlob = useCallback(
    (id: number) => {
      return fetchAuth(
        `${baseUrl}/api/v1/image/getImage/thumbnailImage/${id}`,
        localStorage.getItem('accessToken') as string,
        localStorage.getItem('refreshToken') as string,
        {
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('accessToken') as string,
          },
        },
      ).then((res) => (res as Response).blob())
    },
    [baseUrl],
  )

  const getPictures = useCallback(async () => {
    const start = (page as number) - 1 * 10
    let end = (page as number) * 10

    if (picInfo.length <= end) {
      end = picInfo.length
      setPage(null)
    }

    const promises = picInfo.slice(start, end).map((info) => {
      return getBlob(info.imageInfoId)
    })
    const newPics = await Promise.all(promises)

    setPictures((prev) => prev.concat(newPics))
  }, [page, getBlob, picInfo])

  return (
    <GalleryContext.Provider
      value={{
        page,
        picInfo,
        pictures,
        isLoading,
        setIsLoading,
        setPage,
        setPictures,
        getBlob,
        reset,
        getPicInfo,
        getPictures,
      }}
    >
      {children}
    </GalleryContext.Provider>
  )
}

export default GalleryProvider
