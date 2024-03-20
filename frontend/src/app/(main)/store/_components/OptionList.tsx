import styled from 'styled-components'
import OptionDetail from './OptionDetail'
import { useEffect, useState } from 'react'

const OptionListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
interface Option {
  title: string
  content: string
  isMine: boolean
  category: string
}

interface OptionListProp {
  categorySort: string
  showMine: boolean
}

const optionList = [
  {
    title: 'title 1',
    content: 'content 1',
    isMine: true,
    category: '네이버',
  },
  {
    title: 'title 2',
    content: 'content 2',
    isMine: false,
    category: '카카오',
  },
  {
    title: 'title 3',
    content: 'content 3',
    isMine: false,
    category: '라인',
  },
  {
    title: 'title 4',
    content: 'content 4',
    isMine: true,
    category: '쿠팡',
  },
  {
    title: 'title 5',
    content: 'content 5',
    isMine: false,
    category: '네이버',
  },
]

function OptionList({ categorySort, showMine }: OptionListProp) {
  const [showList, setShowList] = useState<Option[]>()

  useEffect(() => {
    let temp_list

    if (categorySort == '전체') {
      temp_list = [...optionList]
    } else {
      temp_list = optionList.filter(
        (option: Option) => option.category == categorySort,
      )
    }
    if (showMine) {
      setShowList(temp_list.filter((option) => option.isMine))
    } else {
      setShowList(temp_list)
    }
  }, [categorySort, showMine])

  return (
    <OptionListContainer>
      {showList?.length ? (
        showList?.map((option: Option) => (
          <OptionDetail key={option.title} {...option} />
        ))
      ) : (
        <div>없습니다.</div>
      )}
    </OptionListContainer>
  )
}

export default OptionList
