import styled from 'styled-components'
import { Option } from './OptionList'
import { White, MainGreen, MainRed } from '@@/assets/styles/pallete'
import { useRouter } from 'next/navigation'
import { fetchDataWithAuthorization } from '@/utils/api'

interface PurchasedOptionStyleProp {
  $purchased: boolean
}

const OptionDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  border: solid white 1px;
  box-sizing: border-box;

  width: 33.3333%;

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

function OptionDetail(props: Option) {
  const router = useRouter()
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

  async function handlePurcahse(optionId: number) {
    if (props.purchased) {
      alert('이미 구매한 옵션입니다.')
      return null
    }
    if (!window.confirm('구매하시겠습니까?')) {
      return null
    }
    const payUrl = await getPayUrl(optionId)
    router.push(payUrl)
  }

  return (
    <OptionDetailWrapper
      onContextMenu={(event) => {
        event.preventDefault()
      }}
      onClick={() => handlePurcahse(props.optionId)}
    >
      <ImageWrapper src={props.optionS3Url} alt="optionImg" />
      <OptionDetailTextWrapper $purchased={props.purchased}>
        <div>{props.optionName}</div>
        <div>{props.description}</div>
        <div>{props.cost}원</div>
      </OptionDetailTextWrapper>
    </OptionDetailWrapper>
  )
}

export default OptionDetail
