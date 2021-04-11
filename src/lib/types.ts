export type GDOrdering = 'newest' | 'oldest' | 'relevance'

export interface GDContentSearchItemFields {
  thumbnail?: string
  headline?: string // HTML
  trailText?: string // HTML
  body?: string // HTML
  lastModified?: string
}

export interface GDContentSearchItem {
  id: string
  type: string
  webTitle: string
  fields: GDContentSearchItemFields
}

export interface GDContentSearchResponse {
  currentPage: number
  orderBy: GDOrdering
  pageSize: number
  pages: number
  results: GDContentSearchItem[]
}
