import { TitleTranscription } from '../pizza/types';

export type CartItem = {
  id: string;
  title: TitleTranscription[];
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

export type PizzaOptions = {
  id: string;
  size: number;
  type: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
