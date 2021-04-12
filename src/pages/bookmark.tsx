import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import ArticleCard from '../components/ArticleCard'
import ArticleGrid from '../components/ArticleGrid'
import { MessageBox } from '../components/MessageBox'
import Loader from '../components/Loader'
import PageHeader from '../components/PageHeader'
import { createAPIArticlesByIds } from '../lib/api'
import { createArticleURL } from '../lib/article'
import { bookmarkStorage } from '../lib/bookmark'
import { GDOrdering } from '../lib/types'

export default function Bookmark() {
  const [orderBy, setOrderBy] = useState(GDOrdering.newest)
  // Client storage is only accessible on client,
  // checking `process.browser` prevents SSR error,
  const savedArticles = useMemo(
    () => (process.browser ? bookmarkStorage.read() : []),
    []
  )

  const isEmptyBookmark = savedArticles.length < 1
  const queryParams = {
    articleIds: savedArticles.map((savedArticle) => savedArticle.id),
  }
  const query = useQuery(
    ['bookmarkArticles', queryParams],
    createAPIArticlesByIds(queryParams),
    { enabled: process.browser && !isEmptyBookmark }
  )

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

  console.log(`> query: `, query)
  if (
    !process.browser ||
    (!isEmptyBookmark && (query.isLoading || !query.isSuccess))
  ) {
    return <Loader />
  }

  return (
    <div>
      <PageHeader
        title="All bookmark"
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
    </div>
  )
}
