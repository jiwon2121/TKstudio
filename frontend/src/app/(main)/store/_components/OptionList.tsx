import styled from 'styled-components'
import OptionDetail from './OptionDetail'
import { useEffect, useState } from 'react'

const API_URL = 'https://j10a101.p.ssafy.io/api/v1'

const OptionListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
export interface Option {
  optionId: number
  optionName: string
  cost: number
  optionS3Url: string
  description: string
  purchased: boolean
  categoryId: number
  createdTime: string
}

interface OptionListProp {
  categorySort: number
  showMine: boolean
}

function OptionList({ categorySort, showMine }: OptionListProp) {
  // const [optionList, setOptionList] = useState<Option[]>([])
  const [showList, setShowList] = useState<Option[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function getOptionList() {
    const tk = localStorage.getItem('accessToken') as string
    const optionListResponse = await fetch(API_URL + '/option/list', {
      headers: { Authorization: tk },
    })

    if (!optionListResponse.ok) {
      throw new Error('fetch fail')
    }

    const optionListJson = await optionListResponse.json()

    const optionList: Option[] = optionListJson.data

    let temp_list

    if (categorySort == 0) {
      temp_list = [...optionList]
    } else {
      temp_list = optionList?.filter(
        (option: Option) => option.categoryId == categorySort,
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
      {isLoading && <h1>옵션 리스트 로딩중입니다.</h1>}
      {showList?.length > 0 && (
        showList?.map((option: Option) => (
          <OptionDetail key={option.optionId} {...option} />
        ))
      ) }
      { !isLoading && showList?.length == 0 && (
        <h1>해당 조건의 상품이 없습니다.</h1>
      )}
    </OptionListContainer>
  )
}

export default OptionList
