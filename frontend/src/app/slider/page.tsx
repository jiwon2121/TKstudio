'use client'

import styled from 'styled-components'
import ImageWrapper from '@/components/ImageWrapper'
import { useState } from 'react'
import { White, Black } from '@@/assets/styles/pallete'

const SliderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: fit-content;
  cursor: e-resize;
  user-select: none;
`

const SliderInput = styled.input`
  appearance: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  margin: 0;
  cursor: inherit;
  z-index: 2;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
  }
`

const BeforeWrapper = styled.div<{ $width: string }>`
  position: absolute;
  overflow: hidden;
  width: ${(props) => props.$width};
  height: 100%;
  top: 0;
  left: 0;
  border-right: 3px solid ${White};
  z-index: 1;
`

const ThumbWrapper = styled.div<{ $width: string }>`
  background-color: ${White};
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: ${(props) => props.$width};
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

function Slider() {
  const [range, setRange] = useState<number>(50)

  return (
    <SliderWrapper>
      <BeforeWrapper $width={`${range}%`}>
        <ImageWrapper
          src={
            'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/originalImages/03bf0b7c-e4d6-11ee-afa5-0242ac110004.png'
          }
          alt="before"
          $width="100vw"
          $aspectRatio="3 / 4"
          imgType="before"
        />
      </BeforeWrapper>
      <ImageWrapper
        src={
          'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/processedImages/05166b82-e4d6-11ee-afa5-0242ac110004.png'
        }
        alt="after"
        $width="100vw"
        imgType="after"
        origin={true}
      />
      <SliderInput
        type="range"
        min={0}
        max={100}
        name="slider"
        onChange={(e) => {
          setRange(Number(e.target.value))
        }}
      />
      <ThumbWrapper $width={`${range}%`}>
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
