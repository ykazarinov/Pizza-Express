import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter/slice';
import sortReducer from './sort/slice';
import searchReducer from './search/slice';
import paginationReducer from './pagination/slice';
import cartReducer from './cart/slice';
import pizzaReducer from './pizza/slice';
import { useDispatch } from 'react-redux';
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
