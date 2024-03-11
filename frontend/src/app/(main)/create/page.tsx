'use client'

import OptionList from './_components/optionList'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

function CreatePage() {
  const [imageData, setImageData] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const imgInputRef = useRef<HTMLInputElement>(null)
  const imgInput2Ref = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDialogElement>(null)

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

  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageInputClick = () => {
    if (window.confirm('찍으쉴?')) {
      imgInputRef.current?.click()
      modalRef.current?.close()
    }
  }
  const handleImageInputClick2 = () => {
    if (window.confirm('고르쉴?')) {
      imgInput2Ref.current?.click()
      modalRef.current?.close()
    }
  }

  const handleShowModal = () => {
    modalRef.current?.showModal()
  }

  return (
    <main
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <input
        ref={imgInputRef}
        type="file"
        id="selfie"
        name="selfie"
        accept="image/*"
        capture="user"
        onChange={changeInput}
        hidden
      />
      <input
        ref={imgInput2Ref}
        type="file"
        id="selfie2"
        name="selfie"
        accept="image/*"
        onChange={changeInput}
        hidden
      />
      <dialog
        ref={modalRef}
        style={{ width: '150px', padding: '0px', textAlign: 'center' }}
      >
        <div
          style={{
            textDecoration: 'none',
            color: 'black',
            padding: '20px',
            borderBottom: 'solid black',
          }}
          onClick={handleImageInputClick}
        >
          사진 찍기
        </div>
        <div
          style={{
            textDecoration: 'none',
            color: 'black',
            padding: '20px',
            borderBottom: 'solid black',
          }}
          onClick={handleImageInputClick2}
        >
          사진 고르기
        </div>
        <div
          style={{
            textDecoration: 'none',
            color: 'black',
            padding: '20px',
          }}
          onClick={() => modalRef.current?.close()}
        >
          닫기
        </div>
      </dialog>

      <div
        style={{ width: '80%', maxWidth: '400px', margin: '20px' }}
        onClick={handleShowModal}
      >
        {!image && (
          <div
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: 'gray',
              color: 'white',
              textAlign: 'center',
            }}
          >
            업로드 선택
          </div>
        )}
        {image && (
          <img
            src={image}
            alt="사용자 셀카"
            style={{ maxWidth: '100%', maxHeight: '400px' }}
          />
        )}
      </div>

      <div style={{ maxWidth: '50%', maxHeight: '400px' }}>
        {/* 이미지 데이터를 사용하여 이미지를 표시 */}
        {imageData && (
          <img src={imageData} alt="Captured" style={{ maxWidth: '100%' }} />
        )}
        <Link
          href={'/create/camera'}
          style={{
            textDecoration: 'none',
            color: 'black',
            border: 'solid black',
            padding: '10px',
          }}
        >
          카메라 페이지
        </Link>
      </div>
      <div>
        <OptionList />
      </div>
    </main>
  )
}

export default CreatePage
