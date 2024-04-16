import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchInput: { search: '' },
  },
  reducers: {
    searchText: (state, action) => {
      state.searchInput = { ...state.searchInput, ...action.payload };
    }
  }
})

export const { 
  searchText
} = searchSlice.actions;

export default searchSlice.reducer
