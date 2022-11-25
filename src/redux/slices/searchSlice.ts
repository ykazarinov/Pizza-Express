import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SearchSliceState {
  searchValue: string;
}

const initialState: SearchSliceState = {
  searchValue: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const selectSearchValue = (state: RootState) => state.search.searchValue;
export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
