'use client'

import styled from 'styled-components'
import { LightGray, MainGreen, MainRed, Black } from '@@/assets/styles/pallete'

const Lists = styled.ul`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  width: 100%;
  padding: 0;
  margin: 0;
  text-align: center;

  li {
    cursor: pointer;
    list-style: none;
    color: ${MainGreen};
    border-top: 1px solid ${LightGray};
    border-bottom: 1px solid ${LightGray};
    box-sizing: border-box;
    font-size: 1.25rem;
    height: 3.5rem;
    padding: 0.75rem 0 0.5rem 0;

    &:first-child {
      color: ${Black};
      border-top: none !important;
    }

    &:last-child {
      color: ${MainRed};
      border-bottom: none !important;
    }
  }
`

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Contents {
  content: string
  handleClick?: (() => void) | (() => Promise<void>)
}

interface Props {
  title: string
  cancel?: string
  handleCancel: (() => void) | (() => Promise<void>)
  contents: Array<Contents>
}

function ModalContents({
  title,
  cancel = '닫기',
  contents,
  handleCancel,
}: Props) {
  const renderContents = contents.map(({ content, handleClick }, index) => {
    return (
      <Li
        key={index}
        onClick={() => {
          handleClick ? handleClick() : null
          handleCancel()
        }}
      >
        {content}
      </Li>
    )
  })
  return (
    <Lists>
      <Li>{title}</Li>
      {renderContents}
      <Li
        onClick={() => {
          handleCancel()
        }}
      >
        {cancel}
      </Li>
    </Lists>
  )
}

export default ModalContents
