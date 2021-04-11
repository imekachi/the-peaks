import axios from 'axios'
import { GDContentSearchItemFields, GDContentSearchResponse } from './types'

const ENDPOINT_BASE = 'https://content.guardianapis.com'

interface ContentAPIOptions {
  'api-key'?: string
  'page-size'?: number
  'show-fields'?: (keyof GDContentSearchItemFields)[]
}

const defaultOptions = {
  'api-key': process.env.NEXT_PUBLIC_API_KEY as string,
}

export function createArticlesAPIEndpoint(options: ContentAPIOptions = {}) {
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
