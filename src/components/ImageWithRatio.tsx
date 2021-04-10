import styled from 'styled-components'
import Img, { ImgProps } from './Img'

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const RatioWrapper = styled.span<{ ratio: number }>`
  position: relative;
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  height: 0;
  padding-bottom: ${(props) => `${props.ratio * 100}%`};
  max-width: 100%;

  > img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

interface ImageWithRatioProps {
  ratio: number
}

export default function ImageWithRatio({
  ratio,
  ...restProps
}: ImageWithRatioProps & ImgProps) {
  return (
    <OuterWrapper>
      <RatioWrapper ratio={ratio}>
        <Img {...restProps} />
      </RatioWrapper>
    </OuterWrapper>
  )
}
