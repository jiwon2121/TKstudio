'use client'

import Image, { StaticImageData } from 'next/image'
import styled from 'styled-components'

interface Props {
  $width: string
  $height?: string
  $aspectRatio?: string
  origin?: boolean
  src: string | StaticImageData
  alt: string
  priority?: boolean
  onClick?: () => void
}

interface WrapperProps {
  $width?: string
  $height?: string
  $aspectRatio?: string
}

const Wrapper = styled.div<WrapperProps>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  position: relative !important;
  background-color: black;
  aspect-ratio: ${(props) => props.$aspectRatio};
`

function ImageWrapper({
  $width,
  $height,
  $aspectRatio,
  origin,
  alt,
  src,
  priority = false,
  onClick = () => {},
}: Props) {
  const wrapperProps = origin
    ? {
        $width: $width ? $width : '100vw',
        $height: 'auto',
        $aspectRatio: $aspectRatio ? $aspectRatio : '7 / 9',
      }
    : { $width, $height, $aspectRatio }
  return (
    <Wrapper
      {...wrapperProps}
      onClick={() => {
        onClick()
      }}
    >
      <Image
        alt={alt}
        src={src}
        fill
        sizes="100%"
        priority={priority}
        style={{ objectFit: 'cover' }}
      />
    </Wrapper>
  )
}

export default ImageWrapper
