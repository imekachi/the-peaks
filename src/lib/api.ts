import axios from 'axios'
import { GDContentAPIOptions, GDContentSearchResponse } from './types'

const ENDPOINT_BASE = 'https://content.guardianapis.com'

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

export const getTopStories = createArticlesAPIEndpoint({
  'page-size': 8,
  'show-fields': ['thumbnail', 'trailText'],
})

export const createAPIArticlesBySectionId = (sectionId: string) =>
  createArticlesAPIEndpoint({
    'page-size': 3,
    'show-fields': ['thumbnail', 'trailText'],
    section: sectionId,
  })
