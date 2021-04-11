import styled from 'styled-components'
import SearchBox from './SearchBox'

const Wrapper = styled.nav`
  flex-shrink: 0;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textOnPrimaryBg};
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${(props) => props.theme.screen.lg};
  margin: auto;
  padding: 15px;
  box-sizing: content-box;

  @media (min-width: ${(props) => props.theme.screen.sm}) {
    padding: 35px 30px;
  }
`

const Logo = styled.a`
  height: 30px;

  > img {
    height: 100%;
    width: auto;
  }

  @media (min-width: ${(props) => props.theme.screen.sm}) {
    height: 56px;
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
            width="142"
            height="56"
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
