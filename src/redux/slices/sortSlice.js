import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortType: {
    name: 'популярности',
    sort: 'rating',
  },
  isVisiblePopup: false,
  isDescending: true,
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    onChooseSort: (state, action) => {
      state.sortType = action.payload;
    },
    setIsVisiblePopup: (state, action) => {
      state.isVisiblePopup = action.payload;
    },
    setIsDescending: (state) => {
      state.isDescending = !state.isDescending;
    },
  },
});

export const selectIsVisiblePopup = (state) => state.sort.isVisiblePopup;
export const selectIsDescending = (state) => state.sort.isDescending;
export const selectSortType = (state) => state.sort.sortType;
export const { onChooseSort, setIsVisiblePopup, setIsDescending } = sortSlice.actions;

export default sortSlice.reducer;
