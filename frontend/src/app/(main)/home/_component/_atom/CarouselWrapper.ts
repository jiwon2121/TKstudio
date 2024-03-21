import styled from 'styled-components'

const CarouselWrapper = styled.div<{ $translateX: number }>`
  display: flex;
  transition: transform 0.35s ease-out;
  transform: translateX(${({ $translateX }) => `${$translateX}vw`});
`

export default CarouselWrapper
