import styled from 'styled-components'
import media from '../styles/mediaQuery'
import snippets from '../styles/snippets'

export const MessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
  text-align: center;
  padding: 10px;

  ${media.sm`
    padding: 15px;
  `};

  ${media.md`
    padding: 30px;
  `};

  > pre {
    ${snippets.fontSize.base};
  }
`
