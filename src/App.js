import './scss/app.scss';
import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import Pizzablock from './components/Pizzablock';
import Skeleton from './components/Pizzablock/Skeleton';

// import pizzas from './assets/data/pizza.json';

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://63692f3815219b849611dc7a.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
              : pizzas && pizzas.map((obj) => <Pizzablock key={obj.id} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
