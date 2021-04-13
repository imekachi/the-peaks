import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useDelayedData } from '../hooks/useDelayedData'
import { ReduxRootState } from '../lib/redux'
import { articleSearchActions } from '../lib/slices/articleSearch'
import SearchArticle from '../pages/search'
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
  const queryInput = useSelector(
    (state: ReduxRootState) => state.articleSearch.searchQuery
  )
  // Delay for input query, to not fire a query every key stroke
  const searchQuery = useDelayedData(queryInput, 1000)

  const router = useRouter()
  const dispatch = useDispatch()

  // When there is route change, reset the article search
  // and give priority to render the requested route
  useEffect(() => {
    dispatch(articleSearchActions.reset())
  }, [dispatch, router])

  return (
    <MainWrapper>
      <NavBar />
      <ContentContainer>
        {searchQuery ? <SearchArticle queryString={searchQuery} /> : children}
      </ContentContainer>
      <Footer />
    </MainWrapper>
  )
}
