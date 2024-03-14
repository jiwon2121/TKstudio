'use client'

import DownloadIcon from '@@/assets/icons/download.svg'
import LinkIcon from '@@/assets/icons/link.svg'
import DeleteIcon from '@@/assets/icons/trash.svg'
import { useSearchParams, useRouter } from 'next/navigation'
import { useRef, Suspense } from 'react'
import sampleImage from '@@/assets/images/sample.png'
import EmptyButton from './_components/EmptyButton'
import IconWrapper from './_components/IconWrapper'
import Image from 'next/image'

function Detail() {
  const searchParams = useSearchParams().get('a')
  // const dl = useRef<HTMLAnchorElement>(null)

  const handleDownload = () => {
    const dl = document.createElement('a')
    dl.href =
      process.env.NEXT_PUBLIC_IMAGE_URL +
      '?url=https://picsum.photos/id/237/200/300&w=128&q=100'
    dl.download = ''
    console.log(dl)
    dl.click()
    dl.remove()
    // console.log(dl)
  }

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
      <IconWrapper>
        <EmptyButton
          onClick={() => {
            handleDownload()
          }}
        >
          <DownloadIcon width="1.5rem" height="1.5rem" />
        </EmptyButton>
        <EmptyButton
          onClick={async () => {
            const file = await urlToFile(
              'http://localhost:3000' + sampleImage.src,
            )
            await handleShare(file)
          }}
        >
          <LinkIcon width="1.5rem" height="1.5rem" />
        </EmptyButton>
        <DeleteIcon width="1.5rem" height="1.5rem" />
      </IconWrapper>
      <Image
        src={'https://picsum.photos/id/237/200/300'}
        alt="sample"
        width={16}
        height={16}
      />
    </main>
  )
}

function GalleryDetailPage() {
  return (
    <Suspense>
      <Detail />
    </Suspense>
  )
}

export default GalleryDetailPage
