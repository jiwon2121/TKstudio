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
  const imgInputRef = useRef<HTMLInputElement>(null)

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
    imgInputRef.current?.click()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!image) {
      alert('사진을 첨부해주세요')
      return
    }
    alert('첨부 완료')
  }

  return (
    <main>
      <ImgRequestForm onSubmit={handleSubmit}>
        <input
          ref={imgInputRef}
          type="file"
          id="imgInput"
          name="imgInput"
          accept="image/*"
          onChange={changeInput}
          hidden
        />
        <ImgContainer onClick={handleImageInputClick}>
          {!image && <UploadSquare>사진을 추가해주세요</UploadSquare>}
          {image && <OriginalImg src={image} alt="imgInput" />}
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
