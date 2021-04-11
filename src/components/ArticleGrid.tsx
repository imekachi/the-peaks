import styled from 'styled-components'

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 350px;
  grid-gap: 30px;
`

export default ArticleGrid
