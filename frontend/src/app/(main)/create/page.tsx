'use client'

import { ChangeEvent, FormEvent, useRef, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { GalleryContext } from '../_components/ContextProvider'
import { GenderCategory } from '../store/page'
import CreateOptionList from './_components/CreateOptionList'
import CreateOptionGenderTab from './_components/CreateOptionGenderTab'
import Ddalkkak from './_components/Lottiddlkkak'
import { fetchDataWithAuthorization } from '@/utils/api'
import Button from '@/components/Button'
import AlertModal from '@/components/AlertModal'
import { MainGreen, Black } from '@@/assets/styles/pallete'

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
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Black}80;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 100px;
`

const CreatePageButton = {
  $height: '60px',
  $width: '100%',
  $fontWeight: 'bold',
  $margin: '10px',
  $fontSize: '1.5rem',
}

function CreatePage() {
  const { reset } = useContext(GalleryContext)
  const [image, setImage] = useState<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [requestImgWidth, setRequestImgWidth] = useState<number | null>(null)
  const [requestImgHeight, setRequestImgHeight] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageBlob, setImageBlob] = useState<Blob | null>(null)
  const [selectedOptionId, setSelectedOptionId] = useState<number>(0)
  const [optionGender, setOptionGender] = useState<GenderCategory>('ALL')
  const [isLoading, setIsLoading] = useState(false) // isLoading 상태 추가
  const [alertMessage, setAlertMessage] = useState<string>('')

  const maxWidth = 1024 // 최대 너비
  const maxHeight = 1024 // 최대 높이

  const router = useRouter()

  function handleImageInputClick(event: any) {
    event?.preventDefault()
    imageInputRef.current?.click()
  }

  function handleClose() {
    setAlertMessage('')
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

    setIsLoading(true) // 로딩 상태를 true로 변경
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

    setIsLoading(false)
    if (res!.status === 200) {
      const createdImageId = res?.headers.get('imageInfoId')
      reset()
      router.push(`/create/result?imageId=${createdImageId}`)
    } else if (res!.status === 400) {
      const json = await res?.json()
      if (json.message === '탐지된 얼굴이 2개 이상입니다.') {
        setAlertMessage('사람이 너무 많아요')
      } else if (json.message === '얼굴이 없습니다.') {
        setAlertMessage('사람을 찾을 수 없어요')
      }
      console.log(json)
    } else {
      setAlertMessage('다시 시도해 주세요')
    }
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
          <CreateOptionGenderTab
            optionGender={optionGender}
            setOptionGender={setOptionGender}
          />
          <CreateOptionList
            optionGender={optionGender}
            selectedOptionId={selectedOptionId}
            setSelectedOptionId={setSelectedOptionId}
          />

          <Button {...CreatePageButton} $wordSpacing="2rem">
            딸 깍
          </Button>

          {/* 로딩 상태에 따라 모달을 렌더링 */}
          {isLoading && (
            <ModalWrapper
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <ModalContent>
                <Ddalkkak />
              </ModalContent>
            </ModalWrapper>
          )}

          {alertMessage && (
            <AlertModal handleClose={handleClose}>{alertMessage}</AlertModal>
          )}
        </ImgRequestForm>
      </ContentContainer>
    </MainWrapper>
  )
}

export default CreatePage
