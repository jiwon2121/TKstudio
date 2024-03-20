import styled from 'styled-components'

interface OptionContainerStyleProp {
  $isMine: boolean
}

const OptionContainer = styled.div<OptionContainerStyleProp>`
  padding: 10px;
  border: solid white 1px;
  box-sizing: border-box;
  background-color: ${(props) => (props.$isMine ? 'grey' : 'green')};
  color: white;
  width: 33.33%;
  @media screen and (max-width: 400px) {
    width: 50%;
  }
  @media screen and (max-width: 200px) {
    width: 100%;
  }
`

interface OptionDetailProp {
  title: string
  content: string
  isMine: boolean
  category: string
}

function OptionDetail({ title, content, isMine, category }: OptionDetailProp) {
  return (
    <OptionContainer $isMine={isMine}>
      <p>{title}</p>
      <p>{content}</p>
      <p>{category}</p>
    </OptionContainer>
  )
}

export default OptionDetail
