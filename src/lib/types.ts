export enum GDOrdering {
  newest = 'newest',
  oldest = 'oldest',
  relevance = 'relevance',
}

export interface GDContentSearchItemFields {
  thumbnail?: string
  headline?: string // HTML
  trailText?: string // HTML
  body?: string // HTML
  main?: string // HTML
  lastModified?: string
}

export interface GDArticle {
  id: string
  type: string
  webTitle: string
  sectionId: string
  sectionName: string
  webPublicationDate: string
  fields: GDContentSearchItemFields
}

export interface GDContentSearchResponse {
  currentPage: number
  orderBy: GDOrdering
  pageSize: number
  pages: number
  results: GDArticle[]
}

export interface GDSingleItemResponse {
  content: GDArticle
}

export enum GDAPIPath {
  singleItem = '',
  content = '/search',
}
