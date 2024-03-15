'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function DownloadPage() {
  const router = useRouter()
  useEffect(() => {
    router.back()
  }, [router])

  return null
}

export default DownloadPage
