'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import ImageWrapper from '@/components/ImageWrapper'
import sampleImage from '@@/assets/images/sample.png'

function GalleryPage() {
  useEffect(() => {
    console.log(window.innerWidth)
  }, [])

  return (
    <main>
      갤러리 페이지
      <ImageWrapper
        $width="30vw"
        $height="30vw"
        src="https://picsum.photos/id/237/200/300"
        alt="asdasdf"
      />
      <ImageWrapper
        $width="50vw"
        origin={true}
        src="https://picsum.photos/id/237/200/300"
        alt="asdasdf"
      />
      <ImageWrapper
        $width="50vw"
        origin={true}
        src={sampleImage}
        alt="sampleImage"
      />
    </main>
  )
}

export default GalleryPage
