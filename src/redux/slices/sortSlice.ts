import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface SortSliceState {
  sortType: SortType;
  isVisiblePopup: boolean;
  isDescending: boolean;
}

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

export const selectIsVisiblePopup = (state: RootState) => state.sort.isVisiblePopup;
export const selectIsDescending = (state: RootState) => state.sort.isDescending;
export const selectSortType = (state: RootState) => state.sort.sortType;

export const { onChooseSort, setIsVisiblePopup, setIsDescending, setOrder } = sortSlice.actions;

export default sortSlice.reducer;
