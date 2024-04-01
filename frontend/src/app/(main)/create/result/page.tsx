'use client'
import Button from '@/components/Button'
import ImageWrapper from '@/components/ImageWrapper'
import { useRouter } from 'next/navigation'
import styled, { keyframes } from 'styled-components'
import { MainRed } from '@@/assets/styles/pallete'
import { useEffect, useState, useContext } from 'react'
import { GalleryContext } from '../../_components/ContextProvider'

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
  // /create 에서 딸깍사진을 받아야함
  const router = useRouter()
  const [imageData, setImageData] = useState<string>('')
  const { reset } = useContext(GalleryContext)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  const handleDelete = async () => {
    const accessToken = localStorage.getItem('accessToken') as string

    if (accessToken !== null) {
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      }

      try {
        const params = new URLSearchParams(window.location.search)
        const imageId = params.get('imageId')
        console.log('삭제이미지아이디: ', imageId)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/image/delete/${imageId}`,
          requestOptions,
        )
        if (response.ok) {
          console.log('삭제 성공')
          alert('삭제 하였습니다.')
          router.replace('/create')
          // 필요한 경우 추가적인 처리
        } else {
          console.error('삭제 실패')
          alert('다시 시도해주세요')
        }
      } catch (error) {
        console.error('삭제 요청 중 오류 발생', error)
        alert('다시 시도해 주세요')
        router.push('/create')
      }
    } else {
      console.error('Access token이 없습니다.')
      alert('로그인이 필요합니다')
      router.push('/login')
    }
  }

  useEffect(() => {
    const getImage = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const imageId = params.get('imageId')
        console.log('이미지아이디', imageId)
        const accessToken = localStorage.getItem('accessToken') as string

        if (!imageId || !accessToken) {
          alert('이미지 ID나 액세스 토큰이 없습니다.')
          return
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/image/getImage/processedImage/${imageId}`,
          {
            method: 'GET',
            headers: {
              Authorization: accessToken,
            },
          },
        )

        if (response.ok) {
          const imageBlob = await response.blob()
          console.log(imageBlob)
          setImageData(URL.createObjectURL(imageBlob))
        } else {
          console.error('이미지를 불러오는데 실패했습니다.')
          alert('이미지가 삭제 됐거나 불러오는데 실패했습니다.')
          router.push('/home')
        }
      } catch (error) {
        console.error('이미지 요청 중 오류 발생', error)
        alert('이미지 요청 중 오류가 발생했습니다.')
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
    <MainWrapper>
      {!imageLoaded ? ( // 이미지가 로드되지 않았을 때 placeholder 표시
        <div
          style={{
            width: '300px',
            height: '400px',
            textAlign: 'center',
          }}
        >
          인화 중입니다 !
        </div>
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
      <div>
        <Button
          onClick={() => {
            alert('저장되었습니다.')
            router.push('/gallery')
          }}
          $width="80px"
          $margin="20px"
        >
          확인
        </Button>
        <Button
          onClick={handleDelete}
          $backgroundColor={MainRed}
          $width="80px"
          $margin="20px"
        >
          삭제
        </Button>
      </div>
    </MainWrapper>
  )
}

export default Result
