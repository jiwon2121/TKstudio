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
    font-size: 1.5rem;
    font-weight: light;
    height: 3rem;
    padding: 0.5rem 0;

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

interface Contents {
  content: string
  handleClick?: any
  handleDownload?: any
  width?: number
  height?: number
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
  const renderContents = contents.map(
    ({ content, handleClick, handleDownload, width, height }, index) => {
      return (
        <li
          key={index}
          onClick={() => {
            handleClick ? handleClick() : null
            handleDownload ? handleDownload(width, height) : null
            handleCancel()
          }}
        >
          {content}
        </li>
      )
    },
  )
  return (
    <Lists>
      <li>{title}</li>
      {renderContents}
      <li
        onClick={() => {
          handleCancel()
        }}
      >
        {cancel}
      </li>
    </Lists>
  )
}

export default ModalContents
