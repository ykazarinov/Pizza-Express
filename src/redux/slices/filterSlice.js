import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = Number(action.payload);
    },
  },
});

export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
