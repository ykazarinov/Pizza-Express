import { RootState } from '../store';
export const selectActualLang = (state: RootState) => state.lang.actualLang;
