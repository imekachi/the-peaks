import { faBookmark as faBookmarkOff } from '@fortawesome/free-regular-svg-icons/faBookmark'
import { faBookmark as faBookmarkOn } from '@fortawesome/free-solid-svg-icons/faBookmark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { bookmarkStorage } from '../lib/bookmark'
import { toastActions, ToastSeverity } from '../lib/slices/toast'
import { Button } from './Button'

interface BookmarkButtonProps {
  articleId: string
}

export default function BookmarkButton({ articleId }: BookmarkButtonProps) {
  const dispatch = useDispatch()
  const [isSaved, setIsSaved] = useState(false)

  // Read from localStorage after the component is mounted
  // to prevent SSR error
  useEffect(() => {
    setIsSaved(bookmarkStorage.articleExist(bookmarkStorage.read(), articleId))
  }, [articleId])

  return (
    <Button
      onClick={(event) => {
        event.preventDefault()
        if (isSaved) {
          setIsSaved(false)
          bookmarkStorage.removeArticle(articleId)
          dispatch(
            toastActions.show({
              severity: ToastSeverity.error,
              icon: faBookmarkOff,
              message: 'REMOVED FROM BOOKMARKS',
            })
          )
        } else {
          setIsSaved(true)
          bookmarkStorage.saveArticle(articleId)
          dispatch(
            toastActions.show({
              severity: ToastSeverity.success,
              icon: faBookmarkOn,
              message: 'SAVED TO BOOKMARKS',
            })
          )
        }
      }}
    >
      {isSaved ? (
        <>
          <FontAwesomeIcon className="icon" icon={faBookmarkOff} />
          REMOVE BOOKMARK
        </>
      ) : (
        <>
          <FontAwesomeIcon className="icon" icon={faBookmarkOn} />
          ADD BOOKMARK
        </>
      )}
    </Button>
  )
}
