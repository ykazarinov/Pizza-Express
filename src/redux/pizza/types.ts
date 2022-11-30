import { IndexType } from 'typescript';
import { SortType } from '../sort/types';

export type FetchPizzasArgs = {
  search: string;
  direction: string;
  currentPage: number;
  categoryId: number;
  sortType: SortType;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
