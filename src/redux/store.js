import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import sortReducer from './slices/sortSlice';
import searchReducer from './slices/searchSlice';
import paginationReducer from './slices/paginationSlice';
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
    search: searchReducer,
    pagination: paginationReducer,
  },
});
