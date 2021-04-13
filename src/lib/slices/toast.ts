import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ToastProps } from '../../components/Toast'

export enum ToastSeverity {
  success = 'success',
  error = 'error',
}

export interface GlobalToastProps
  extends Omit<ToastProps, 'isShow' | 'onHide'> {
  // Force message to be only string when used in Global
  // because the data should serializable, to send over redux store
  message: string | number
}

export interface GlobalToastReduxState {
  isShow: boolean
  queue: GlobalToastProps[]
}

const initialState = {
  isShow: false,
  queue: [],
} as GlobalToastReduxState

const toastSlice = createSlice({
  name: 'globalToast',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<GlobalToastProps>) => ({
      ...state,
      isShow: true,
      queue: [...state.queue, action.payload],
    }),
    hide: (state) => ({ ...state, isShow: false }),
    next: (state) => ({
      ...state,
      isShow: true,
      queue: state.queue.slice(1), // get new array with the first item removed
    }),
    reset: () => initialState,
  },
})

export const toastActions = toastSlice.actions
export default toastSlice.reducer
