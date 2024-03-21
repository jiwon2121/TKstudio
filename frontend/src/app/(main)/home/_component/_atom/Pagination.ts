import styled from 'styled-components'
import { Black, Gray } from '@@/assets/styles/pallete'

const Pagination = styled.div<{ $idx: number }>`
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  gap: 5px;
  justify-content: center;

  button {
    width: 10px;
    height: 10px;
    border: none;
    border-radius: 50%;
    background-color: ${Gray}B3;
    margin: 0;
    padding: 0;
    cursor: pointer;

    &:nth-child(${({ $idx }) => $idx}) {
      background-color: ${Black};
    }
  }
`

export default Pagination
