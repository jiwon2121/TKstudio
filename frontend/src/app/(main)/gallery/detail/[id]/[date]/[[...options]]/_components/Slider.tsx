'use client'

import styled from 'styled-components'
import ImageWrapper from '@/components/ImageWrapper'
import { useState } from 'react'
import { White, Black } from '@@/assets/styles/pallete'

const SliderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100vw;
  aspect-ratio: 3 / 4;
  cursor: e-resize;
  user-select: none;
  max-width: 768px;
`

const SliderInput = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  border: none;
  z-index: 2;
  cursor: inherit;
`

const BeforeWrapper = styled.div.attrs<{ $width: string }>((props) => {
  return {
    style: {
      width: props.$width,
    },
  }
})`
  position: absolute;
  overflow: hidden;
  height: 100%;
  top: 0;
  left: 0;
  border-right: 3px solid ${White};
  box-sizing: border-box;
  z-index: 1;
  max-width: 100vw;
`

const ThumbWrapper = styled.div.attrs<{ $width: string }>((props) => {
  return {
    style: {
      left: props.$width,
    },
  }
})`
  background-color: ${White};
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-45%, -50%);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`

interface Props {
  before: string
  after: string
}

function Slider({ before, after }: Props) {
  const [range, setRange] = useState<string>('50%')

  return (
    <SliderWrapper>
      <BeforeWrapper $width={`${range}`}>
        {before && (
          <ImageWrapper
            src={before}
            alt="before"
            $width="100vw"
            $aspectRatio="3 / 4"
            priority={true}
          />
        )}
      </BeforeWrapper>
      {after && (
        <ImageWrapper
          src={after}
          alt="after"
          $width="100vw"
          origin={true}
          priority={true}
        />
      )}
      <SliderInput
        onTouchMove={(e) => {
          if (e.touches[0].pageX >= 0) {
            setRange(e.touches[0].pageX + 'px')
          }
        }}
      />
      <ThumbWrapper $width={`min(${range}, 100%)`}>
        <svg
          fill={Black}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M24,12l-5.7-5.7V11c-3.7,0-9,0-12.6,0V6.3L0,12l5.8,5.7V13c3.6,0,8.9,0,12.5,0v4.7L24,12z" />
        </svg>
      </ThumbWrapper>
    </SliderWrapper>
  )
}

export default Slider
