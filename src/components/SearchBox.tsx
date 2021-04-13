import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ReduxRootState } from '../lib/redux'
import { articleSearchActions } from '../lib/slices/articleSearch'
import snippets from '../styles/snippets'

const Input = styled.input`
  ${snippets.fontFamily.sans};
  ${snippets.fontSize.base};
  height: 40px;
  width: 0;
  margin-right: 0;
  color: inherit;
  transition-property: width, margin;

  ::placeholder {
    opacity: 0.4;
    color: inherit;
  }

  .expand & {
    width: 220px;
    margin-right: 15px;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${snippets.colors.textOnPrimaryBg};
  padding: 0 25px;
  background-color: transparent;
  border-bottom: 3px solid currentColor;
  transition-property: background-color, width;
  cursor: pointer;

  &,
  ${Input} {
    transition-duration: 300ms;
  }

  &.expand {
    background-color: rgba(255, 255, 255, 0.15);
    cursor: default;
  }
`

const IconWrapper = styled.div``

export default function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchState = useSelector(
    (state: ReduxRootState) => state.articleSearch
  )
  const dispatch = useDispatch()

  return (
    <Wrapper
      className={searchState.searchBoxExpand ? 'expand' : undefined}
      onClick={() => {
        // If it's not already expanded, expand it
        if (!searchState.searchBoxExpand) {
          dispatch(articleSearchActions.update({ searchBoxExpand: true }))
          // Focus the search input, so users don't have to click again
          inputRef.current?.focus?.()
        }
      }}
    >
      <Input
        ref={inputRef}
        placeholder="Search all news"
        value={searchState.searchQuery}
        onChange={(event) => {
          // Update search query to redux.
          // It will be used in components/Layout.tsx to display search result
          dispatch(
            articleSearchActions.update({ searchQuery: event.target.value })
          )
        }}
        onBlur={() => {
          // If no searchQuery after user click away
          // collapse the element
          if (!searchState.searchQuery) {
            dispatch(articleSearchActions.update({ searchBoxExpand: false }))
          }
        }}
      />
      <IconWrapper>
        <FontAwesomeIcon icon={faSearch} />
      </IconWrapper>
    </Wrapper>
  )
}
