'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DownloadIcon from '@@/assets/icons/download.svg'
import LinkIcon from '@@/assets/icons/link.svg'
import DeleteIcon from '@@/assets/icons/trash.svg'
import EmptyButton from './_components/EmptyButton'
import IconWrapper from './_components/IconWrapper'
import Slider from '@/components/Slider'
import SlideupModal from '@/components/SlideupModal'
import ModalContents from '@/components/ModalContents'
import OptionsWrapper from './_components/OptionsWrapper'

function GalleryDetailPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BACK_URL
  const router = useRouter()
  const { id, options } = useParams()
  const originalUrl = `${baseUrl}/api/v1/image/getImage/originalImage/${id}`
  const processedUrl = `${baseUrl}/api/v1/image/getImage/processedImage/${id}`
  const [images, setImages] = useState<Array<string>>([])
  const [seen, setSeen] = useState<boolean>(false)
  const [isClose, setIsClose] = useState<boolean>(true)
  const canvas = useRef<HTMLCanvasElement>(null)
  const accTk = useRef<string | null>(null)
  const blobs = useRef<Array<Blob | null>>([null, null])

  const renderOptions = () => {
    if (typeof options === 'string') {
      return <b>#{decodeURI(options)}</b>
    } else if (Array.isArray(options)) {
      return options.map((option, index) => {
        return <b key={index}>#{decodeURI(option)}</b>
      })
    }

    return null
  }

  const handleClose = async () => {
    setIsClose(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setSeen(false)
  }

  const handleOpen = () => {
    setSeen(true)
    setIsClose(false)
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/image/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: accTk.current as string,
        },
      })
      if (res.status === 200) {
        router.push('/gallery')
      } else if (res.status === 401 || res.status === 403) {
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
    const accessToken = localStorage.getItem('accessToken') as string
    accTk.current = accessToken

    const getImages = async () => {
      try {
        const original = fetch(originalUrl, {
          method: 'GET',
          headers: {
            Authorization: accessToken,
          },
        })
          .then((res) => res.blob())
          .then((blob) => {
            blobs.current[0] = blob
            return URL.createObjectURL(blob)
          })

        const processed = fetch(processedUrl, {
          method: 'GET',
          headers: {
            Authorization: accessToken,
          },
        })
          .then((res) => res.blob())
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
    <main>
      <Slider before={images[0]} after={images[1]} />
      <IconWrapper>
        <EmptyButton
          onClick={() => {
            handleOpen()
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
            handleDelete()
          }}
        >
          <DeleteIcon width="1.5rem" height="1.5rem" />
        </EmptyButton>
      </IconWrapper>
      {seen && (
        <SlideupModal isClose={isClose} handleClose={handleClose}>
          <ModalContents
            title="테스트"
            contents={contents}
            handleCancel={handleClose}
          />
        </SlideupModal>
      )}
      <OptionsWrapper>{renderOptions()}</OptionsWrapper>
      <canvas ref={canvas} style={{ display: 'none' }} />
    </main>
  )
}

export default GalleryDetailPage
