'use client'

import React from 'react'
import Lottie from 'react-lottie-player'
import Lottienot from '@@/assets/lottie/notfound.json' // 로티 애니메이션 JSON 파일 경로

export default function Animation() {
  return <Lottie loop animationData={Lottienot} play />
}
