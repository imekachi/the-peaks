import { useState } from 'react'
import { bookmarkStorage } from '../lib/bookmark'
import { ICON_BOOKMARK_OFF, ICON_BOOKMARK_ON } from '../styles/icons'
import { Button } from './Button'

interface BookmarkButtonProps {
  articleId: string
}

export default function BookmarkButton({ articleId }: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(
    bookmarkStorage.articleExist(bookmarkStorage.read(), articleId)
  )
  console.log(`> isSaved: `, isSaved)

  return (
    <Button
      onClick={(event) => {
        event.preventDefault()
        if (isSaved) {
          setIsSaved(false)
          bookmarkStorage.removeArticle(articleId)
          alert('REMOVED FROM BOOKMARKS')
        } else {
          setIsSaved(true)
          bookmarkStorage.saveArticle(articleId)
          alert('SAVED TO BOOKMARKS')
        }
      }}
    >
      {isSaved ? (
        <>{ICON_BOOKMARK_OFF} REMOVE BOOKMARK</>
      ) : (
        <>{ICON_BOOKMARK_ON} ADD BOOKMARK</>
      )}
    </Button>
  )
}
