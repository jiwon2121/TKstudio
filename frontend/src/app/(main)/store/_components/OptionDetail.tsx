import styled from 'styled-components'

interface OptionDetailProp {
  $isMine: boolean
}

const OptionContainer = styled.div<OptionDetailProp>`
  width: 100px;
  padding: 10px;
  border: solid white 1px;
  box-sizing: border-box;
  background-color: ${(props) => (props.$isMine ? 'grey' : 'green')};
  color: white;
`

interface Prop {
  title: string
  content: string
  isMine: boolean
  category: string
}

function OptionDetail({ title, content, isMine, category }: Prop) {
  return (
    <OptionContainer $isMine={isMine}>
      <p>{title}</p>
      <p>{content}</p>
      <p>{category}</p>
    </OptionContainer>
  )
}

export default OptionDetail
