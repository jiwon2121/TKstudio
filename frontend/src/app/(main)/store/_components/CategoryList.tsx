import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'

interface Category {
  categoryId: number
  categoryName: string
}

interface CategoryListProp {
  categorySort: number
  handleCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const CategoryDropdown = styled.select`
  margin: 10px;
  align-self: flex-end;
  padding: 10px;
`

function CategoryList({ handleCategoryChange }: CategoryListProp) {
  const [categoryList, setCategoryList] = useState<Category[]>()

  async function getCategoryList() {
    const accessToken = localStorage.getItem('accessToken') as string
    const optionCategoryResponse = await fetch(
      process.env.NEXT_PUBLIC_BACK_URL + '/api/v1/option/category',
      {
        headers: {
          Authorization: accessToken,
        },
      },
    )

    if (!optionCategoryResponse.ok) {
      throw new Error('카테고리 리스트 불러오기 실패')
    }

    const optionCategoryJson = await optionCategoryResponse.json()

    setCategoryList(optionCategoryJson.data)
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  return (
    <CategoryDropdown
      name="CategoryDropdown"
      id="CategoryDropdown"
      onChange={handleCategoryChange}
    >
      <option key={0} value={0}>
        전체
      </option>
      {categoryList?.map((category) => {
        return (
          <option key={category.categoryId} value={category.categoryId}>
            {category.categoryName}
          </option>
        )
      })}
    </CategoryDropdown>
  )
}

export default CategoryList
