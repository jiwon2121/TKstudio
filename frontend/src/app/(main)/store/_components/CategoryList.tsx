import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GenderCategory } from '../page'

interface CategoryListProp {
  categorySort: GenderCategory
  handleCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const CategoryDropdown = styled.select`
  margin: 10px;
  align-self: flex-end;
  padding: 10px;
`

function CategoryList({ handleCategoryChange }: CategoryListProp) {
  return (
    <CategoryDropdown
      name="CategoryDropdown"
      id="CategoryDropdown"
      onChange={handleCategoryChange}
    >
      <option key="ALL" value="ALL">
        전체
      </option>
      <option key="MALE" value="MALE">
        남성
      </option>
      <option key="FEMALE" value="FEMALE">
        여성
      </option>
    </CategoryDropdown>
  )
}

export default CategoryList
