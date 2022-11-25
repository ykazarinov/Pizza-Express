import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

type PizzaOptions = {
  id: string;
  size: number;
  type: string;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,

  items: [],
};

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
      state.totalPrice = state.items.reduce((sum: number, obj: CartItem) => {
        return obj.price * obj.count + sum;
      }, 0);
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItem) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
