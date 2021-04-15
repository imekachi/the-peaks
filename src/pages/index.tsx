import { AxiosError } from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import striptags from 'striptags'
import styled from 'styled-components'
import ArticleCard from '../components/ArticleCard'
import ArticleGrid from '../components/ArticleGrid'
import ArticlesBySection, {
  ArticlesByCategoryProps,
} from '../components/ArticlesBySection'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { MessageBox } from '../components/MessageBox'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import { DEFAULT_QUERY_STALE_TIME } from '../config/api'
import { createAPIArticlesBySectionId, createAPITopStories } from '../lib/api'
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

const articleSections = ['sport', 'culture', 'lifeandstyle'] as const
type ArticleSectionId = typeof articleSections[number]

interface HomeProps {
  preloadedResponse?: GDContentSearchResponse | null
  preloadedArticleBySectionIds?: Record<
    ArticleSectionId,
    ArticlesByCategoryProps['preloadedResponse'] | null
  >
}

export default function Home({
  preloadedResponse,
  preloadedArticleBySectionIds,
}: HomeProps) {
  console.log(`> preloadedResponse: `, preloadedResponse)
  const [orderBy, setOrderBy] = useState<GDOrdering>(GDOrdering.newest)
  const queryParams = { orderBy }
  const query = useQuery<
    GDContentSearchResponse,
    AxiosError<GDContentSearchResponse>
  >(['topStories', queryParams], createAPITopStories(queryParams), {
    staleTime: DEFAULT_QUERY_STALE_TIME,
    // If preloadedResponse is falsy,
    // convert it to undefined, to fetch again on client side
    initialData: preloadedResponse || undefined,
  })

  if (!query.isSuccess && (query.isLoading || !query.isFetched)) {
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
      {articleSections.map((sectionId) => (
        <Section key={sectionId}>
          <ArticlesBySection
            sectionId={sectionId}
            orderBy={orderBy}
            preloadedResponse={preloadedArticleBySectionIds?.[sectionId]}
          />
        </Section>
      ))}
    </>
  )
}

export async function getStaticProps() {
  // If something went wrong and you can't get preloadedResponse
  // you can't send it as `undefined`, it has to be null
  // and you'll have to handle it inside the component
  let preloadedResponse = null
  let preloadedArticleBySectionIds: Partial<
    NonNullable<HomeProps['preloadedArticleBySectionIds']>
  > = {}
  try {
    // Get data from API top stories
    preloadedResponse = await createAPITopStories({
      orderBy: GDOrdering.newest,
    })()

    // Get data from API articles by sections
    const articlesBySectionIdsPromises = articleSections.map((sectionId) =>
      createAPIArticlesBySectionId({
        sectionId,
        orderBy: GDOrdering.newest,
      })()
    )
    // Resolve data promises concurrently
    const articlesBySectionIdsResponses = await Promise.all(
      articlesBySectionIdsPromises
    )
    // Map response to each sectionId
    articleSections.forEach((sectionId, index) => {
      preloadedArticleBySectionIds[sectionId] =
        articlesBySectionIdsResponses[index]
    })
  } catch (err) {
    console.error(`> Error! while fetching data in getStaticProps: `, err)
  }

  return {
    props: { preloadedResponse, preloadedArticleBySectionIds },
    // Refetch data every 20min (20 * 60)
    revalidate: 1200,
  }
}
