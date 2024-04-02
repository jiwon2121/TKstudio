'use client'

import React from 'react'
import Lottie from 'react-lottie-player'
import Lottielanding from '@@/assets/lottie/landing_logo.json'

export default function Animation() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: '500px',
          height: '200px',
          marginBottom: '100px',
        }}
      >
        <Lottie loop animationData={Lottielanding} play />
      </div>
    </div>
  )
}
