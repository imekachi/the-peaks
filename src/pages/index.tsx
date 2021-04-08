import styled from 'styled-components'
import { Button } from '../components/Button'
import { Select } from '../components/Select'
import { ICON_BOOKMARK_ON } from '../styles/icons'
import { spacing } from '../styles/sizes'

const H1 = styled.h1`
  font-family: ${(props) => props.theme.fontFamily.serif};
  font-size: ${(props) => props.theme.fontSize['2xl']};
  margin: 0;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const ActionWrapper = styled.div`
  margin-left: ${spacing(2)};

  > *:not(:last-child) {
    margin-right: ${spacing(2)};
  }
`

export default function Home() {
  return (
    <div>
      <Header>
        <H1>Top stories</H1>
        <ActionWrapper>
          <Button>{ICON_BOOKMARK_ON}VIEW BOOKMARK</Button>
          <Select>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="popular">Most popular</option>
          </Select>
        </ActionWrapper>
      </Header>
    </div>
  )
}
