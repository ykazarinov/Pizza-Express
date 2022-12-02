import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LangSliceState, LangEnum } from './types';

const initialState: LangSliceState = {
  actualLang: LangEnum.ENG,
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    onChooseLang: (state, action: PayloadAction<LangEnum>) => {
      state.actualLang = action.payload;
    },
  },
});

export const { onChooseLang } = langSlice.actions;

export default langSlice.reducer;
