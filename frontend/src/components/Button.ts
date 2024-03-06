import styled from "styled-components";
import { White, MainGreen } from '../assets/styles/pallete'

interface Props {
  $width ?: string
  $height ?: string
  $color ?: string
  $backgroundColor ?: string
  $border?: string
  $borderRadius ?: string
  $margin ?: string
  $padding ?: string
}

const Button = styled.button<Props>`
  width: ${(props) => props.$width ? props.$width : 'auto'};
  height: ${(props) => props.$height ? props.$height : 'auto'};
  color: ${(props) => props.$color ? props.$color : White};
  border: ${(props) => props.$border? props.$border : 'none'};
  background-color: ${(props) => props.$backgroundColor ? props.$backgroundColor : MainGreen};
  border-radius: ${(props) => props.$borderRadius ? props.$borderRadius : '10px'};
  margin: ${(props) => props.$margin ? props.$margin : 'none'};
  padding: ${(props) => props.$padding ? props.$padding : 'none'};
  cursor: pointer;
`

export default Button