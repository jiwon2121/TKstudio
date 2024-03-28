import styled from 'styled-components'
import { MainGreen } from '@@/assets/styles/pallete'

const CarouselMain = styled.div`
  width: 70vw;
  position: relative;
  overflow: hidden;
  user-select: none;
  margin: 5vw 0;
  border: 3px solid ${MainGreen};
  box-sizing: border-box;
`

export default CarouselMain
