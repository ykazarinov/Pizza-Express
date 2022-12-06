import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LangSliceState, LangEnum } from './types';

const initialState: LangSliceState = {
  actualLang: LangEnum.ENG,
  isVisibleLangPopup: false,
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    onChooseLang: (state, action: PayloadAction<LangEnum>) => {
      state.actualLang = action.payload;
    },
    setIsVisibleLangPopup: (state, action: PayloadAction<boolean>) => {
      state.isVisibleLangPopup = action.payload;
    },
  },
});

export const { onChooseLang, setIsVisibleLangPopup } = langSlice.actions;

export default langSlice.reducer;
