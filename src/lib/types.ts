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
  lastModified?: string
}

export interface GDContentSearchItem {
  id: string
  type: string
  webTitle: string
  sectionId: string
  sectionName: string
  fields: GDContentSearchItemFields
}

export interface GDContentSearchResponse {
  currentPage: number
  orderBy: GDOrdering
  pageSize: number
  pages: number
  results: GDContentSearchItem[]
}

export interface GDContentAPIOptions {
  'api-key'?: string
  'page-size'?: number
  'show-fields'?: (keyof GDContentSearchItemFields)[]
  'order-by'?: GDOrdering
  section?: string
}
