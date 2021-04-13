import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import ArticleCard from '../components/ArticleCard'
import ArticleGrid from '../components/ArticleGrid'
import Loader from '../components/Loader'
import { MessageBox } from '../components/MessageBox'
import PageHeader from '../components/PageHeader'
import { createAPIArticleSearch } from '../lib/api'
import { createArticleURL } from '../lib/article'
import { GDContentSearchResponse, GDOrdering } from '../lib/types'

interface SearchArticleProps {
  queryString?: string
}

export default function SearchArticle({ queryString }: SearchArticleProps) {
  // Use router to handle search by URL
  const router = useRouter()

  // Use searchQuery from prop by default
  // and fallback to data in URL
  const searchQuery: string | undefined = useMemo(
    () => queryString || (router.query.q as string | undefined),
    [queryString, router.query.q]
  )

  // Store order state
  const [orderBy, setOrderBy] = useState(GDOrdering.newest)

  const queryParams = {
    // We disable the query when it's falsy, so this will definitely be a string
    // when the query function is fired.
    searchQuery: searchQuery as string,
    orderBy,
  }

  const query = useInfiniteQuery<
    GDContentSearchResponse,
    AxiosError<GDContentSearchResponse>
  >(
    ['searchArticle', queryParams],
    ({ pageParam }) =>
      createAPIArticleSearch({ ...queryParams, page: pageParam })(),
    {
      enabled: !!searchQuery,
      getNextPageParam: (lastPage) =>
        lastPage.currentPage < lastPage.pages
          ? lastPage.currentPage + 1
          : undefined,
    }
  )

  // Store data related to element for infinite scroll
  const fetchMoreAnchorRef = useRef<HTMLDivElement>(null)
  const currentObservingRef = useRef<HTMLDivElement>()
  const scrollObserverRef = useRef<IntersectionObserver>()

  // Register Scroll observer to fetchMore anchor element
  useEffect(() => {
    // Only if
    // - has next page
    // - AND fetchMoreAnchor element exists
    // - AND observing element is not the same as the anchor element(update observer)
    if (
      query.hasNextPage &&
      fetchMoreAnchorRef.current &&
      currentObservingRef.current !== fetchMoreAnchorRef.current
    ) {
      // If there is no IntersectionObserver, create one
      if (!scrollObserverRef.current) {
        scrollObserverRef.current = new IntersectionObserver(
          (entries) => {
            console.log(`> Observer: `, entries[0])
            if (entries[0].isIntersecting) {
              // fetch next page and ignore error, we'll handle in render
              query.fetchNextPage().catch(() => {})
            }
          },
          // trigger 400px before anchor element reaches viewport
          { rootMargin: '400px' }
        )
      }

      // Unobserve unused element if exists
      if (currentObservingRef.current) {
        scrollObserverRef.current.unobserve(currentObservingRef.current)
      }
      // Observe the anchor element
      scrollObserverRef.current.observe(fetchMoreAnchorRef.current)
      // Save the element to currentObserving element
      currentObservingRef.current = fetchMoreAnchorRef.current
    }
  }, [query.hasNextPage, query.fetchNextPage])

  if (query.isLoading || !query.isFetched) {
    return <Loader />
  }

  if (query.isError) {
    return (
      <MessageBox>Something went wrong: “{query.error.message}”</MessageBox>
    )
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
      {!query.data?.pages?.[0]?.results.length ? (
        <MessageBox>
          No result for term: “{decodeURIComponent(searchQuery)}”
        </MessageBox>
      ) : (
        <ArticleGrid>
          {query.data?.pages.map((group) =>
            group.results.map((article) => (
              <ArticleCard
                key={article.id}
                href={createArticleURL(article.id)}
                title={article.webTitle}
                image={article.fields.thumbnail}
              />
            ))
          )}
        </ArticleGrid>
      )}
      {query.hasNextPage && <Loader ref={fetchMoreAnchorRef} />}
    </div>
  )
}
