import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';

import { CartItem, CartSliceState, PizzaOptions } from './types';

import options from '../../assets/data/options.json';

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
        if (findItem?.count === 1) {
          if (window.confirm('Are you sure you want to remove?')) {
            state.items = state.items.filter(
              (obj: PizzaOptions) =>
                obj.id !== action.payload.id ||
                obj.size !== action.payload.size ||
                obj.type !== action.payload.type,
            );
            findItem.count--;
            state.totalPrice = Number(
              (
                state.totalPrice -
                findItem.price *
                  options.marginSizes[options.sizes.indexOf(findItem.size)] *
                  options.marginTypes[options.typesNames.indexOf(findItem.type)]
              ).toFixed(2),
            );
          }
        } else {
          findItem.count--;
          state.totalPrice = Number(
            (
              state.totalPrice -
              findItem.price *
                options.marginSizes[options.sizes.indexOf(findItem.size)] *
                options.marginTypes[options.typesNames.indexOf(findItem.type)]
            ).toFixed(2),
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

      state.totalPrice = Number(
        remainingItems
          .reduce((sum: number, item: CartItem) => {
            return (
              item.price *
                options.marginSizes[options.sizes.indexOf(item.size)] *
                options.marginTypes[options.typesNames.indexOf(item.type)] *
                item.count +
              sum
            );
          }, 0)
          .toFixed(2),
      );
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
