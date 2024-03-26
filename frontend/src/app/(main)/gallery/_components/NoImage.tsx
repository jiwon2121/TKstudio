import styled from 'styled-components'
import Camera from '@@/assets/icons/camera.svg'
import { Black } from '@@/assets/styles/pallete'

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 6px solid ${Black};
  border-radius: 50%;
  width: 30vw;
  height: 30vw;
`
const NoImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  grid-column: 1 / 3;
  height: calc(100vh - 50px - 4rem);
`

function NoImage() {
  return (
    <NoImageWrapper>
      <IconWrapper>
        <Camera width='80%' height='80%'/>
      </IconWrapper>
      <h2>등록된 사진이 없습니다</h2>
    </NoImageWrapper>
  )
}

export default NoImage