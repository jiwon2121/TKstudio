import styled from 'styled-components'
import { Option } from './OptionList'
import { White, MainGreen } from '@@/assets/styles/pallete'
import { useRouter } from 'next/navigation'

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
  @media screen and (max-width: 400px) {
    width: 50%;
  }
  @media screen and (max-width: 200px) {
    width: 100%;
  }
  &:active {
    background-color: ${MainGreen};
    color: ${White};
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
  justify-content: space-between;
  border: solid lightgrey;
  border-width: 0px 1px 1px 1px;
  box-sizing: border-box;
  padding: 10px;
  background-color: ${(props) => (props.$purchased ? 'lightgrey' : { White })};
`

function OptionDetail(props: Option) {
  const router = useRouter()

  async function getPayUrl(optionId: number) {
    const requestBody = {
      optionId,
    }
    const purchaseResponse = await fetch(
      process.env.NEXT_PUBLIC_BACK_URL! + '/api/v1/option/payment/ready',
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          Authorization: localStorage.getItem('accessToken') as string,
          'Content-Type': 'application/json',
        },
      },
    )

    if (!purchaseResponse.ok) {
      throw new Error('페이 화면 불러오기 실패!')
    }

    const purchaseResponseJson = await purchaseResponse.json()
    return purchaseResponseJson.data.nextRedirectPcUrl
  }

  async function handlePurcahse(optionId: number) {
    const payUrl = await getPayUrl(optionId)
    window.open(payUrl)
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
