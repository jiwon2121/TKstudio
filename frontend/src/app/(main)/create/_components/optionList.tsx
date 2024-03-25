// 가로 스크롤, 옵션리스트 받아오기
// 가로스크롤 -> 정장, 헤어, 배경
// 체크표시
'use client'

import { useState } from 'react'
import styled from 'styled-components'

const CategoryList = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100vw;
`

const CategoryButton = styled.button`
  margin-right: 10px;
`

const ContentContainer = styled.div`
  overflow-x: auto;
  width: 100vw;
`

const Content = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

interface Category {
  name: string
  contents: Array<string>
}

const OptionList = function () {
  const categories = [
    { name: '정장', contents: ['정장1', '정장2', '정장3', '정장4'] },
    { name: '헤어', contents: ['헤어1', '헤어2', '헤어3', '헤어4'] },
    { name: '배경', contents: ['배경1', '배경2', '배경3', '배경4'] },
  ]
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category)
  }

  return (
    <div>
      <CategoryList>
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryList>

      <ContentContainer>
        {selectedCategory && (
          <Content>
            {selectedCategory.contents.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </Content>
        )}
      </ContentContainer>
    </div>
  )
}

export default OptionList
