import React from 'react'
import styled from 'styled-components'
import snippets from '../styles/snippets'
import NavBar from './NavBar'

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 100vh;
`

const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  max-width: ${(props) => props.theme.screen.lg};
  margin: auto;
  padding: 20px 15px 45px;

  @media (min-width: ${(props) => props.theme.screen.sm}) {
    padding: 45px 30px 105px;
  }
`

const Footer = styled.footer`
  height: 243px;
  ${snippets.colors.primaryBg};
`

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <MainWrapper>
      <NavBar />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </MainWrapper>
  )
}
