import styled from 'styled-components'
import OptionDetail from './OptionDetail'
import { useEffect, useState } from 'react'

const OptionListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
`
interface Option {
  title: string
  content: string
  isMine: boolean
  category: string
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

function OptionList({ categorySort, showMine }: any) {
  const [showList, setShowList] = useState<Option[]>()

  useEffect(() => {
    if (categorySort == '전체') {
      setShowList([...optionList])
    } else {
      setShowList(
        optionList.filter((option: any) => option.category == categorySort),
      )
    }
  }, [categorySort])

  useEffect(() => {
    if (showMine) {
      setShowList((prev) => prev?.filter((option) => option.isMine))
    } else {
      setShowList([...optionList])
    }
  }, [showMine])

  return (
    <OptionListContainer>
      {showList?.length ? (
        showList?.map((option: any) => (
          <OptionDetail key={option.title} {...option} />
        ))
      ) : (
        <div>없습니다.</div>
      )}
    </OptionListContainer>
  )
}

export default OptionList
