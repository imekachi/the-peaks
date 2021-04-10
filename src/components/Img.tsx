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
  vertical-align: ${(props) => props.verticalAlign ?? 'bottom'};
  max-width: ${(props) => props.maxWidth ?? '100%'};
  max-height: ${(props) => props.maxHeight ?? '100%'};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: ${(props) => props.objectFit};
`

export type ImgProps = Parameters<typeof Img>[0]

export default Img
