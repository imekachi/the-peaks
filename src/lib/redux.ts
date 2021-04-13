import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from '@reduxjs/toolkit'
import articleSearchReducer from './slices/articleSearch'
import toastReducer from './slices/toast'

const rootReducers = combineReducers({
  toast: toastReducer,
  articleSearch: articleSearchReducer,
})

export type ReduxRootState = ReturnType<typeof rootReducers>
export type ReduxStore = EnhancedStore<ReduxRootState>

export const reduxStore = configureStore({
  reducer: rootReducers,
})
