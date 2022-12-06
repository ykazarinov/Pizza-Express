import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LangSliceState, LangEnum, CurrencyEnum } from './types';

const initialState: LangSliceState = {
  actualLang: LangEnum.ENG,
  isVisibleLangPopup: false,
  actualCurrency: CurrencyEnum.USD,
  isVisibleCurrencyPopup: false,
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
    onChooseCurrency: (state, action: PayloadAction<CurrencyEnum>) => {
      state.actualCurrency = action.payload;
    },
    setIsVisibleCurrencyPopup: (state, action: PayloadAction<boolean>) => {
      state.isVisibleCurrencyPopup = action.payload;
    },
  },
});

export const { onChooseLang, setIsVisibleLangPopup, onChooseCurrency, setIsVisibleCurrencyPopup } =
  langSlice.actions;

export default langSlice.reducer;
