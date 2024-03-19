'use client'

import { useState, useEffect } from 'react'
import DownloadIcon from '@@/assets/icons/download.svg'
import { useRouter } from 'next/navigation'

function LandingPage() {
  const router = useRouter()
  const [device, setDevice] = useState<string | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  function handleBeforeInstallPrompt(event: any) {
    event.preventDefault()
    setDeferredPrompt(event)
  }

  function handleInstallClick() {
    if (deferredPrompt) {
      deferredPrompt.prompt()

      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null)
      })
    }
  }

  function renderMessage() {
    if (device === 'web') {
      return <p>모바일 환경에서 접속해 주세요</p>
    } else if (device === 'android') {
      return (
        <p>
          어플리케이션을 이용해 주세요
          {deferredPrompt && (
            <button onClick={handleInstallClick}>앱 설치</button>
          )}
        </p>
      )
    } else if (device === 'iphone') {
      return (
        <p>
          <DownloadIcon width="1.5rem" height="1.5rem" />을 클릭하여 홈 화면에
          추가하기를 통해 설치를 해주세요
        </p>
      )
    }
  }

  useEffect
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    console.log(window)
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
    }
  }, [])

  useEffect(() => {
    const agent = navigator.userAgent
    let tempDevice = 'web'

    if (agent.toLowerCase().indexOf('android') >= 0) {
      tempDevice = 'android'
    } else if (agent.toLowerCase().indexOf('iphone') >= 0) {
      tempDevice = 'iphone'
    }

    setDevice(tempDevice)

    router.push(`/install/${tempDevice}`, {scroll: false})
  }, [router])

  return (
    <>
      <h1>랜딩페이지</h1>
      {renderMessage()}
    </>
  )
}

export default LandingPage
