import styled from 'styled-components'
import snippets from '../styles/snippets'
import { hexToRgba } from '../utils/unitConverter'
import React from 'react'

const Wrapper = styled.a<React.HTMLAttributes<HTMLAnchorElement>>`
  display: block;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.23);
  background-color: #000000;
`

const Article = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-bottom: 3px solid #d32f2f;

  > * {
    width: 100%;
  }
`

const Info = styled.div`
  background-color: ${(props) => hexToRgba(props.theme.colors.primary, 0.9)};
  ${snippets.colors.textOnPrimaryBg};
  padding: 10px;
  min-height: 130px;
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
}

export default function ArticleCard({
  title,
  description,
  isMain,
  ...restProps
}: ArticleCardProps) {
  return (
    <Wrapper {...restProps}>
      <Article>
        <Info>
          <Title isMain={isMain} withDescription={!!description}>
            {title}
          </Title>
          {!!description && <Description>{description}</Description>}
        </Info>
      </Article>
    </Wrapper>
  )
}
