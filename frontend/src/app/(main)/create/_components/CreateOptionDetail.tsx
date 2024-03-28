import styled from 'styled-components'
import { Option } from '../../store/_components/OptionList'
import { Black, White, MainRed } from '@@/assets/styles/pallete'

const CreateOptionDetailContainer = styled.div<OptionDetailStyleProp>`
  white-space: nowrap;
  border: solid lightgrey 1px;
  margin: 2px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.$selected ? MainRed : White)};
  color: ${(props) => (props.$selected ? White : Black)};
`

const CreateOptionDetailImageWrapper = styled.img`
  width: 120px;
  aspect-ratio: 3/4;
`

const CreateOptionDetailTextWrapper = styled.div`
  display: flex;
  padding: 4px;
  font-size: small;
`
interface OptionDetailStyleProp {
  $selected: boolean
}

interface CreateOptionDetailProps extends Option {
  selectedOptionId: number
  setSelectedOptionId: (optionId: number) => void
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
      setSelectedOptionId(0)
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
