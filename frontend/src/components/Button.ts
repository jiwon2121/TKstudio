import styled from 'styled-components'
import { White, MainGreen } from '@@/assets/styles/pallete'

interface Active {
  $backgroundColor?: string
  $color?: string
  $boxShadow: string
}

interface Props {
  $width?: string
  $height?: string
  $color?: string
  $backgroundColor?: string
  $border?: string
  $borderRadius?: string
  $margin?: string
  $padding?: string
  $cursor?: 'auto' | 'default' | 'none' | 'pointer'
  $fontSize?: string
  $active?: Active
  $fontWeight?: string | number
  $wordSpacing?: string
}

const Button = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.$width ? props.$width : 'auto')};
  height: ${(props) => (props.$height ? props.$height : 'auto')};
  color: ${(props) => (props.$color ? props.$color : White)};
  border: ${(props) => (props.$border ? props.$border : 'none')};
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : MainGreen};
  border-radius: ${(props) =>
    props.$borderRadius ? props.$borderRadius : '8px'};
  margin: ${(props) => (props.$margin ? props.$margin : 'none')};
  padding: ${(props) => (props.$padding ? props.$padding : '5px 10px')};
  cursor: ${(props) => (props.$cursor ? props.$cursor : 'pointer')};
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : '1rem')};
  font-weight: ${(props) => (props.$fontWeight ? props.$fontWeight : '')};
  word-spacing: ${(props) => (props.$wordSpacing? props.$wordSpacing : '')};
  &:active {
    background-color: ${(props) =>
      props.$active?.$backgroundColor
        ? props.$active?.$backgroundColor
        : White};
    color: ${(props) =>
      props.$active?.$color ? props.$active?.$color : MainGreen};
    box-shadow: ${(props) =>
      props.$active?.$boxShadow
        ? props.$active.$boxShadow
        : `0 0 0 2px ${MainGreen} inset`};
  }
`

export default Button
