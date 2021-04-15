import { ArticleSectionId, articleSections } from '../config/homepage'
import { createAPIArticlesBySectionId, createAPITopStories } from './api'
import { GDContentSearchResponse, GDOrdering } from './types'

export const homePageQueries = async () => {
  const topStoriesPromise = createAPITopStories({
    orderBy: GDOrdering.newest,
  })()

  // Get data from API articles by sections
  const articlesBySectionIdsPromises = articleSections.map((sectionId) =>
    createAPIArticlesBySectionId({
      sectionId,
      orderBy: GDOrdering.newest,
    })()
  )

  // Resolve data promises concurrently
  const [topStoriesRes, ...articlesBySectionIdRes] = await Promise.all([
    topStoriesPromise,
    ...articlesBySectionIdsPromises,
  ])

  const queryResponses: Partial<
    Record<'topStories' | ArticleSectionId, GDContentSearchResponse>
  > = {
    topStories: topStoriesRes,
  }

  articleSections.forEach((sectionId, index) => {
    queryResponses[sectionId] = articlesBySectionIdRes[index]
  })

  return queryResponses
}
