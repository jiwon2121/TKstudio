import styled from 'styled-components'
import { Gray } from '@@/assets/styles/pallete'

const CarouselMain = styled.div`
  width: 80vw;
  position: relative;
  overflow: hidden;
  user-select: none;
  margin: 5vw 0;
  box-shadow: 4px 4px 10px 3px ${Gray};
  box-sizing: border-box;
  border-radius: 20px;
`

export default CarouselMain
