import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from '@reduxjs/toolkit'
import toastReducer from './slices/toast'

const rootReducers = combineReducers({
  toast: toastReducer,
})

export type ReduxRootState = ReturnType<typeof rootReducers>
export type ReduxStore = EnhancedStore<ReduxRootState>

export const reduxStore = configureStore({
  reducer: rootReducers,
})
