'use client'
import Button from '@/components/Button'
import ImageWrapper from '@/components/ImageWrapper'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

const MainWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
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
        const response = await fetch('백엔드 URL', requestOptions)
        if (response.ok) {
          console.log('삭제 성공')
          router.push('/create')
          // 필요한 경우 추가적인 처리
        } else {
          console.error('삭제 실패')
          // 필요한 경우 실패 시 처리
        }
      } catch (error) {
        console.error('삭제 요청 중 오류 발생', error)
        // 필요한 경우 오류 처리.
      }
    } else {
      console.error('Access token이 없습니다.')
      alert('로그인이 필요합니다')
      router.push('/login')
      // 필요한 경우 access token이 없을 때의 처리.
    }
  }
  return (
    <MainWrapper>
      <ImageWrapper
        // 임시 사진 - create에서 받아온 사진을 게시할 예정
        src="https://blog.kakaocdn.net/dn/TJL7n/btr1Wmgwtgu/3RJ7dheqh6T8bjumKp5LzK/img.png"
        alt="AI완성 사진"
        $width="300px"
        origin={true}
      />

      <div>
        <Button
          onClick={() => router.push('/create')}
          $width="80px"
          $margin="20px"
        >
          확인
        </Button>
        <Button
          onClick={handleDelete}
          $backgroundColor="red"
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
