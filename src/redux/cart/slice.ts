import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';

import { CartItem, CartSliceState, PizzaOptions } from './types';

const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      let findItem = state.items.find(
        (obj: CartItem) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<PizzaOptions>) {
      let findItem = state.items.find(
        (obj: PizzaOptions) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
      }
      // console.log(findItem);
      if (findItem?.count === 0) {
        if (window.confirm('Are you sure you want to remove?')) {
          state.items = state.items.filter(
            (obj: PizzaOptions) =>
              obj.id !== action.payload.id ||
              obj.size !== action.payload.size ||
              obj.type !== action.payload.type,
          );
        }
      }
    },

    removeItem: (state, action: PayloadAction<PizzaOptions>) => {
      let remainingItems = state.items.filter(
        (obj: PizzaOptions) =>
          obj.id !== action.payload.id ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type,
      );
      state.items = remainingItems;

      state.totalPrice = remainingItems.reduce((sum: number, item: CartItem) => {
        return item.price * item.count + sum;
      }, 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
