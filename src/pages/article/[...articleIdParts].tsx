import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import BookmarkButton from '../../components/BookmarkButton'
import ErrorMessage from '../../components/ErrorMessage'
import Loader from '../../components/Loader'
import PageTitle from '../../components/PageTitle'
import { createAPIArticleView } from '../../lib/api'
import { GDSingleItemResponse } from '../../lib/types'
import media from '../../styles/mediaQuery'
import snippets from '../../styles/snippets'

const Timestamp = styled.div`
  ${snippets.fontFamily.sans};
  ${snippets.fontSize.xs};
  font-weight: 400;
  margin: 20px 0;
`

const H1 = styled.div`
  ${snippets.fontFamily.serif};
  ${snippets.fontSize['2xl']};
  font-weight: 700;
  line-height: 1.14705882;

  ${media.md`
    ${snippets.fontSize['3xl']};
  `};
`

const SubHeader = styled.p`
  ${snippets.fontFamily.serif};
  ${snippets.fontSize.lg};
  font-weight: 700;
  line-height: 1.3;
  margin-top: 15px;

  ${media.md`
    ${snippets.fontSize.xl};
    margin-top: 20px;
  `};
`

const Separator = styled.hr`
  margin: 15px 0;
  border-bottom: 2px solid ${(props) => props.theme.colors.sectionBorder};
`
const Content = styled.section`
  grid-row-start: 3;
  ${snippets.fontFamily.sans};
  ${snippets.fontSize.base};
  ${snippets.lineHeight.xl};

  p {
    margin: 1em 0;
  }

  figure {
    display: block;
    margin: 1.5em 0;
  }

  table {
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.screen.md}) {
    grid-row-start: auto;

    figure {
      display: block;
      margin: 2em 40px;
    }
  }
`

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: auto;

  figcaption {
    ${snippets.fontSize.xs};
    ${snippets.lineHeight.md};
    margin-top: 10px;
    opacity: 50%;
  }

  @media (min-width: ${(props) => props.theme.screen.md}) {
    grid-template-columns: minmax(57%, 635px) auto;
    grid-column-gap: 30px;

    ${Content} {
      grid-column-start: 1;
    }
  }
`

const MediaList = styled.section`
  margin: 20px 0;

  figure {
    margin: 0;
  }

  @media (min-width: ${(props) => props.theme.screen.md}) {
    margin: 0;
  }
`

export default function ArticleView() {
  const router = useRouter()
  const articleId = useMemo(() => {
    if (Array.isArray(router.query.articleIdParts)) {
      return router.query.articleIdParts.join('/')
    }
  }, [router.query])

  const query = useQuery<
    GDSingleItemResponse,
    AxiosError<GDSingleItemResponse>
  >(['articleView', articleId], createAPIArticleView(articleId as string), {
    enabled: !!articleId,
  })

  if (!articleId || query.isLoading || !query.isFetched) {
    return (
      <>
        <PageTitle title="Loading article..." />
        <Loader />
      </>
    )
  }

  if (query.isError) {
    return <ErrorMessage message={query.error.message} />
  }

  // At this point query.data should have a response
  const { content } = query.data as NonNullable<typeof query.data>

  return (
    <div>
      <PageTitle title={content.webTitle} />
      <BookmarkButton articleId={articleId} />
      <Timestamp>{dateTimeFormatter(content.webPublicationDate)}</Timestamp>
      <MainContainer>
        <div>
          <H1>{content.webTitle}</H1>
          {!!content.fields.trailText && (
            <SubHeader
              dangerouslySetInnerHTML={{ __html: content.fields.trailText }}
            />
          )}
          <Separator />
        </div>
        <Content
          dangerouslySetInnerHTML={{
            __html: content.fields.body ?? 'No content found',
          }}
        />
        {!!content.fields.main && (
          <MediaList>
            <div dangerouslySetInnerHTML={{ __html: content.fields.main }} />
            {/*
              This should be used if there is media list data, but I haven't got anything from the API.
              So, this is unused for now.
              <ArticleMedia
                image="https://via.placeholder.com/445x267.png"
                caption="A woman walks along a flooded road amidst a storm in the Masiphumelele informal settlement in Cape Town Photograph: Nic Bothma/EPA"
              />
            */}
          </MediaList>
        )}
      </MainContainer>
    </div>
  )
}

function dateTimeFormatter(dateTimeString: string) {
  const dateTime = new Date(dateTimeString)

  if (dateTime.toString() === 'Invalid Date') {
    return '-'
  }

  return dateTime.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
    hour12: false,
  })
}
