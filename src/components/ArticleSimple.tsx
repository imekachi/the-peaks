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
  href: string
  title: string
  image: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export default function ArticleSimple({
  href,
  title,
  image,
  target,
}: ArticleSimpleProps) {
  return (
    <div>
      <ImageWrapper href={href} target={target} title={title}>
        <ImageWithRatio
          ratio={0.6}
          src={image}
          alt={title}
          width="445"
          height="267"
          loading="lazy"
          objectFit="cover"
        />
      </ImageWrapper>
      <Title title={title}>
        <a href={href} target={target}>
          {title}
        </a>
      </Title>
    </div>
  )
}
