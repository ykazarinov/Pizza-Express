import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationSliceState } from './types';

const initialState: PaginationSliceState = {
  currentPage: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = Number(action.payload);
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
