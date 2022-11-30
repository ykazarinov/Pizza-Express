import { CartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  const result = Number(
    items.reduce((sum: number, obj: CartItem) => obj.price * obj.count + sum, 0).toFixed(2),
  );

  return result;
};
