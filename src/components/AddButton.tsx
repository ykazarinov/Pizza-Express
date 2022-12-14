import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemById } from '../redux/cart/selectors';
import { addItem } from '../redux/cart/slice';
import { CartItem } from '../redux/cart/types';
import { Pizza, TitleTranscription } from '../redux/pizza/types';
import options from '../assets/data/options.json';
import { selectActualLang } from '../redux/lang/selectors';
import getLangData from '../utils/getLangData';

type activePizza = {
  id: string;
  title: TitleTranscription[];
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  actualType: number;
  actualSize: number;
};

const AddCartButton: React.FC<activePizza> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
  actualType,
  actualSize,
}) => {
  const dispatch = useDispatch();

  const actualLang = useSelector(selectActualLang);
  const langData = getLangData(actualLang);

  const cartItems = useSelector(selectCartItemById(id));
  const addedCount = cartItems
    ? cartItems.reduce((sum: number, obj: CartItem) => obj.count + sum, 0)
    : 0;
  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title: title,
      price: Number(
        (price * options.marginTypes[actualType] * options.marginSizes[actualSize]).toFixed(2),
      ),
      imageUrl,
      type: actualType,
      size: sizes[actualSize],
      count: 0,
    };
    dispatch(addItem(item));
  };
  return (
    <div onClick={onClickAdd} className="button button--outline button--add">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
          fill="white"
        />
      </svg>
      <span>{langData?.inscription.pizzaBlock.add}</span>
      {addedCount > 0 && <i>{addedCount}</i>}
    </div>
  );
};

export default AddCartButton;
