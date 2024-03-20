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
  const [optionList, setOptionList] = useState<Option[]>([])
  const [showList, setShowList] = useState<Option[]>([])

  async function getOptionList() {
    const tk = localStorage.getItem('accessToken') as string
    const optionListResponse = await fetch(API_URL + '/option/list', {
      headers: { Authorization: tk },
    })

    if (!optionListResponse.ok) {
      throw new Error('fetch fail')
    }

    const optionListJson = await optionListResponse.json()
    setOptionList(optionListJson.data)
  }

  useEffect(() => {
    getOptionList()

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
  }, [categorySort, showMine])

  return (
    <OptionListContainer>
      {showList?.length ? (
        showList?.map((option: Option) => (
          <OptionDetail key={option.optionId} {...option} />
        ))
      ) : (
        <div>없습니다.</div>
      )}
    </OptionListContainer>
  )
}

export default OptionList
