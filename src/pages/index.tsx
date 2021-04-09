import styled from 'styled-components'
import ArticleCard from '../components/ArticleCard'
import { Button } from '../components/Button'
import { Select } from '../components/Select'
import { ICON_BOOKMARK_ON } from '../styles/icons'
import snippets from '../styles/snippets'

const H1 = styled.h1`
  ${snippets.fontFamily.serif};
  ${snippets.fontSize['2xl']};
  margin: 0;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 30px;
  margin-bottom: 30px;
  align-items: flex-end;

  ${H1} {
    grid-column: 1 / 3;
  }
`

const BookmarkButtonWrapper = styled.div`
  text-align: right;
`

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
    <div>
      <Section>
        <Header>
          <H1>Top stories</H1>
          <BookmarkButtonWrapper>
            <Button>{ICON_BOOKMARK_ON}VIEW BOOKMARK</Button>
          </BookmarkButtonWrapper>
          <Select>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="popular">Most popular</option>
          </Select>
        </Header>
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
    </div>
  )
}
