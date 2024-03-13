'use client'

import DownloadIcon from '@@/assets/icons/download.svg'
import LinkIcon from '@@/assets/icons/link.svg'
import DeleteIcon from '@@/assets/icons/trash.svg'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import styled from 'styled-components'
import sampleImage from '@@/assets/images/sample.png'

const IconWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  padding: 0 10px;
`

const EmptyButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
`

function GalleryDetailPage() {
  const dl = useRef<HTMLAnchorElement>(null)
  
  const handleDownload = () => {
    dl.current?.click()
  }

  return (
    <main>
      <IconWrapper>
        <EmptyButton onClick={() => {
          handleDownload()
        }}>
        <DownloadIcon width="1.5rem" height="1.5rem" />
        </EmptyButton>
        <LinkIcon width="1.5rem" height="1.5rem" />
        <DeleteIcon width="1.5rem" height="1.5rem" />
      </IconWrapper>
      <a href={sampleImage.src} ref={dl} style={{display: 'none'}} download />
    </main>
  )
}

export default GalleryDetailPage
