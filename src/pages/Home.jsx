import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizzablock from '../components/Pizzablock';
import Skeleton from '../components/Pizzablock/Skeleton';

export default function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://63692f3815219b849611dc7a.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sort}&order=desc`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => {
            setCategoryId(id);
          }}
        />
        <Sort
          sortValue={sortType}
          onChooseSort={(id) => {
            setSortType(id);
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, i) => <Skeleton key={i} />)
          : pizzas && pizzas.map((obj) => <Pizzablock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}
