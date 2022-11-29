import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterCategoryId } from '../redux/filter/selectors';
import { setCategoryId } from '../redux/filter/slice';

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

const Categories: React.FC = React.memo(() => {
  const categoryId = useSelector(selectFilterCategoryId);
  const dispatch = useDispatch();

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
});

export default Categories;
