export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface SortSliceState {
  sortType: SortType;
  isVisiblePopup: boolean;
  isDescending: boolean;
}
