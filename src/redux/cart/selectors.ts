import { RootState } from '../store';
import { CartItem } from './types';

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItem) => obj.id === id);
