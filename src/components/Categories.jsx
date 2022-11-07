import React from 'react';
export default function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li
            key={i}
            onClick={() => {
              setActiveIndex(i);
            }}
            className={activeIndex === i ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
