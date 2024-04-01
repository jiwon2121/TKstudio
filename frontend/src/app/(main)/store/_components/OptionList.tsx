import styled from 'styled-components'
import OptionDetail from './OptionDetail'
import { useEffect, useState } from 'react'
import { GenderCategory } from '../page'
import { fetchDataWithAuthorization } from '@/utils/api'

const OptionListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const StoreTextWrapper = styled.div`
  width: 100%;
  font-size: xx-large;
  text-align: center;
  padding: 50px;
`

export interface Option {
  optionId: number
  optionName: string
  cost: number
  purchased: boolean
  gender: 'MALE' | 'FEMALE'
}

interface OptionListProp {
  categorySort: GenderCategory
  showMine: boolean
}

function OptionList({ categorySort, showMine }: OptionListProp) {
  const [showList, setShowList] = useState<Option[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function getOptionList() {
    const accessToken = localStorage.getItem('accessToken') as string
    const refreshToken = localStorage.getItem('refreshToken') as string

    const url = process.env.NEXT_PUBLIC_BACK_URL + '/api/v1/option/list'

    const requestOptions = {}

    const optionListResponse = await fetchDataWithAuthorization(
      url,
      accessToken,
      refreshToken,
      requestOptions,
    )

    const optionListJson = await optionListResponse?.json()

    const optionList: Option[] = optionListJson.data

    let temp_list

    if (categorySort == 'ALL') {
      temp_list = [...optionList]
    } else {
      temp_list = optionList?.filter(
        (option: Option) => option.gender == categorySort,
      )
    }
    if (showMine) {
      setShowList(temp_list?.filter((option) => option.purchased))
    } else {
      setShowList(temp_list)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getOptionList()
  }, [categorySort, showMine])

  return (
    <OptionListContainer>
      {isLoading && <StoreTextWrapper>불러오는 중...</StoreTextWrapper>}
      {showList?.length > 0 &&
        showList?.map((option: Option) => (
          <OptionDetail key={option.optionId} {...option} />
        ))}
      {!isLoading && showList?.length == 0 && (
        <StoreTextWrapper>해당 조건의 옵션이 없습니다.</StoreTextWrapper>
      )}
    </OptionListContainer>
  )
}

export default OptionList
