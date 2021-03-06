import styled from 'styled-components'

interface ImgInternalProps {
  block?: boolean
  verticalAlign?: string
  loading?: 'lazy' | 'eager' | 'auto'
  maxWidth?: string
  maxHeight?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  // These are used for browser with loading attributes
  width?: number | string
  height?: number | string
  // These will be used for styling the element
  styleWidth?: string
  styleHeight?: string
}

const Img = styled.img.attrs<ImgInternalProps>(({ loading }) => ({
  // inject default attributes
  loading: loading ?? 'lazy',
}))<ImgInternalProps>`
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  vertical-align: ${(props) => props.verticalAlign};
  max-width: ${(props) => props.maxWidth};
  max-height: ${(props) => props.maxHeight};
  width: ${(props) => props.styleWidth};
  height: ${(props) => props.styleHeight};
  object-fit: ${(props) => props.objectFit};
`

export type ImgProps = Parameters<typeof Img>[0]

export default Img
