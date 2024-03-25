import styled from 'styled-components'
import { Option } from './OptionList'
import { White, MainGreen } from '@@/assets/styles/pallete'

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
  aspect-ratio: 1;
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
  return (
    <OptionDetailWrapper
      onContextMenu={(event) => {
        event.preventDefault()
      }}
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
