'use client'

import { useState, useEffect, useRef, useContext } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { GalleryContext } from '@/app/(main)/_components/ContextProvider'
import DownloadIcon from '@@/assets/icons/download.svg'
import LinkIcon from '@@/assets/icons/link.svg'
import DeleteIcon from '@@/assets/icons/trash.svg'
import SlideupModal from '@/components/SlideupModal'
import ModalContents from '@/components/ModalContents'
import Slider from './_components/Slider'
import EmptyButton from './_components/EmptyButton'
import IconWrapper from './_components/IconWrapper'
import OptionsWrapper from './_components/OptionsWrapper'
import Main from './_components/Main'
import { fetchDataWithAuthorization as fetchAuth } from '@/utils/api'

function GalleryDetailPage() {
  const router = useRouter()
  const { id, options } = useParams()

  const baseUrl = process.env.NEXT_PUBLIC_BACK_URL
  const originalUrl = `${baseUrl}/api/v1/image/getImage/originalImage/${id}`
  const processedUrl = `${baseUrl}/api/v1/image/getImage/processedImage/${id}`

  const [images, setImages] = useState<Array<string>>([])
  const [downloadSeen, setDownloadSeen] = useState<boolean>(false)
  const [deleteSeen, setDeleteSeen] = useState<boolean>(false)
  const [isClose, setIsClose] = useState<boolean>(true)

  const canvas = useRef<HTMLCanvasElement>(null)
  const blobs = useRef<Array<Blob | null>>([null, null])

  const { reset } = useContext(GalleryContext)

  const renderOptions = () => {
    if (typeof options === 'string') {
      return <span>#{decodeURI(options)}</span>
    } else if (Array.isArray(options)) {
      return options.map((option, index) => {
        return <span key={index}>#{decodeURI(option)}</span>
      })
    }

    return null
  }

  const handleClose = async () => {
    setIsClose(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setDownloadSeen(false)
    setDeleteSeen(false)
  }

  const handleDownloadOpen = () => {
    setDownloadSeen(true)
    setIsClose(false)
  }

  const handleDeleteOpen = () => {
    setDeleteSeen(true)
    setIsClose(false)
  }

  const handleDelete = async () => {
    try {
      const res = await fetchAuth(
        `${baseUrl}/api/v1/image/delete/${id}`,
        localStorage.getItem('accessToken') as string,
        localStorage.getItem('refreshToken') as string,
        {
          method: 'GET',
        },
      )
      if (res?.status === 200) {
        reset()
        router.replace('/gallery')
      } else if (res?.status === 401 || res?.status === 403) {
        throw new Error(`${res.status}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDownload = (width: number, height: number) => {
    if (images[1] && canvas.current) {
      const ctx = canvas.current.getContext('2d')
      const img = new Image()

      canvas.current.width = width
      canvas.current.height = height

      img.src = images[1]
      img.onload = () => {
        ctx?.drawImage(img, 0, 0, width, height)
        const anchor = document.createElement('a')
        anchor.href = canvas.current?.toDataURL('image/png', 1) as string
        anchor.download = '증명 사진.png'
        anchor.click()
        anchor.remove()
      }
    }
  }

  const handleShare = async (file: File) => {
    await navigator.share({
      title: '증명사진',
      files: [file],
    })
  }

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image)
      })
    }
  }, [images])

  useEffect(() => {
    const getImages = async () => {
      try {
        const original = fetchAuth(
          originalUrl,
          localStorage.getItem('accessToken') as string,
          localStorage.getItem('refreshToken') as string,
          {
            method: 'GET',
          },
        )
          .then((res) => (res as Response).blob())
          .then((blob) => {
            blobs.current[0] = blob
            return URL.createObjectURL(blob)
          })

        const processed = fetchAuth(
          processedUrl,
          localStorage.getItem('accessToken') as string,
          localStorage.getItem('refreshToken') as string,
          {
            method: 'GET',
          },
        )
          .then((res) => (res as Response).blob())
          .then((blob) => {
            blobs.current[1] = blob
            return URL.createObjectURL(blob)
          })

        const res = await Promise.all([original, processed])
        setImages(res)
      } catch (err) {
        console.log(err)
      }
    }

    getImages()
  }, [originalUrl, processedUrl])

  const contents = [
    {
      content: '96 X 128',
      handleDownload: handleDownload,
      width: 96,
      height: 128,
    },
    {
      content: '192 X 256',
      handleDownload: handleDownload,
      width: 192,
      height: 256,
    },
    {
      content: '384 X 512',
      handleDownload: handleDownload,
      width: 384,
      height: 512,
    },
    {
      content: '768 X 1024',
      handleDownload: handleDownload,
      width: 768,
      height: 1024,
    },
  ]

  return (
    <Main>
      <Slider before={images[0]} after={images[1]} />
      <IconWrapper>
        <EmptyButton
          onClick={() => {
            handleDownloadOpen()
          }}
        >
          <DownloadIcon width="1.5rem" height="1.5rem" />
        </EmptyButton>
        <EmptyButton
          onClick={async () => {
            if (blobs.current[1]) {
              const file = new File([blobs.current[1]], 'image.png', {
                type: 'image/png',
              })
              await handleShare(file)
            }
          }}
        >
          <LinkIcon width="1.5rem" height="1.5rem" />
        </EmptyButton>
        <EmptyButton
          onClick={() => {
            handleDeleteOpen()
          }}
        >
          <DeleteIcon width="1.5rem" height="1.5rem" />
        </EmptyButton>
      </IconWrapper>
      {downloadSeen && (
        <SlideupModal isClose={isClose} handleClose={handleClose}>
          <ModalContents
            title="사진 크기를 정해주세요"
            contents={contents}
            handleCancel={handleClose}
          />
        </SlideupModal>
      )}
      {deleteSeen && (
        <SlideupModal isClose={isClose} handleClose={handleClose}>
          <ModalContents
            title="삭제하시겠습니까?"
            contents={[{ content: '네', handleClick: handleDelete }]}
            handleCancel={handleClose}
            cancel='아니요'
          />
        </SlideupModal>
      )}
      <OptionsWrapper>{renderOptions()}</OptionsWrapper>
      <canvas ref={canvas} style={{ display: 'none' }} />
    </Main>
  )
}

export default GalleryDetailPage
