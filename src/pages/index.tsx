import { useState } from 'react'
import { useQuery } from 'react-query'
import striptags from 'striptags'
import styled from 'styled-components'
import ArticleCard from '../components/ArticleCard'
import ArticleGrid from '../components/ArticleGrid'
import ArticlesBySection from '../components/ArticlesBySection'
import Loader from '../components/Loader'
import PageHeader from '../components/PageHeader'
import { DEFAULT_QUERY_STALE_TIME } from '../config/api'
import { createAPITopStories } from '../lib/api'
import { createArticleURL } from '../lib/article'
import { GDOrdering } from '../lib/types'

const Section = styled.section`
  &:not(:last-child) {
    margin-bottom: 50px;
  }
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: 250px;
  grid-gap: 30px;
  margin-bottom: 30px;

  > .main {
    // take column 1 - 2
    grid-column: 1 / 3;
    // take row 1 - 2
    grid-row: 1 / 3;
  }
`

const topStoriesBorderColor = [
  '#388E3C',
  '#D32F2F',
  '#FFC107',
  '#2196F3',
  '#388E3C',
]

export default function Home() {
  const [orderBy, setOrderBy] = useState<GDOrdering>(GDOrdering.newest)
  const queryParams = { orderBy }
  const query = useQuery(
    ['topStories', queryParams],
    createAPITopStories(queryParams),
    { staleTime: DEFAULT_QUERY_STALE_TIME }
  )

  if (query.isLoading || !query.isSuccess) {
    return <Loader />
  }
  // TODO: handle errors

  return (
    <>
      <PageHeader
        title="Top stories"
        showBookmarkButton
        orderBy={orderBy}
        onChangeOrdering={setOrderBy}
      />
      <Section>
        <MainGrid>
          {query.data.results.slice(0, 5).map((article, index) => {
            // Only the first article is main article
            const isMain = index === 1
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
