import axios from 'axios'
import { ENDPOINT_BASE } from '../config/api'
import {
  GDContentAPIOptions,
  GDContentSearchResponse,
  GDOrdering,
} from './types'

const defaultOptions = {
  'api-key': process.env.NEXT_PUBLIC_API_KEY as string,
}

export function createArticlesAPIEndpoint(options: GDContentAPIOptions = {}) {
  const { 'show-fields': showFields, ...passThroughOptions } = options

  const params: Record<string, string | number> = {
    ...defaultOptions,
    ...passThroughOptions,
  }

  if (showFields) {
    params['show-fields'] = showFields.join(',')
  }

  return async () =>
    axios
      .get<{ response: GDContentSearchResponse }>(`${ENDPOINT_BASE}/search`, {
        params,
      })
      .then((res) => res.data?.response)
}

export const createAPITopStories = ({
  orderBy = GDOrdering.newest,
}: {
  orderBy?: GDOrdering
}) =>
  createArticlesAPIEndpoint({
    'page-size': 8,
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
  createArticlesAPIEndpoint({
    'page-size': 3,
    'show-fields': ['thumbnail', 'trailText'],
    section: sectionId,
    'order-by': orderBy,
  })
