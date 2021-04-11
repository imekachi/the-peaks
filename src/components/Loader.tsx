import styled, { keyframes } from 'styled-components'

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
`

const Spinner = styled.div`
  display: inline-block;
  vertical-align: middle;
  text-indent: -9999em; // hide loading text
  width: 3em;
  height: 3em;
  position: relative;
  color: ${(props) => props.theme.colors.primary};

  > div {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 0.4em solid transparent;
    border-top-color: currentColor;
    animation: ${rotateAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  > div:nth-child(1) {
    animation-delay: 0.15s;
  }

  > div:nth-child(2) {
    animation-delay: 0.3s;
  }

  > div:nth-child(3) {
    animation-delay: 0.4s;
  }
`
// Actually I'd prefer skeletons over spinner
// but just follow the design.
export default function Loader() {
  return (
    <Wrapper>
      <Spinner>
        <div />
        <div />
        <div />
        Loading...
      </Spinner>
    </Wrapper>
  )
}
