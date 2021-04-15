import { bookmarkStorage } from '../bookmark'

const mockStorageArticles = [
  {
    id: 'australia-news/live/2021/apr/15/australia-news-live-queensland',
    savedAt: new Date('2021-04-13'),
  },
  {
    id: 'world/live/2021/apr/15/coronavirus-live-news-former-world-leaders',
    savedAt: new Date('2021-04-15'),
  },
]

describe(`lib/bookmark`, () => {
  it(`should read empty localStorage and return an empty array`, () => {
    expect(bookmarkStorage.read()).toEqual([])
  })

  it(`should write new data to localStorage and read it correctly`, () => {
    bookmarkStorage.write(mockStorageArticles)
    expect(bookmarkStorage.read()).toEqual(mockStorageArticles)
  })

  it(`should be able to check if given article id exists on local storage`, () => {
    expect(
      bookmarkStorage.articleExist(
        bookmarkStorage.read(),
        mockStorageArticles[0].id
      )
    ).toBe(true)
  })

  it(`should be able to check if given article does not exists on local storage`, () => {
    expect(
      bookmarkStorage.articleExist(bookmarkStorage.read(), 'some/unknown/id')
    ).toBe(false)
  })

  const newArticleId = 'some/new/article'
  it(`should be able to save new article`, () => {
    bookmarkStorage.saveArticle(newArticleId)
    expect(
      bookmarkStorage.articleExist(bookmarkStorage.read(), newArticleId)
    ).toBe(true)
  })

  it(`should be able to remove an article`, () => {
    bookmarkStorage.removeArticle(newArticleId)
    expect(
      bookmarkStorage.articleExist(bookmarkStorage.read(), newArticleId)
    ).toBe(false)
  })
})
