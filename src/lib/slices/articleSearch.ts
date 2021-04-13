import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ArticleSearchReduxState {
  searchQuery: string
  searchBoxExpand: boolean
}

const initialState: ArticleSearchReduxState = {
  searchQuery: '',
  searchBoxExpand: false,
}

const articleSearchSlice = createSlice({
  name: 'articleSearch',
  initialState,
  reducers: {
    update: (
      state,
      action: PayloadAction<Partial<ArticleSearchReduxState>>
    ) => ({
      searchQuery: action.payload.searchQuery ?? state.searchQuery,
      searchBoxExpand: action.payload.searchBoxExpand ?? state.searchBoxExpand,
    }),
    reset: () => initialState,
  },
})

export const articleSearchActions = articleSearchSlice.actions
export default articleSearchSlice.reducer
