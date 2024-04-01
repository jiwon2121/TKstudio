import styled from 'styled-components'
import { use, useEffect, useState } from 'react'
import { Option } from './OptionList'
import { White, MainRed } from '@@/assets/styles/pallete'
import { useRouter } from 'next/navigation'
import { fetchDataWithAuthorization } from '@/utils/api'
import SlideupModal from '@/components/SlideupModal'
import ModalContents from '@/components/ModalContents'

interface PurchasedOptionStyleProp {
  $purchased: boolean
}

const OptionDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  border: solid white 1px;
  box-sizing: border-box;

  width: 33.333333%;

  &:active {
    border: solid ${MainRed} 5px;
  }
`

const ImageWrapper = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  box-sizing: border-box;
  border: solid lightgrey;
  border-width: 1px 1px 0px 1px;
`

const NoImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  display: flex;
  align-items: center;
  justify-content: center;
`

const OptionDetailTextWrapper = styled.div<PurchasedOptionStyleProp>`
  display: flex;
  flex-direction: column;
  font-size: small;
  border: solid lightgrey;
  border-width: 0px 1px 1px 1px;
  box-sizing: border-box;
  padding: 10px;
  background-color: ${(props) => (props.$purchased ? 'lightgrey' : { White })};
`

const OptionNameWrapper = styled.div`
  align-self: center;
  margin-bottom: 5px;
`

const OptionCostWrapper = styled.div`
  align-self: center;
`

function OptionDetail(props: Option) {
  const router = useRouter()
  const [modalSeen, setModalSeen] = useState<boolean>(false)
  const [isClose, setIsClose] = useState<boolean>(true)
  const [optionImageUrl, setOptionImageUrl] = useState<string>()

  async function getPayUrl(optionId: number) {
    const accessToken = localStorage.getItem('accessToken') as string
    const refreshToken = localStorage.getItem('refreshToken') as string

    const requestBody = {
      optionId,
    }

    const requestOption = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const url =
      process.env.NEXT_PUBLIC_BACK_URL! + '/api/v1/option/payment/ready'
    const purchaseResponse = await fetchDataWithAuthorization(
      url,
      accessToken,
      refreshToken,
      requestOption,
    )

    if (!purchaseResponse?.ok) {
      throw new Error('페이 화면 불러오기 실패!')
    }

    const purchaseResponseJson = await purchaseResponse.json()

    const agent = navigator.userAgent

    if (agent.toLowerCase().indexOf('android') >= 0) {
      return purchaseResponseJson.data.nextRedirectMobileUrl
    } else if (agent.toLowerCase().indexOf('iphone') >= 0) {
      return purchaseResponseJson.data.nextRedirectMobileUrl
    } else {
      return purchaseResponseJson.data.nextRedirectPcUrl
    }
  }

  async function handlePurchase(optionId: number) {
    if (props.purchased) {
      alert('이미 구매한 옵션입니다.')
      return null
    }
    const payUrl = await getPayUrl(optionId)
    router.push(payUrl)
  }

  const handleClose = async () => {
    setIsClose(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setModalSeen(false)
  }

  const handleModalOpen = () => {
    setModalSeen(true)
    setIsClose(false)
  }

  async function getOptionImage(optionId: number) {
    const accessToken = localStorage.getItem('accessToken') as string
    const refreshToken = localStorage.getItem('refreshToken') as string
    const url =
      process.env.NEXT_PUBLIC_BACK_URL + '/api/v1/option/image/' + optionId
    const optionImageResponse = await fetchDataWithAuthorization(
      url,
      accessToken,
      refreshToken,
    )
    const optionImageBlob = (await optionImageResponse?.blob()) as Blob
    const imageUrl = URL.createObjectURL(optionImageBlob)
    setOptionImageUrl(imageUrl)
  }

  useEffect(() => {
    getOptionImage(props.optionId)
  }, [])

  return (
    <>
      <OptionDetailWrapper
        onContextMenu={(event) => {
          event.preventDefault()
        }}
        onClick={() => handleModalOpen()}
      >
        {optionImageUrl ? (
          <ImageWrapper src={optionImageUrl} alt="optionImg" />
        ) : (
          <NoImageWrapper>불러오는 중</NoImageWrapper>
        )}
        <OptionDetailTextWrapper $purchased={props.purchased}>
          <OptionNameWrapper>{props.optionName}</OptionNameWrapper>
          <OptionCostWrapper>
            {props.cost.toLocaleString('ko-KR')} 원
          </OptionCostWrapper>
        </OptionDetailTextWrapper>
      </OptionDetailWrapper>
      {modalSeen && (
        <SlideupModal isClose={isClose} handleClose={handleClose}>
          <ModalContents
            title="구매하시겠습니까?"
            contents={[
              {
                content: '구매',
                handleClick: () => {
                  handlePurchase(props.optionId)
                },
              },
            ]}
            handleCancel={handleClose}
            cancel="취소"
          />
        </SlideupModal>
      )}
    </>
  )
}

export default OptionDetail
