'use client'

import OptionList from './_components/optionList'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import styled from 'styled-components'
import Button from '@/components/Button'
import { MainGreen } from '@@/assets/styles/pallete'

const ImgRequestForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImgContainer = styled.div`
  border: solid ${MainGreen};
  border-radius: 10px;
  overflow: hidden;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const UploadSquare = styled.div`
  width: 100%;
  text-align: center;
  color: ${MainGreen};
  font-size: 20px;
  font-weight: bolder;
`

const OriginalImg = styled.img`
  height: 100%;
  object-fit: cover;
`

const CreatePageButton = {
  $height: '60px',
  $width: '300px',
  $fontWeight: 'bolder',
  $margin: '10px',
}

function CreatePage() {
  const [image, setImage] = useState<string | null>(null)
  const [resImg, setResImg] = useState<string | null>(null)
  const originalImageRef = useRef<HTMLInputElement>(null)

  function changeInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleImageInputClick(event: any) {
    event?.preventDefault()
    originalImageRef.current?.click()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!image) {
      alert('사진을 첨부해주세요')
      return
    }

    const accessToken = localStorage.getItem('accessToken') as string

    const formData = new FormData(event.currentTarget)
    formData.append('background', '1')
    formData.append('suit', '1')
    formData.append('hair', '1')
    formData.append('sex', 'MALE')

    const res = await fetch(
      process.env.NEXT_PUBLIC_BACK_URL! + '/api/v1/image/create',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: accessToken,
        },
      },
    )
    const imageBlob = await res.blob()
    const imageObjectURL = URL.createObjectURL(imageBlob)
    console.log(imageObjectURL)
    setResImg(imageObjectURL)
  }

  return (
    <main>
      {resImg && <img src={resImg} alt="resImg" />}
      <ImgRequestForm onSubmit={handleSubmit}>
        <input
          ref={originalImageRef}
          type="file"
          id="originalImage"
          name="originalImage"
          accept="image/*"
          onChange={changeInput}
          hidden
        />
        <ImgContainer onClick={handleImageInputClick}>
          {!image && <UploadSquare>사진을 추가해주세요</UploadSquare>}
          {image && <OriginalImg src={image} alt="originalImage" />}
        </ImgContainer>
        <Button {...CreatePageButton} onClick={handleImageInputClick}>
          사진 {image ? '변경' : '추가'}
        </Button>
        <div>
          <OptionList />
        </div>
        <Button {...CreatePageButton}>딸깍</Button>
      </ImgRequestForm>
    </main>
  )
}

export default CreatePage
