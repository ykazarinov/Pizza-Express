import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState } from './types';

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

export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
