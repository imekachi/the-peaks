import React from 'react'
import styled from 'styled-components'
import { spacing } from '../styles/sizes'
import NavBar from './NavBar'

const ContentContainer = styled.div`
  max-width: ${(props) => props.theme.screen.lg};
  margin: auto;
  padding: ${spacing(4, 2)};

  @media (min-width: ${(props) => props.theme.screen.sm}) {
    padding: ${spacing(8, 3)};
  }
`

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <NavBar />
      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}
