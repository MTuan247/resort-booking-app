import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';

const searchSlide = createSlice({
  name: 'search',
  initialState: {
    dateRange: {
      firstDate: moment().format('yyyy-MM-DD'),
      secondDate: moment().add(1, 'days').format('yyyy-MM-DD')
    },
    location: '',
    numberOfPeople: 2,
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