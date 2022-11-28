import { RootState } from '../store';
export const selectIsVisiblePopup = (state: RootState) => state.sort.isVisiblePopup;
export const selectIsDescending = (state: RootState) => state.sort.isDescending;
export const selectSortType = (state: RootState) => state.sort.sortType;
