import styled from 'styled-components'
import { GDOrdering } from '../lib/types'
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
  orderBy?: GDOrdering
  onChangeOrdering?: (orderBy: GDOrdering) => void
}

export default function PageHeader({
  title,
  showBookmarkButton,
  orderBy = GDOrdering.newest,
  onChangeOrdering,
}: PageHeaderProps) {
  return (
    <Wrapper>
      <H1>{title}</H1>
      {showBookmarkButton && (
        <BookmarkButtonWrapper>
          <Button as="a" href="/bookmark">
            {ICON_BOOKMARK_ON}VIEW BOOKMARK
          </Button>
        </BookmarkButtonWrapper>
      )}
      <Select
        value={orderBy}
        onChange={(event) => {
          onChangeOrdering?.(event.target.value as GDOrdering)
        }}
      >
        <option value={GDOrdering.newest}>Newest first</option>
        <option value={GDOrdering.oldest}>Oldest first</option>
      </Select>
    </Wrapper>
  )
}
