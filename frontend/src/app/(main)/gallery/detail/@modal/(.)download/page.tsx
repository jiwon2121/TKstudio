'use client'

import SlideupModal from '@/components/SlideupModal'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ModalContents from '@/components/ModalContents'

function DownloadModal() {
  const router = useRouter()
  const [isClose, setIsClose] = useState<boolean>(false)
  const handleClose = async () => {
    setIsClose(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    router.back()
  }

  const contents = [{ content: '일' }, { content: '이' }]

  return (
    <SlideupModal height={'12rem'} isClose={isClose} handleClose={handleClose}>
      <ModalContents
        title="테스트"
        contents={contents}
        handleCancel={handleClose}
      />
    </SlideupModal>
  )
}

export default DownloadModal
