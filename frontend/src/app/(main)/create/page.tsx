'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function CreatePage() {
  const [imageData, setImageData] = useState<string | null>(null)

  useEffect(() => {
    // // URL에서 이미지 데이터를 가져옴
    // const urlParams = new URLSearchParams(window.location.search)
    // const imageUrlParam = urlParams.get('image')
    // if (imageUrlParam) {
    //   // Blob URL을 디코딩하여 이미지 데이터 설정
    //   const blobUrl = imageUrlParam
    //   setImageData(blobUrl)
    // }

    const blobUrl = localStorage.getItem('img')
    setImageData(blobUrl)
    
  }, [])

  return (
    <div>
      <h2>생성 페이지</h2>
      {/* 이미지 데이터를 사용하여 이미지를 표시 */}
      {imageData && (
        <img src={imageData} alt="Captured" style={{ maxWidth: '100%' }} />
      )}
      {!imageData && <div><h1>이미지 없음</h1></div>}
      <div style={{ margin: '10px' }}>
        <Link
          href={'/main/create/camera'}
          style={{
            textDecoration: 'none',
            color: 'black',
            border: 'solid black',
            padding: '2px',
          }}
        >
          카메라
        </Link>
      </div>
    </div>
  )
}

export default CreatePage
