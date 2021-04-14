import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import snippets from '../styles/snippets'
import { MessageBox } from './MessageBox'

const Container = styled.div`
  text-align: center;
`

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #f23535;
`

const Label = styled.div`
  ${snippets.lineHeight.md};
`

const CodeBlock = styled.pre`
  ${snippets.fontFamily.mono};
  ${snippets.fontSize.base};
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  margin: 10px 0 0;
`

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <MessageBox>
      <Container>
        <Icon>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </Icon>
        <Label>Something went wrong try to refresh the page</Label>
        <CodeBlock>{message}</CodeBlock>
      </Container>
    </MessageBox>
  )
}
