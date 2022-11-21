import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import sortReducer from './slices/sortSlice';
import searchReducer from './slices/searchSlice';
import paginationReducer from './slices/paginationSlice';
import cartReducer from './slices/cartSlice';
import pizzaReducer from './slices/pizzaSlice';
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
    search: searchReducer,
    pagination: paginationReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});
