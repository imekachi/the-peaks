import styled from 'styled-components'
import { spacing } from '../styles/sizes'

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textOnPrimaryBg};
  font-family: ${(props) => props.theme.fontFamily.sans};
  font-size: ${(props) => props.theme.fontSize.sm};
  line-height: 1;
  padding: ${spacing(1)};
  border-radius: ${spacing(0.5)};
  border: 0 none;
  outline: none;
  cursor: pointer;

  //&:focus-visible {
  //
  //}

  > .icon {
    margin-right: ${spacing(1)};
  }
`
