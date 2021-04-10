import React from 'react'
import styled from 'styled-components'
import snippets from '../styles/snippets'
import NavBar from './NavBar'

const ContentContainer = styled.div`
  max-width: ${(props) => props.theme.screen.lg};
  box-sizing: content-box;
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
    <div>
      <NavBar />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </div>
  )
}
