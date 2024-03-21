import styled from 'styled-components'
import { Option } from './OptionList'

interface OptionDetailWrapperStyleProp {
  $purchased: boolean
}

const OptionDetailWrapper = styled.div<OptionDetailWrapperStyleProp>`
  padding: 10px;
  border: solid white 1px;
  box-sizing: border-box;
  background-color: ${(props) => (props.$purchased ? 'grey' : 'green')};
  color: white;
  width: 33.33%;
  @media screen and (max-width: 400px) {
    width: 50%;
  }
  @media screen and (max-width: 200px) {
    width: 100%;
  }
`

const ImageWrapper = styled.img`
  width: 100%;
  overflow: hidden;
`

function OptionDetail(props: Option) {
  return (
    <OptionDetailWrapper $purchased={props.purchased}>
      <ImageWrapper src={props.optionS3Url} alt="optionImg" />
      <p>{props.optionName}</p>
      <p>{props.description}</p>
      <p>{props.cost}</p>
    </OptionDetailWrapper>
  )
}

export default OptionDetail
