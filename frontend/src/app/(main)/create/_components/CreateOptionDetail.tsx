import styled from 'styled-components'
import { Black } from '@@/assets/styles/pallete'
import { Option } from '../../store/_components/OptionList'
import { White } from '@@/assets/styles/pallete'

const CreateOptionDetailContainer = styled.div<OptionDetailStyleProp>`
  white-space: nowrap;
  border: solid ${Black} 1px;
  margin: 2px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.$selected ? 'lightgrey' : { White })};
`

const CreateOptionDetailImageWrapper = styled.img`
  width: 150px;
  aspect-ratio: 1;
`

const CreateOptionDetailTextWrapper = styled.div`
  display: flex;
  padding: 4px;
`
interface OptionDetailStyleProp {
  $selected: boolean
}

interface CreateOptionDetailProps extends Option {
  selectedOptionId: number | null
  setSelectedOptionId: (optionId: number | null) => void
}

function CreateOptionDetail({
  optionId,
  optionName,
  optionS3Url,
  selectedOptionId,
  setSelectedOptionId,
}: CreateOptionDetailProps) {
  function handleSelectOption(selectedId: number) {
    if (selectedId == selectedOptionId) {
      setSelectedOptionId(null)
    } else {
      setSelectedOptionId(selectedId)
    }
  }

  return (
    <CreateOptionDetailContainer
      onContextMenu={(event) => {
        event.preventDefault()
      }}
      onClick={() => handleSelectOption(optionId)}
      $selected={optionId == selectedOptionId}
    >
      <CreateOptionDetailImageWrapper src={optionS3Url} />
      <CreateOptionDetailTextWrapper>
        {optionName}
      </CreateOptionDetailTextWrapper>
    </CreateOptionDetailContainer>
  )
}

export default CreateOptionDetail
