import styled from 'styled-components'
import { Option } from '../../store/_components/OptionList'
import { Black } from '@@/assets/styles/pallete'

const CreateOptionDetailContainer = styled.div`
  white-space: nowrap;
  border: solid ${Black} 1px;
  margin: 2px;
  display: flex;
  flex-direction: column;
`

const CreateOptionDetailImageWrapper = styled.img`
  width: 150px;
  aspect-ratio: 1;
`

const CreateOptionDetailTextWrapper = styled.div`
  display: flex;
  padding: 4px;
`

function CreateOptionDetail(props: Option) {
  return (
    <CreateOptionDetailContainer
      onContextMenu={(event) => {
        event.preventDefault()
      }}
    >
      <CreateOptionDetailImageWrapper src={props.optionS3Url} />
      <CreateOptionDetailTextWrapper>
        {props.optionName}
      </CreateOptionDetailTextWrapper>
    </CreateOptionDetailContainer>
  )
}

export default CreateOptionDetail
