import { RootState } from '../store';
export const selectActualLang = (state: RootState) => state.lang.actualLang;
export const selectIsVisibleLangPopup = (state: RootState) => state.lang.isVisibleLangPopup;
export const selectActualCurrency = (state: RootState) => state.lang.actualCurrency;
export const selectIsVisibleCurrencyPopup = (state: RootState) => state.lang.isVisibleCurrencyPopup;
