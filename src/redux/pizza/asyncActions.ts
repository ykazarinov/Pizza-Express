import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasArgs, Pizza } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const { search, direction, currentPage, categoryId, sortType } = params;

    const url = process.env.MOCKAPI_URL;
    const page = `?page=${currentPage}`;
    const limit = `&limit=4`;
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sortType.sortProperty ? `&sortBy=${sortType.sortProperty}` : '';
    const order = direction ? direction : '';
    const searchValue = search ? `&search=${search}` : '';

    const { data } = await axios.get(
      `${url}${page}${limit}${category}${sortBy}${order}${searchValue}`,
    );

    return data;
  },
);
