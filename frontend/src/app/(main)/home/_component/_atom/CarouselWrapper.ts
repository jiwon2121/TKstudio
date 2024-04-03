import styled from 'styled-components'

const CarouselWrapper = styled.div.attrs<{
  $translateX: string
  $reset: boolean
}>((props) => {
  return {
    style: {
      transform: `translateX(${props.$translateX})`,
      transition: props.$reset ? '' : 'transform 0.35s ease-out',
    },
  }
})`
  display: flex;
`

export default CarouselWrapper
