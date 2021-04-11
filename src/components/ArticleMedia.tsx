import styled from 'styled-components'
import snippets from '../styles/snippets'
import ImageWithRatio from './ImageWithRatio'

const ImageWrapper = styled.a`
  display: block;
`

const Title = styled.h1`
  ${snippets.fontSize.base};
  margin-top: 10px;
  opacity: 50%;

  &:hover {
    opacity: 100%;
  }

  > a {
    ${snippets.colors.textOnBody};
  }
`

interface ArticleSimpleProps {
  image: string
  caption: string
}

export default function ArticleMedia({ image, caption }: ArticleSimpleProps) {
  return (
    <div>
      <ImageWrapper title={caption}>
        <ImageWithRatio
          ratio={0.6}
          src={image}
          alt={caption}
          width="445"
          height="267"
          loading="lazy"
          objectFit="cover"
        />
      </ImageWrapper>
      <Title title={caption}>{caption}</Title>
    </div>
  )
}
