import { AxiosError } from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import striptags from 'striptags'
import styled from 'styled-components'
import ArticleCard from '../components/ArticleCard'
import ArticleGrid from '../components/ArticleGrid'
import ArticlesBySection from '../components/ArticlesBySection'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { MessageBox } from '../components/MessageBox'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import { DEFAULT_QUERY_STALE_TIME } from '../config/api'
import { createAPITopStories } from '../lib/api'
import { createArticleURL } from '../lib/article'
import { GDContentSearchResponse, GDOrdering } from '../lib/types'
import media from '../styles/mediaQuery'

const Section = styled.section`
  &:not(:last-child) {
    margin-bottom: 50px;
  }
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 350px 250px 250px;
  grid-row-gap: 15px;
  margin-bottom: 30px;

  ${media.md`
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: 250px;
    grid-gap: 15px;

    > .main {
      // take column 1 - 2
      grid-column: 1 / 3;
      // take row 1 - 2
      grid-row: 1 / 3;
    }
  `};

  ${media.lg`
    grid-gap: 30px;
  `};
`

const topStoriesBorderColor = [
  '#388e3c',
  '#d32f2f',
  '#ffc107',
  '#2196f3',
  '#388e3c',
]

export default function Home() {
  const [orderBy, setOrderBy] = useState<GDOrdering>(GDOrdering.newest)
  const queryParams = { orderBy }
  const query = useQuery<
    GDContentSearchResponse,
    AxiosError<GDContentSearchResponse>
  >(['topStories', queryParams], createAPITopStories(queryParams), {
    staleTime: DEFAULT_QUERY_STALE_TIME,
  })

  if (query.isLoading || !query.isFetched) {
    return <Loader />
  }
  if (query.isError) {
    return <ErrorMessage message={query.error.message} />
  }

  return (
    <>
      <PageTitle title="Home" />
      <PageHeader
        title="Top stories"
        showBookmarkButton
        orderBy={orderBy}
        onChangeOrdering={setOrderBy}
      />
      {!query.data?.results?.length ? (
        <MessageBox>No data</MessageBox>
      ) : (
        <Section>
          <MainGrid>
            {query.data.results.slice(0, 5).map((article, index) => {
              // Only the first article is main article
              const isMain = index === 0
              // First 3 articles will be shown with thumbnail
              const withImage = index < 3
              return (
                <ArticleCard
                  key={article.id}
                  isMain={isMain}
                  className={isMain ? 'main' : undefined}
                  withImage={withImage}
                  image={article.fields.thumbnail}
                  title={article.webTitle}
                  description={
                    isMain
                      ? striptags(article.fields.trailText as string)
                      : undefined
                  }
                  href={createArticleURL(article.id)}
                  borderColor={topStoriesBorderColor[index]}
                />
              )
            })}
          </MainGrid>
          <ArticleGrid>
            {query.data.results.slice(5).map((article) => (
              <ArticleCard
                key={article.id}
                image={article.fields.thumbnail}
                title={article.webTitle}
                description={striptags(article.fields.trailText as string)}
                href={createArticleURL(article.id)}
              />
            ))}
          </ArticleGrid>
        </Section>
      )}
      <Section>
        <ArticlesBySection sectionId="sport" orderBy={orderBy} />
      </Section>
      <Section>
        <ArticlesBySection sectionId="culture" orderBy={orderBy} />
      </Section>
      <Section>
        <ArticlesBySection sectionId="lifeandstyle" orderBy={orderBy} />
      </Section>
    </>
  )
}
