import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
  const { search, direction, currentPage, categoryId, sortType } = params;
  const { data } = await axios.get(
    `https://63692f3815219b849611dc7a.mockapi.io/items?page=${currentPage}&limit=4&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortType.sort}${direction}${search}`,
  );

  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading, success, error
  test: '',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    test: (state) => {
      state.test = 1;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
