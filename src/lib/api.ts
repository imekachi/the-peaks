import axios from 'axios'
import { ENDPOINT_BASE } from '../config/api'
import {
  GDAPIPath,
  GDContentSearchItemFields,
  GDContentSearchResponse,
  GDOrdering,
  GDSingleItemResponse,
} from './types'

const defaultOptions = {
  'api-key': process.env.NEXT_PUBLIC_API_KEY as string,
}

export function createArticlesAPIEndpoint<GDExpectedResponse>(
  options: {
    endpointPath?: string
    'api-key'?: string
    'page-size'?: number
    'show-fields'?: (keyof GDContentSearchItemFields)[]
    'order-by'?: GDOrdering
    'show-elements'?: 'all' | ('image' | 'video' | 'audio')[]
    section?: string
    ids?: string
    q?: string
  } = {}
) {
  // Pull 'show-fields' out of options, we'll need to transform it before sending it as a param
  const {
    'show-fields': showFields,
    'show-elements': showElements,
    ...passThroughOptions
  } = options

  // Pull baseEndpoint out of merged options
  const { endpointPath, ...params }: Record<string, string | number> = {
    ...defaultOptions,
    ...passThroughOptions,
  }

  // transform show-fields from array to string
  if (showFields) {
    params['show-fields'] = showFields.join(',')
  }
  if (showElements) {
    params['show-elements'] = Array.isArray(showElements)
      ? showElements.join(',')
      : showElements
  }

  return async () =>
    axios
      .get<{ response: GDExpectedResponse }>(
        `${ENDPOINT_BASE}${endpointPath}`,
        {
          params,
        }
      )
      .then((res) => res.data?.response)
}

export const createAPITopStories = ({
  orderBy = GDOrdering.newest,
}: {
  orderBy?: GDOrdering
}) =>
  createArticlesAPIEndpoint<GDContentSearchResponse>({
    endpointPath: GDAPIPath.content,
    'page-size': 8,
    'show-fields': ['thumbnail', 'trailText'],
    'order-by': orderBy,
  })

export const createAPIArticlesByIds = ({
  articleIds,
}: {
  articleIds: string[]
}) =>
  createArticlesAPIEndpoint<GDContentSearchResponse>({
    endpointPath: GDAPIPath.content,
    ids: articleIds.join(','),
    'page-size': 100,
    'show-fields': ['thumbnail', 'trailText'],
  })

export const createAPIArticleSearch = ({
  searchQuery,
  orderBy = GDOrdering.newest,
}: {
  searchQuery: string
  orderBy: GDOrdering
}) =>
  createArticlesAPIEndpoint<GDContentSearchResponse>({
    endpointPath: GDAPIPath.content,
    q: searchQuery ? encodeURIComponent(searchQuery) : '',
    'page-size': 9,
    'show-fields': ['thumbnail', 'trailText'],
    'order-by': orderBy,
  })

export const createAPIArticlesBySectionId = ({
  sectionId,
  orderBy = GDOrdering.newest,
}: {
  sectionId: string
  orderBy?: GDOrdering
}) =>
  createArticlesAPIEndpoint<GDContentSearchResponse>({
    endpointPath: GDAPIPath.content,
    section: sectionId,
    'order-by': orderBy,
    'page-size': 3,
    'show-fields': ['thumbnail', 'trailText'],
  })

export const createAPIArticleView = (articleId: string) =>
  createArticlesAPIEndpoint<GDSingleItemResponse>({
    endpointPath: `${GDAPIPath.singleItem}/${articleId}`,
    'show-fields': ['trailText', 'body', 'main'],
    // adding "show-elements" param doesn't do anything
    // - no new field about media
    // - no effect on body media in HTML
    // so... I don't know what to do with this?
    // 'show-elements': 'all',
  })
