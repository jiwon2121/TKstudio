'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Option } from '../../store/_components/OptionList'
import CreateOptionDetail from './CreateOptionDetail'

const MyOptionListContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
`

const CreateOptionList = function () {
  const [myOptionList, setMyOptionList] = useState<Option[]>()

  async function getOptionList() {
    const accessToken = localStorage.getItem('accessToken') as string
    const optionListResponse = await fetch(
      process.env.NEXT_PUBLIC_BACK_URL + '/api/v1/option/list',
      {
        headers: { Authorization: accessToken },
      },
    )

    if (!optionListResponse.ok) {
      throw new Error('옵션 리스트 불러오기 실패')
    }

    const optionListJson = await optionListResponse.json()

    const optionList: Option[] = optionListJson.data

    setMyOptionList(optionList)
  }

  useEffect(() => {
    getOptionList()
  }, [])

  return (
    <MyOptionListContainer>
      {myOptionList?.map((option) => (
        <CreateOptionDetail key={option.optionId} {...option} />
      ))}
    </MyOptionListContainer>
  )
}

export default CreateOptionList
