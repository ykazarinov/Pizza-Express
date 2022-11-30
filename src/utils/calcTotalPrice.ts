import { CartItem } from '../redux/cart/types';
import options from '../assets/data/options.json';

export const calcTotalPrice = (items: CartItem[]) => {
  const result = Number(
    items
      .reduce(
        (sum: number, obj: CartItem) =>
          obj.price *
            options.marginSizes[options.sizes.indexOf(obj.size)] *
            options.marginTypes[options.typesNames.indexOf(obj.type)] *
            obj.count +
          sum,
        0,
      )
      .toFixed(2),
  );

  return result;
};
