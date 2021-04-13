import { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ReduxRootState } from '../lib/redux'
import { toastActions } from '../lib/slices/toast'
import Toast from './Toast'

/**
 * Handles toast queue and display toasts globally via redux
 *
 * NOTE: There is limitation of Toast content when using redux,
 * We can't send React Node(non-serializable data) into redux (well, we technically can, but it's not recommended)
 * and display it in toast.
 * That's why we have to use FontAwesome to send icon to the Toast form anywhere,
 * because fontAwesomeIcon is just an object which is serializable.
 * And this is why when using Toast globally, we allow only string or number
 */
export default function GlobalToast() {
  const { isShow, queue } = useSelector(
    (state: ReduxRootState) => state.toast,
    shallowEqual
  )
  const dispatch = useDispatch()

  const toastProps = queue[0]
  const hasNextToast = queue.length > 1

  // Auto close prev when there is next toast.
  useEffect(() => {
    if (isShow && hasNextToast) {
      dispatch(toastActions.hide())
    }
  }, [dispatch, hasNextToast, isShow])

  return (
    <Toast
      {...toastProps}
      isShow={isShow && !!toastProps}
      onHide={() => {
        dispatch(toastActions.hide())
      }}
      // when the toast left the screen,
      // if there is nextSnackbar, then call it, if not reset everything
      onDestroy={() =>
        dispatch(hasNextToast ? toastActions.next() : toastActions.reset())
      }
    />
  )
}
