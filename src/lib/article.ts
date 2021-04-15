export function createArticleURL(articleId: string) {
  return `/article/${articleId}`
}

export function createArticleIdFromParts(articleIdParts?: string[]) {
  return articleIdParts?.join('/')
}

export function getArticlePartsFromId(articleId: string) {
  return articleId.split('/')
}
