import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

import { SortType } from './sortSlice';

export type FetchPizzasArgs = {
  search: string;
  direction: string;
  currentPage: number;
  categoryId: number;
  sortType: SortType;
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const { search, direction, currentPage, categoryId, sortType } = params;

    const url = 'https://63692f3815219b849611dc7a.mockapi.io/items';
    const page = `?page=${currentPage}`;
    const limit = `&limit=4`;
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = `&sortBy=${sortType.sortProperty}`;
    const order = direction ? direction : '';
    const searchValue = search ? `&search=${search}` : '';

    const { data } = await axios.get(
      `${url}${page}${limit}${category}${sortBy}${order}${searchValue}`,
    );

    return data;
  },
);

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

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading, success, error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
