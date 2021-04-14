import { AxiosError } from 'axios'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import ArticleCard from '../components/ArticleCard'
import ArticleGrid from '../components/ArticleGrid'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { MessageBox } from '../components/MessageBox'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import { useIsMounted } from '../hooks/useIsMounted'
import { createAPIArticlesByIds } from '../lib/api'
import { createArticleURL } from '../lib/article'
import { bookmarkStorage } from '../lib/bookmark'
import { GDContentSearchResponse, GDOrdering } from '../lib/types'

const pageTitle = 'All Bookmark'
export default function Bookmark() {
  const isMounted = useIsMounted()
  const [orderBy, setOrderBy] = useState(GDOrdering.newest)
  // Client storage is only accessible on client,
  // checking `isMounted` to prevents SSR and hydration error,
  const savedArticles = useMemo(
    () => (isMounted ? bookmarkStorage.read() : []),
    [isMounted]
  )

  const isEmptyBookmark = savedArticles.length < 1
  const queryParams = {
    articleIds: savedArticles.map((savedArticle) => savedArticle.id),
  }
  const query = useQuery<
    GDContentSearchResponse,
    AxiosError<GDContentSearchResponse>
  >(['bookmarkArticles', queryParams], createAPIArticlesByIds(queryParams), {
    enabled: isMounted && !isEmptyBookmark,
  })

  const sortedArticles = useMemo(() => {
    if (!query.data) return []

    if (orderBy === GDOrdering.oldest) {
      // Sort by oldest saved article first
      return query.data.results.sort(
        (articleA, articleB) =>
          new Date(articleA.webPublicationDate).getTime() -
          new Date(articleB.webPublicationDate).getTime()
      )
    }

    // Sort by newest saved article first
    return query.data.results.sort(
      (articleA, articleB) =>
        new Date(articleB.webPublicationDate).getTime() -
        new Date(articleA.webPublicationDate).getTime()
    )
  }, [orderBy, query.data])

  if (
    !isMounted ||
    (!isEmptyBookmark && (query.isLoading || !query.isFetched))
  ) {
    return (
      <>
        <PageTitle title={pageTitle} />
        <Loader />
      </>
    )
  }

  if (query.isError) {
    return <ErrorMessage message={query.error.message} />
  }

  return (
    <>
      <PageTitle title={pageTitle} />
      <PageHeader
        title={pageTitle}
        orderBy={orderBy}
        onChangeOrdering={setOrderBy}
      />
      {isEmptyBookmark ? (
        <MessageBox>No Saved bookmark</MessageBox>
      ) : (
        <ArticleGrid>
          {sortedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              href={createArticleURL(article.id)}
              title={article.webTitle}
              image={article.fields.thumbnail}
            />
          ))}
        </ArticleGrid>
      )}
    </>
  )
}
