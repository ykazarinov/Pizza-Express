import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortPropertyEnum, SortSliceState, SortType } from './types';

const initialState: SortSliceState = {
  sortType: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING,
  },
  isVisiblePopup: false,
  isDescending: true,
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    onChooseSort: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setIsVisiblePopup: (state, action: PayloadAction<boolean>) => {
      state.isVisiblePopup = action.payload;
    },
    setIsDescending: (state) => {
      state.isDescending = !state.isDescending;
    },
    setOrder: (state, action) => {
      state.isDescending = action.payload;
    },
  },
});

export const { onChooseSort, setIsVisiblePopup, setIsDescending, setOrder } = sortSlice.actions;

export default sortSlice.reducer;
