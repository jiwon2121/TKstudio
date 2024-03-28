'use client'

import CreateOptionList from './_components/CreateOptionList'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import styled from 'styled-components'
import Button from '@/components/Button'
import { MainGreen } from '@@/assets/styles/pallete'
import { useRouter } from 'next/navigation'
import CreateOptionGenderTab from './_components/CreateOptionGenderTab'
import { GenderCategory } from '../store/page'
import { fetchDataWithAuthorization } from '@/utils/api'

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContentContainer = styled.div`
  width: 80%;
  margin-top: 20px;
`

const ImgRequestForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageWrapper = styled.div`
  border: solid ${MainGreen};
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const UploadSquare = styled.div`
  width: 100%;
  text-align: center;
  color: ${MainGreen};
  font-size: xx-large;
  font-weight: bolder;
`

const OriginalImg = styled.img`
  height: 100%;
  object-fit: contain;
`

const TextWrapper = styled.div`
  font-size: x-large;
  align-self: flex-start;
  margin-bottom: 5px;
`

const CreatePageButton = {
  $height: '60px',
  $width: '100%',
  $fontWeight: 'bolder',
  $margin: '10px',
}

function CreatePage() {
  const [image, setImage] = useState<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [requestImgWidth, setRequestImgWidth] = useState<number | null>(null)
  const [requestImgHeight, setRequestImgHeight] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageBlob, setImageBlob] = useState<Blob | null>(null)
  const [selectedOptionId, setSelectedOptionId] = useState<number>(0)
  const [optionGender, setOptionGender] = useState<GenderCategory>('ALL')

  const maxWidth = 1024 // 최대 너비
  const maxHeight = 1024 // 최대 높이

  const router = useRouter()

  function handleImageInputClick(event: any) {
    event?.preventDefault()
    imageInputRef.current?.click()
  }

  async function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const resizedBlob = (await resizeImageToBlob(
        file,
        maxWidth,
        maxHeight,
      )) as Blob
      setImageBlob(resizedBlob)
      const resizedImageUrl = URL.createObjectURL(resizedBlob)
      setImage(resizedImageUrl)
    }
  }

  function resizeImageToBlob(file: File, maxWidth: number, maxHeight: number) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const uploadedImg = new Image()
        uploadedImg.onload = () => {
          let width = uploadedImg.width
          let height = uploadedImg.height

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height)
            width *= ratio
            height *= ratio
          }

          setRequestImgWidth(width)
          setRequestImgHeight(height)
          const canvas = canvasRef.current
          canvas!.width = width
          canvas!.height = height
          const ctx = canvas!.getContext('2d')
          ctx!.drawImage(uploadedImg, 0, 0, width, height)

          canvas!.toBlob((blob) => {
            resolve(blob)
          }, 'image/jpeg')
        }
        uploadedImg.src = event.target?.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!image) {
      alert('사진을 첨부해주세요')
      return
    }

    if (!selectedOptionId) {
      alert('옵션을 선택해주세요')
      return
    }

    const accessToken = localStorage.getItem('accessToken') as string
    const refreshToken = localStorage.getItem('refreshToken') as string

    const formData = new FormData()
    formData.append('originalImage', imageBlob!)
    formData.append('width', String(requestImgWidth))
    formData.append('height', String(requestImgHeight))
    formData.append('optionId', String(selectedOptionId))

    const url = process.env.NEXT_PUBLIC_BACK_URL! + '/api/v1/image/create'
    const createOption = {
      method: 'POST',
      body: formData,
    }
    const res = await fetchDataWithAuthorization(
      url,
      accessToken,
      refreshToken,
      createOption,
    )

    if (!res!.ok) {
      alert('생성 실패!')
      throw new Error('이미지 생성 실패!')
    }
    const createdImageId = res!.headers.get('imageInfoId')
    router.push(`/create/result?imageId=${createdImageId}`)
  }

  return (
    <MainWrapper>
      <ContentContainer>
        <canvas ref={canvasRef} hidden />
        <input
          ref={imageInputRef}
          type="file"
          id="originalImage"
          name="originalImage"
          accept="image/*"
          onChange={handleFileInputChange}
          hidden
        />
        <ImgRequestForm onSubmit={handleSubmit}>
          <ImageWrapper onClick={handleImageInputClick}>
            {!image && <UploadSquare>+</UploadSquare>}
            {image && <OriginalImg src={image} alt="originalImage" />}
          </ImageWrapper>
          <Button {...CreatePageButton} onClick={handleImageInputClick}>
            사진 {image ? '변경' : '추가'}
          </Button>
          <TextWrapper>내 옵션 리스트</TextWrapper>
          <CreateOptionGenderTab
            optionGender={optionGender}
            setOptionGender={setOptionGender}
          />
          <CreateOptionList
            optionGender={optionGender}
            selectedOptionId={selectedOptionId}
            setSelectedOptionId={setSelectedOptionId}
          />

          <Button {...CreatePageButton}>딸깍</Button>
        </ImgRequestForm>
      </ContentContainer>
    </MainWrapper>
  )
}

export default CreatePage
