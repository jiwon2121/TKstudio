import styled from 'styled-components'
import { Option } from './OptionList'

interface OptionContainerStyleProp {
  $purchased: boolean
}

const OptionContainer = styled.div<OptionContainerStyleProp>`
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

function OptionDetail(props: Option) {
  return (
    <OptionContainer $purchased={props.purchased}>
      <p>{props.optionName}</p>
      <p>{props.description}</p>
      <p>{props.cost}</p>
    </OptionContainer>
  )
}

export default OptionDetail
