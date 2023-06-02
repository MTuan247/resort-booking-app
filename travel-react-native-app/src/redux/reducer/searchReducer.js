import { createSlice } from '@reduxjs/toolkit'

const searchSlide = createSlice({
  name: 'search',
  initialState: {
    dateRange: null,
    location: '',
    numberOfPeople: null,
    showOnSearch: false
  },
  reducers: {
    saveSearch: (state, action) => {
      state.dateRange = action.payload.dateRange
      state.location = action.payload.location
      state.numberOfPeople = action.payload.numberOfPeople
    },
    toggleSearch: (state, action) => {
      state.showOnSearch = !state.showOnSearch;
    },
    setShowSearch: (state, action) => {
      state.showOnSearch = action.payload;
    },
  }
});

export const { saveSearch, toggleSearch, setShowSearch } = searchSlide.actions

export default searchSlide.reducer