'use client'

import Button from '@/components/Button'
import ImageWrapper from '@/components/ImageWrapper'
import { useRouter } from 'next/navigation'
import styled, { keyframes } from 'styled-components'
import { MainRed, MainGreen } from '@@/assets/styles/pallete'
import { useEffect, useState, useContext } from 'react'
import { GalleryContext } from '../../_components/ContextProvider'
import { fetchDataWithAuthorization } from '@/utils/api'
import AlertModal from '@/components/AlertModal'

const MainWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 110px;
`
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const FadeInImage = styled.div`
  width: auto;
  height: auto;
  overflow: hidden;
  opacity: 0;
  animation: ${fadeIn} 3s forwards;
  animation-delay: 0s;
`

const Result = function () {
  const router = useRouter()
  const [imageData, setImageData] = useState<string>('')
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [alertColor, setAlertColor] = useState<string>(MainRed)
  const { reset } = useContext(GalleryContext)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  const handleClose = () => {
    if (alertMessage === '삭제되었습니다') {
      router.replace('/create')
    } else {
      setAlertMessage('')
    }
  }

  const handleDelete = async () => {
    try {
      const params = new URLSearchParams(window.location.search)
      const imageId = params.get('imageId')
      const accessToken = localStorage.getItem('accessToken') as string
      const refreshToken = localStorage.getItem('refreshToken') as string
      console.log('삭제이미지아이디: ', imageId)

      const url =
        process.env.NEXT_PUBLIC_BACK_URL! + `/api/v1/image/delete/${imageId}`
      const createOption = {
        method: 'GET',
      }

      const response = await fetchDataWithAuthorization(
        url,
        accessToken,
        refreshToken,
        createOption,
      )

      if (response) {
        if (response.ok) {
          setAlertColor(MainGreen)
          setAlertMessage('삭제되었습니다')
        } else {
          setAlertColor(MainRed)
          setAlertMessage('다시 시도해주세요')
        }
      } else {
        console.error('네트워크 오류: 응답이 null입니다.')
        alert('네트워크 오류가 발생했습니다.')
        router.replace
      }
    } catch (error) {
      console.error('삭제 요청 중 오류 발생', error)
      alert('다시 시도해 주세요')
      router.replace('/create')
    }
  }

  useEffect(() => {
    const getImage = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const imageId = params.get('imageId')
        console.log('이미지아이디', imageId)
        const accessToken = localStorage.getItem('accessToken') as string
        const refreshToken = localStorage.getItem('refreshToken') as string

        const url =
          process.env.NEXT_PUBLIC_BACK_URL! +
          `/api/v1/image/getImage/processedImage/${imageId}`
        const createOption = {
          method: 'GET',
        }

        if (!imageId) {
          alert('이미지가 유실됐습니다. 다시 시도해주세요.')
          router.replace('/create')
          return
        }

        const response = await fetchDataWithAuthorization(
          url,
          accessToken,
          refreshToken,
          createOption,
        )

        if (response) {
          if (response.ok) {
            const imageBlob = await response.blob()
            console.log(imageBlob)
            setImageData(URL.createObjectURL(imageBlob))
          } else {
            console.error('이미지를 불러오는데 실패했습니다.')
            alert('이미지가 삭제 됐거나 불러오는데 실패했습니다.')
            router.replace('/home')
          }
        } else {
          console.error('네트워크 오류: 응답이 null입니다.')
          alert('네트워크 오류가 발생했습니다.')
          router.replace('/home')
        }
      } catch (error) {
        console.error('이미지 요청 중 오류 발생', error)
        alert('이미지 요청 중 오류가 발생했습니다.')
        router.replace('/home')
      }
    }

    getImage()
  }, [router, reset])

  useEffect(() => {
    if (imageData) {
      setImageLoaded(true)
    }
  }, [imageData])

  return (
    <>
      <MainWrapper>
        {!imageLoaded ? (
          <div
            style={{
              width: '300px',
              height: '400px',
            }}
          />
        ) : (
          <FadeInImage>
            <ImageWrapper
              src={imageData}
              alt="AI완성 사진"
              $width="300px"
              origin={true}
            />
          </FadeInImage>
        )}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <Button
            onClick={() => {
              router.push('/gallery')
            }}
            $padding="0.5rem 1.5rem"
            $fontSize="1.5rem"
            $margin="20px"
          >
            확인
          </Button>
          <Button
            onClick={handleDelete}
            $backgroundColor={MainRed}
            $padding="0.5rem 1.5rem"
            $fontSize="1.5rem"
            $margin="20px"
          >
            삭제
          </Button>
        </div>
      </MainWrapper>
      {alertMessage !== '' && (
        <AlertModal
          alertColor={alertColor}
          cancelButtonColor={alertColor}
          handleClose={handleClose}
          cancelMessage="확인"
        >
          {alertMessage}
        </AlertModal>
      )}
    </>
  )
}

export default Result
