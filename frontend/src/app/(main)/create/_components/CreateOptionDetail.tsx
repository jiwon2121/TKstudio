import styled from 'styled-components'
import { Option } from '../../store/_components/OptionList'
import { Black, White, MainRed } from '@@/assets/styles/pallete'
import { useEffect, useState } from 'react'
import { fetchDataWithAuthorization } from '@/utils/api'

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
const CreateNoImageWrapper = styled.div`
  width: 120px;
  aspect-ratio: 3/4;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CreateOptionDetailTextWrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: small;
  padding: 8px 0px;
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
  selectedOptionId,
  setSelectedOptionId,
}: CreateOptionDetailProps) {
  const [optionImageUrl, setOptionImageUrl] = useState<string>()
  function handleSelectOption(selectedId: number) {
    if (selectedId == selectedOptionId) {
      setSelectedOptionId(0)
    } else {
      setSelectedOptionId(selectedId)
    }
  }

  async function getOptionImage(optionId: number) {
    const accessToken = localStorage.getItem('accessToken') as string
    const refreshToken = localStorage.getItem('refreshToken') as string
    const url =
      process.env.NEXT_PUBLIC_BACK_URL + '/api/v1/option/image/' + optionId
    const optionImageResponse = await fetchDataWithAuthorization(
      url,
      accessToken,
      refreshToken,
    )
    const optionImageBlob = (await optionImageResponse?.blob()) as Blob
    const imageUrl = URL.createObjectURL(optionImageBlob)
    setOptionImageUrl(imageUrl)
  }

  useEffect(() => {
    getOptionImage(optionId)
  }, [])

  return (
    <CreateOptionDetailContainer
      onContextMenu={(event) => {
        event.preventDefault()
      }}
      onClick={() => handleSelectOption(optionId)}
      $selected={optionId == selectedOptionId}
    >
      {optionImageUrl ? (
        <CreateOptionDetailImageWrapper src={optionImageUrl} />
      ) : (
        <CreateNoImageWrapper>불러오는 중</CreateNoImageWrapper>
      )}

      <CreateOptionDetailTextWrapper>
        {optionName}
      </CreateOptionDetailTextWrapper>
    </CreateOptionDetailContainer>
  )
}

export default CreateOptionDetail
