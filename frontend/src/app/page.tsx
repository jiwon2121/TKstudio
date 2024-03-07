'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import downloadIcon from '@/assets/icons/download.svg'

function LandingPage() {
  const imgStyle = { width: '1.5rem', height: 'auto', aspectRatio: '1/1' }
  const [device, setDevice] = useState<string | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  // function
  function handleBeforeInstallPrompt(event: any) {
    event.preventDefault()
    setDeferredPrompt(event)
    console.log(event)
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
    } else if (device === 'android' && deferredPrompt) {
      return (
        <p>
          어플리케이션을 이용해 주세요
          <button onClick={handleInstallClick}>앱 설치</button>
        </p>
      )
    } else if (device === 'iphone') {
      return (
        <p>
          <Image src={downloadIcon} alt={'dowloadIcon'} style={imgStyle} />
          을 클릭하여 홈 화면에 추가하기를 통해 설치를 해주세요
        </p>
      )
    }
  }

  // useEffect
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

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
  }, [device])

  return (
    <main>
      <h1>랜딩페이지</h1>
      {renderMessage()}
    </main>
  )
}

export default LandingPage
