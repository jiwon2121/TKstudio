'use client'

import React from 'react'
import Lottie from 'react-lottie-player'
import Lottieddalkak from '@@/assets/lottie/makeidentity.json' // 로티 애니메이션 JSON 파일 경로

export default function Animation() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: '200px',
          height: '200px',
        }}
      >
        <Lottie loop animationData={Lottieddalkak} play />
      </div>
    </div>
  )
}
