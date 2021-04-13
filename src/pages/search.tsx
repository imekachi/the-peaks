import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import ArticleCard from '../components/ArticleCard'
import ArticleGrid from '../components/ArticleGrid'
import Loader from '../components/Loader'
import { MessageBox } from '../components/MessageBox'
import PageHeader from '../components/PageHeader'
import { createAPIArticleSearch } from '../lib/api'
import { createArticleURL } from '../lib/article'
import { GDOrdering } from '../lib/types'

interface SearchArticleProps {
  queryString?: string
}

export default function SearchArticle({ queryString }: SearchArticleProps) {
  const router = useRouter()
  const searchQuery: string | undefined = useMemo(
    () => queryString || (router.query.q as string | undefined),
    [queryString, router.query.q]
  )
  const [orderBy, setOrderBy] = useState(GDOrdering.newest)
  const queryParams = {
    // We disable the query when it's falsy, so this will definitely be a string
    // when the query function is fired.
    searchQuery: searchQuery as string,
    orderBy,
  }
  const query = useQuery(
    ['searchArticle', queryParams],
    createAPIArticleSearch(queryParams),
    {
      enabled: !!searchQuery,
    }
  )

  if (query.isLoading || !query.isSuccess) {
    return <Loader />
  }
  if (!searchQuery) {
    return <MessageBox>Please provide keywords you want to search</MessageBox>
  }
  return (
    <div>
      <PageHeader
        title="Search result"
        showBookmarkButton
        orderBy={orderBy}
        onChangeOrdering={setOrderBy}
      />
      {query.data.results.length <= 0 ? (
        <MessageBox>
          No result for term: “{decodeURIComponent(searchQuery)}”
        </MessageBox>
      ) : (
        <ArticleGrid>
          {query.data.results.map((article) => (
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
