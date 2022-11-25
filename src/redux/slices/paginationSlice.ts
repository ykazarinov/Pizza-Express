import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PaginationSliceState {
  currentPage: number;
}

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

export const selectPaginationCurrentPage = (state: RootState) => state.pagination.currentPage;
export const { setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
