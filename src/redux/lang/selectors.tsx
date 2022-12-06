import { RootState } from '../store';
export const selectActualLang = (state: RootState) => state.lang.actualLang;
export const selectIsVisibleLangPopup = (state: RootState) => state.lang.isVisibleLangPopup;
