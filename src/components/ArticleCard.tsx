import React from 'react'
import styled from 'styled-components'
import snippets from '../styles/snippets'
import { hexToRgba } from '../utils/unitConverter'
import Img from './Img'

const Wrapper = styled.a<React.HTMLAttributes<HTMLAnchorElement>>`
  display: block;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.23);
  background-color: ${(props) => props.theme.colors.articleDefaultBg};
`

const Article = styled.article`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-bottom: 3px solid #d32f2f;

  > * {
    width: 100%;
  }
`

const ArticleImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`

const DefaultLogo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

const Info = styled.div<{ stretchToFull?: boolean }>`
  position: relative;
  z-index: 1;
  background-color: ${(props) => hexToRgba(props.theme.colors.primary, 0.9)};
  ${snippets.colors.textOnPrimaryBg};
  padding: 10px;
  min-height: 130px;
  flex: ${(props) => props.stretchToFull && 1};
`

const Title = styled.h3<{ isMain?: boolean; withDescription?: boolean }>`
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.withDescription ? 2 : 4)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${snippets.fontFamily.serif};
  font-size: ${({ theme, isMain }) =>
    isMain ? theme.fontSize.lg : theme.fontSize.md};
  font-weight: 700;
`

const Description = styled.p`
  ${snippets.fontSize.base};
  margin-top: 5px;
`

interface ArticleCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string
  description?: string
  isMain?: boolean
  withImage?: boolean
  image?: string
}

export default function ArticleCard({
  title,
  description,
  image,
  isMain = false,
  withImage = true,
  ...restProps
}: ArticleCardProps) {
  return (
    <Wrapper {...restProps}>
      <Article>
        {withImage && !image && (
          <DefaultLogo>
            <Img
              src="/static/images/logo-white.png"
              width="142"
              height="56"
              alt="The Peaks logo"
              loading="lazy"
              objectFit="contain"
            />
          </DefaultLogo>
        )}
        {withImage && !!image && (
          <ArticleImage>
            <Img
              src={image}
              width="350"
              height="350"
              styleWidth="100%"
              styleHeight="100%"
              objectFit="cover"
              alt={title}
            />
          </ArticleImage>
        )}
        <Info stretchToFull={!withImage}>
          <Title isMain={isMain} withDescription={!!description}>
            {title}
          </Title>
          {!!description && <Description>{description}</Description>}
        </Info>
      </Article>
    </Wrapper>
  )
}
