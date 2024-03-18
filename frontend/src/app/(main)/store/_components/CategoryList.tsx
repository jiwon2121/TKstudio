import styled from 'styled-components'

const categoryList = [
  {
    id: 1,
    name: '네이버',
  },
  {
    id: 2,
    name: '카카오',
  },
  {
    id: 3,
    name: '라인',
  },
  {
    id: 4,
    name: '쿠팡',
  },
]

const CategorySelect = styled.select`
  margin: 10px;
`

function CategoryList({ categorySort, handleCategoryChange }: any) {
  return (
    <CategorySelect
      name=""
      id=""
      onChange={handleCategoryChange}
      value={categorySort}
    >
      <option>전체</option>
      {categoryList.map((category) => {
        return <option key={category.id}>{category.name}</option>
      })}
    </CategorySelect>
  )
}

export default CategoryList
