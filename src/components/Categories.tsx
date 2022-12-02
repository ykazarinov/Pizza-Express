import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterCategoryId } from '../redux/filter/selectors';
import { setCategoryId } from '../redux/filter/slice';
import { selectActualLang } from '../redux/lang/selectors';
import getLangData from '../utils/getLangData';

const Categories: React.FC = React.memo(() => {
  const categoryId = useSelector(selectFilterCategoryId);
  const dispatch = useDispatch();

  const actualLang = useSelector(selectActualLang);
  const langData = getLangData(actualLang);

  const categories = langData?.inscription.categories;

  return (
    <div className="categories">
      <ul>
        {categories?.map((categoryName, i) => (
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
