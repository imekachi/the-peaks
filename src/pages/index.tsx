import styled from 'styled-components'
import ArticleCard from '../components/ArticleCard'
import PageHeader from '../components/PageHeader'
import snippets from '../styles/snippets'

const H2 = styled.h2`
  ${snippets.fontFamily.serif};
  ${snippets.fontSize.xl};
  margin-bottom: 30px;
`

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 350px;
  grid-gap: 30px;
`

export default function Home() {
  return (
    <>
      <PageHeader title="Top stories" showBookmarkButton />
      <Section>
        <MainGrid>
          <ArticleCard
            isMain
            className="main"
            title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
            description="Republican senators on Capitol Hill have expressed their dismay at a Donald Trump."
          />
          <ArticleCard
            title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
            description="Republican senators on Capitol Hill have expressed their dismay at a Donald Trump."
          />
          <ArticleCard
            title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
            description="Republican senators on Capitol Hill have expressed their dismay at a Donald Trump."
          />
          <ArticleCard
            title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
            description="Republican senators on Capitol Hill have expressed their dismay at a Donald Trump."
          />
          <ArticleCard
            title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
            description="Republican senators on Capitol Hill have expressed their dismay at a Donald Trump."
          />
        </MainGrid>
        <Grid>
          <ArticleCard
            title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
            description="Republican senators on Capitol Hill have expressed their dismay at a Donald Trump."
          />
          <ArticleCard
            title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
            description="Republican senators on Capitol Hill have expressed their dismay at a Donald Trump."
          />
          <ArticleCard
            title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
            description="Republican senators on Capitol Hill have expressed their dismay at a Donald Trump."
          />
        </Grid>
      </Section>
      <Section>
        <H2>Sports</H2>
        <Grid>
          <ArticleCard
            title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
            description="Republican senators on Capitol Hill have expressed their dismay at a Donald Trump."
          />
          <ArticleCard
            title="Coronavirus live news: markets fall over fears of long US recovery as Brazil cases top 800,000"
            description="Republican senators on Capitol Hill have expressed their dismay at a Donald Trump."
          />
        </Grid>
      </Section>
    </>
  )
}
