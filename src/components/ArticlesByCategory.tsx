import { useQuery } from 'react-query'
import striptags from 'striptags'
import styled from 'styled-components'
import { createAPIArticlesBySectionId } from '../lib/api'
import { createArticleURL } from '../lib/article'
import snippets from '../styles/snippets'
import ArticleCard from './ArticleCard'
import ArticleGrid from './ArticleGrid'
import Loader from './Loader'

const H2 = styled.h2`
  ${snippets.fontFamily.serif};
  ${snippets.fontSize.xl};
  margin-bottom: 30px;
`

interface ArticlesByCategoryProps {
  category: string
}

export default function ArticlesByCategory({
  category,
}: ArticlesByCategoryProps) {
  const query = useQuery(
    `articlesByCategory:${category}`,
    createAPIArticlesBySectionId(category)
  )

  if (query.isLoading || !query.isSuccess) return <Loader />

  return (
    <>
      <H2>{query.data.results[0].sectionName}</H2>
      <ArticleGrid>
        {query.data.results.map((article) => (
          <ArticleCard
            key={article.id}
            image={article.fields.thumbnail}
            title={article.webTitle}
            description={striptags(article.fields.trailText as string)}
            href={createArticleURL(article.id)}
          />
        ))}
      </ArticleGrid>
    </>
  )
}
