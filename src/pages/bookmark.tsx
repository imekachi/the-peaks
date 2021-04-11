import ArticleCard from '../components/ArticleCard'
import ArticleGrid from '../components/ArticleGrid'
import PageHeader from '../components/PageHeader'

export default function Bookmark() {
  return (
    <div>
      <PageHeader title="All bookmark" />
      <ArticleGrid>
        <ArticleCard
          title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
          image="https://via.placeholder.com/445x267.png"
        />
        <ArticleCard title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000" />
        <ArticleCard title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000" />
        <ArticleCard title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000" />
      </ArticleGrid>
    </div>
  )
}
