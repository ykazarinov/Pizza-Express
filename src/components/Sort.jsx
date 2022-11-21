import React from 'react';
import {
  onChooseSort,
  setIsVisiblePopup,
  setIsDescending,
  selectSortType,
  selectIsDescending,
  selectIsVisiblePopup,
} from '../redux/slices/sortSlice';
import { useSelector, useDispatch } from 'react-redux';

export const sortValues = [
  { name: 'популярности', sort: 'rating' },
  { name: 'цене', sort: 'price' },
  { name: 'алфавиту', sort: 'title' },
];

export default function Sort() {
  const sortType = useSelector(selectSortType);
  const dispatch = useDispatch();

  const sortRef = React.useRef();

  const isVisiblePopup = useSelector(selectIsVisiblePopup);
  const isDescending = useSelector(selectIsDescending);

  const sortClick = (el) => {
    dispatch(onChooseSort(el));
    dispatch(setIsVisiblePopup(false));
  };

  React.useEffect(() => {
    const hendleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        dispatch(setIsVisiblePopup(false));
      }
    };

    document.body.addEventListener('click', hendleClickOutside);

    // unmount
    return () => {
      // delete eventListener
      document.body.removeEventListener('click', hendleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div className="sort__direction" onClick={() => dispatch(setIsDescending())}>
          <svg
            className={isDescending ? '' : 'ascending'}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => dispatch(setIsVisiblePopup(!isVisiblePopup))}>{sortType.name}</span>
      </div>
      {isVisiblePopup && (
        <div className="sort__popup">
          <ul>
            {sortValues.map((el, i) => (
              <li
                className={sortType.sort === el.sort ? 'active' : ''}
                onClick={() => sortClick(el)}
                key={i}>
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
