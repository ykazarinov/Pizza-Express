import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterSliceState {
  categoryId: number;
}

const initialState: FilterSliceState = {
  categoryId: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = Number(action.payload);
    },
  },
});

export const selectFilterCategoryId = (state: RootState) => state.filter.categoryId;
export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
