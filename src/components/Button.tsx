import styled from 'styled-components'
import snippets from '../styles/snippets'

export const Button = styled.button`
  display: inline-block;
  vertical-align: middle;
  ${snippets.colors.primaryBg};
  ${snippets.colors.textOnPrimaryBg};
  ${snippets.fontFamily.sans};
  ${snippets.fontSize.sm};
  font-weight: 500;
  line-height: 1;
  padding: 8px 10px;
  border-radius: 4px;

  //&:focus-visible {
  //
  //}

  > .icon {
    margin-right: 10px;
  }
`
