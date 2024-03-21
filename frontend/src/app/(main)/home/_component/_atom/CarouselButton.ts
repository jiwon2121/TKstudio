import styled from 'styled-components'

import { Gray } from '@@/assets/styles/pallete'

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${Gray}B3;
  padding: 0;
  border: none;
`

export const PrevButton = styled(Button)`
  left: 5%;
`

export const NextButton = styled(Button)`
  right: 5%;
`
