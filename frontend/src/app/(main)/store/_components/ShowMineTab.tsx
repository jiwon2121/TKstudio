import styled from 'styled-components'

interface MineTabContainerStyleProp {
  $showMode: boolean
}

interface ShowMineTabProp {
  showMine: boolean
  handleMineChange: (target: boolean) => void
}

const MineTabWrapper = styled.div`
  display: flex;
  width: 80%;
`

const MineTabContainer = styled.div<MineTabContainerStyleProp>`
  border-bottom: solid ${(props) => (props.$showMode ? 'black' : 'white')};
  flex: 1;
  text-align: center;
  padding: 10px;
`

function ShowMineTab({ showMine, handleMineChange }: ShowMineTabProp) {
  return (
    <MineTabWrapper>
      <MineTabContainer
        $showMode={!showMine}
        onClick={() => handleMineChange(false)}
      >
        전체
      </MineTabContainer>
      <MineTabContainer
        $showMode={showMine}
        onClick={() => handleMineChange(true)}
      >
        구매한 상품
      </MineTabContainer>
    </MineTabWrapper>
  )
}

export default ShowMineTab
