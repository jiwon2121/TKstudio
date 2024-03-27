import styled from 'styled-components'
import { White, Black } from '@@/assets/styles/pallete'
import { GenderCategory } from '../../store/page'

const GenderOptionListContainer = styled.div`
  display: flex;
  width: 100%;
`

const GenderOptionTab = styled.div<GenderOptionStyleProp>`
  flex: 1;
  text-align: center;
  border-bottom: solid ${(props) => (props.$selected ? Black : White)};
  padding: 10px;
  margin-bottom: 5px;
  font-size: large;
`

interface GenderOptionStyleProp {
  $selected: boolean
}

interface CreateOptionGenderTabProps {
  optionGender: string
  setOptionGender: (gender: GenderCategory) => void
}

function CreateOptionGenderTab({
  optionGender,
  setOptionGender,
}: CreateOptionGenderTabProps) {
  function handleOptionGenderSelect(gender: GenderCategory) {
    if (gender != optionGender) {
      setOptionGender(gender)
    }
  }

  return (
    <GenderOptionListContainer>
      <GenderOptionTab
        $selected={optionGender == 'ALL'}
        onClick={() => handleOptionGenderSelect('ALL')}
      >
        전체
      </GenderOptionTab>
      <GenderOptionTab
        $selected={optionGender == 'MALE'}
        onClick={() => handleOptionGenderSelect('MALE')}
      >
        남성
      </GenderOptionTab>
      <GenderOptionTab
        $selected={optionGender == 'FEMALE'}
        onClick={() => handleOptionGenderSelect('FEMALE')}
      >
        여성
      </GenderOptionTab>
    </GenderOptionListContainer>
  )
}

export default CreateOptionGenderTab
