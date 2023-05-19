import { createSlice } from '@reduxjs/toolkit'

const searchSlide = createSlice({
  name: 'search',
  initialState: {
    dateRange: null,
    location: '',
    numberOfPeople: null
  },
  reducers: {
    saveSearch: (state, action) => {
      state = action.payload
    }
  }
});

export const { saveSearch } = searchSlide.actions

export default searchSlide.reducer