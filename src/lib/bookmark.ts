import { STORAGE_KEYS } from '../config/storage'

interface BookmarkStorageRaw {
  id: string
  savedAt: string
}

interface BookmarkStorageItem {
  id: string
  savedAt: Date
}

export interface BookmarkStorage {
  /**
   * Check if there is already the article in saved articles
   */
  articleExist: (
    savedArticles: BookmarkStorageItem[],
    articleId: string
  ) => boolean
  /**
   * Read data from storage
   */
  read: () => BookmarkStorageItem[]
  /**
   * Write saved articles to storage
   */
  write: (savedArticles: BookmarkStorageItem[]) => void
  /**
   * Clear all saved articles
   */
  reset: () => void
  /**
   * Remove a saved article
   */
  removeArticle: (
    articleId: string,
    savedArticles?: BookmarkStorageItem[]
  ) => BookmarkStorageItem[]
  /**
   * Save new article
   */
  saveArticle: (
    articleId: string,
    savedArticles?: BookmarkStorageItem[]
  ) => BookmarkStorageItem[]
}

// TODO: add tests
export const bookmarkStorage: BookmarkStorage = {
  articleExist: (savedArticles, articleId) => {
    if (!savedArticles) return false
    return savedArticles.some((article) => article.id === articleId)
  },
  read: () => {
    const storageRaw = localStorage.getItem(STORAGE_KEYS.BOOKMARK)
    if (!storageRaw) return []

    let parsedData: BookmarkStorageItem[] = []
    try {
      // Parse storage string to JSON
      const rawItemArr = JSON.parse(storageRaw) as BookmarkStorageRaw[]
      // Parse data inside each saved article
      parsedData = rawItemArr.map((savedArticle) => ({
        ...savedArticle,
        savedAt: new Date(savedArticle.savedAt),
      }))
    } catch (err) {
      console.error(`> Error! bookmark storage data is corrupt: `, err)
    }

    return parsedData
  },
  write: (savedArticles) => {
    // Convert to string and save to local storage
    localStorage.setItem(STORAGE_KEYS.BOOKMARK, JSON.stringify(savedArticles))
  },
  reset: () => {
    localStorage.removeItem(STORAGE_KEYS.BOOKMARK)
  },
  removeArticle: (articleId, savedArticles = bookmarkStorage.read()) => {
    const updatedSavedArticles = savedArticles.filter(
      (article) => article.id !== articleId
    )
    bookmarkStorage.write(updatedSavedArticles)
    return updatedSavedArticles
  },
  saveArticle: (
    articleId,
    savedArticles = bookmarkStorage.read()
  ): BookmarkStorageItem[] => {
    let updatedSavedArticles = [...savedArticles]

    // if exists in the storage, remove it
    if (bookmarkStorage.articleExist(savedArticles, articleId)) {
      updatedSavedArticles = bookmarkStorage.removeArticle(
        articleId,
        updatedSavedArticles
      )
    }
    // Create new saved article item, and add to the first position
    // to sort by newest by default.
    updatedSavedArticles.unshift({ id: articleId, savedAt: new Date() })

    // Write updatedSavedArticles to storage
    bookmarkStorage.write(updatedSavedArticles)

    return updatedSavedArticles
  },
}
