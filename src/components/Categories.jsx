import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterCategoryId, setCategoryId } from '../redux/slices/filterSlice';

export default function Categories() {
  const categoryId = useSelector(selectFilterCategoryId);
  const dispatch = useDispatch();

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => dispatch(setCategoryId(i))}
            className={categoryId === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
