import styled from 'styled-components'
import { spacing } from '../styles/sizes'
import SearchBox from './SearchBox'

const Wrapper = styled.nav`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textOnPrimaryBg};
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${(props) => props.theme.screen.lg};
  margin: auto;
  padding: ${spacing(2)};

  @media (min-width: ${(props) => props.theme.screen.sm}) {
    padding: ${spacing(5, 2)};
  }
`

const Logo = styled.a`
  height: ${spacing(4)};

  > img {
    height: 100%;
    width: auto;
  }

  @media (min-width: ${(props) => props.theme.screen.sm}) {
    height: ${spacing(6)};
  }
`

const SearchWrapper = styled.div`
  align-self: flex-end;
`

export default function NavBar() {
  return (
    <Wrapper>
      <Container>
        <Logo href="/" title="Home | The Peaks">
          <img
            src="/static/images/logo-white.png"
            alt="The Peaks Logo"
            width="133"
            height="50"
            loading="lazy"
          />
        </Logo>
        <SearchWrapper>
          <SearchBox />
        </SearchWrapper>
      </Container>
    </Wrapper>
  )
}
