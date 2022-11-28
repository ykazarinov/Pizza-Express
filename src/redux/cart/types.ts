export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export type PizzaOptions = {
  id: string;
  size: number;
  type: string;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
