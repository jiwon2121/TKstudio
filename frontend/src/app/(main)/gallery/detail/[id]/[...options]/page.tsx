'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DownloadIcon from '@@/assets/icons/download.svg'
import LinkIcon from '@@/assets/icons/link.svg'
import DeleteIcon from '@@/assets/icons/trash.svg'
import EmptyButton from './_components/EmptyButton'
import IconWrapper from './_components/IconWrapper'
import Slider from '@/components/Slider'
import SlideupModal from '@/components/SlideupModal'
import ModalContents from '@/components/ModalContents'

function GalleryDetailPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BACK_URL
  const accessToken = localStorage.getItem('accessToken')
  const { id, options } = useParams()
  const router = useRouter()
  const [seen, setSeen] = useState<boolean>(false)
  const [isClose, setIsClose] = useState<boolean>(true)
  const contents = [
    { content: '96 X 128' },
    { content: '192 X 256' },
    { content: '284 X 256' },
    { content: '768 X 1024' },
  ]

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
          Authorization: accessToken as string,
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

  // const handleDownload = () => {
  //   const dl = document.createElement('a')
  //   dl.href =
  //     process.env.NEXT_PUBLIC_IMAGE_URL +
  //     '?url=https://picsum.photos/id/237/200/300&w=128&q=100'
  //   dl.download = ''
  //   console.log(dl)
  //   dl.click()
  //   dl.remove()
  // }

  const handleShare = async (file: File) => {
    await navigator.share({
      title: '증명사진',
      files: [file],
    })
  }

  const urlToFile = async (url: string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    return new File([blob], 'image.png', { type: 'image/png' })
  }

  return (
    <main>
      <Slider
        before={
          'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/originalImages/05943184-e5bc-11ee-8b06-0242ac110004.png'
        }
        after={
          'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/processedImages/06ee5334-e5bc-11ee-8b06-0242ac110004.png'
        }
      />
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
            const file = await urlToFile(
              'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/processedImages/06ee5334-e5bc-11ee-8b06-0242ac110004.png',
            )
            await handleShare(file)
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
    </main>
  )
}

export default GalleryDetailPage
