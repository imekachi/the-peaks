import styled from 'styled-components'
import media from '../styles/mediaQuery'

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-auto-rows: 350px;
  grid-gap: 10px;

  ${media.md`
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 15px;
  `};

  ${media.lg`
    grid-gap: 30px;
  `};
`

export default ArticleGrid
