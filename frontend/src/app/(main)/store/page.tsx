'use client'

import styled from 'styled-components'
import { useState } from 'react'
import OptionList from './_components/OptionList'
import CategoryList from './_components/CategoryList'
import ShowMineTab from './_components/ShowMineTab'

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function StorePage() {
  const [showMine, setShowMine] = useState<boolean>(false)
  const [categorySort, setCategorySort] = useState<string>('전체')

  function handleCategoryChange(event: any) {
    setCategorySort(event.target.value)
  }

  function handleMineChange(stat: boolean) {
    setShowMine(stat)
  }

  return (
    <MainWrapper>
      <h1>옵션 스토어</h1>
      <ShowMineTab showMine={showMine} handleMineChange={handleMineChange} />
      <CategoryList
        categorySort={categorySort}
        handleCategoryChange={handleCategoryChange}
      />
      <OptionList categorySort={categorySort} showMine={showMine} />
    </MainWrapper>
  )
}

export default StorePage
