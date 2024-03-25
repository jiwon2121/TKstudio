import styled, { keyframes } from 'styled-components'
import { Black, White } from '@@/assets/styles/pallete'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div<{ size?: string }>`
  margin: 0 auto;
  width: ${(props) => (props.size ? props.size : '50px')};
  aspect-ratio: 1 / 1;
  border: 5px solid ${Black};
  border-top: 5px solid ${White};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export default Spinner
