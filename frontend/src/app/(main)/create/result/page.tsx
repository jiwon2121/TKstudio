'use client'
import Button from '@/components/Button'
import ImageWrapper from '@/components/ImageWrapper'
import { useRouter } from 'next/navigation'
import styled, { keyframes } from 'styled-components'
import { MainRed } from '@@/assets/styles/pallete'

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
  animation: ${fadeIn} 3s forwards;
`

const Result = function () {
  // /create 에서 딸깍사진을 받아야함
  const router = useRouter()

  const handleDelete = async () => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken !== null) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/image/delete/:imageInfoId`,
          requestOptions,
        )
        if (response.ok) {
          console.log('삭제 성공')
          router.push('/create')
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
  return (
    <MainWrapper>
      <FadeInImage>
        <ImageWrapper
          // 임시 사진 - create에서 받아온 사진을 게시할 예정
          src="https://blog.kakaocdn.net/dn/TJL7n/btr1Wmgwtgu/3RJ7dheqh6T8bjumKp5LzK/img.png"
          alt="AI완성 사진"
          $width="300px"
          origin={true}
        />
      </FadeInImage>

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
