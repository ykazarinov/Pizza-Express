export type CartItem = {
  id: string;
  title: string;
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
