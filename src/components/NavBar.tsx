import NextLink from 'next/link'
import styled from 'styled-components'
import media from '../styles/mediaQuery'
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
  padding: 10px;
  box-sizing: content-box;

  ${media.md`
    height: 126px;
    padding: 0 15px;
  `};
`

const Logo = styled.a`
  flex-shrink: 0;
  height: 30px;
  margin-right: 10px;

  > img {
    height: 100%;
    width: auto;
  }

  ${media.md`
    height: 56px;
  `}
`

const SearchWrapper = styled.div`
  min-width: 0; // Prevent overflow children

  ${media.md`
    align-self: flex-end;
  `};
`

export default function NavBar() {
  return (
    <Wrapper>
      <Container>
        <NextLink href="/" passHref>
          <Logo title="Home | The Peaks">
            <img
              src="/static/images/logo-white.png"
              alt="The Peaks Logo"
              width="142"
              height="56"
              loading="lazy"
            />
          </Logo>
        </NextLink>
        <SearchWrapper>
          <SearchBox />
        </SearchWrapper>
      </Container>
    </Wrapper>
  )
}
