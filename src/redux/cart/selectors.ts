import { RootState } from '../store';
import { CartItem } from './types';

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  // state.cart.items.find((obj: CartItem) => obj.id === id);
  state.cart.items.filter((obj: CartItem) => obj.id === id);

// items.reduce((sum: number, obj: CartItem) => obj.price * obj.count + sum, 0).toFixed(2),
