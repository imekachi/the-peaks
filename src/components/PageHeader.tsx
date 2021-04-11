import styled from 'styled-components'
import { ICON_BOOKMARK_ON } from '../styles/icons'
import snippets from '../styles/snippets'
import { Button } from './Button'
import { Select } from './Select'

const H1 = styled.h1`
  ${snippets.fontFamily.serif};
  ${snippets.fontSize['2xl']};
  margin: 0;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 30px;
  margin-bottom: 30px;
  align-items: flex-end;

  ${H1} {
    grid-column: 1 / 3;
  }
  ${Select} {
    /* always in the last column */
    grid-column-start: -2;
  }
`

const BookmarkButtonWrapper = styled.div`
  text-align: right;
`

interface PageHeaderProps {
  title: string
  showBookmarkButton?: boolean
}

export default function PageHeader({
  title,
  showBookmarkButton,
}: PageHeaderProps) {
  return (
    <Wrapper>
      <H1>{title}</H1>
      {showBookmarkButton && (
        <BookmarkButtonWrapper>
          <Button>{ICON_BOOKMARK_ON}VIEW BOOKMARK</Button>
        </BookmarkButtonWrapper>
      )}
      <Select>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="popular">Most popular</option>
      </Select>
    </Wrapper>
  )
}
