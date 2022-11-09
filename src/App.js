import './scss/app.scss';
import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import Pizzablock from './components/Pizzablock';

// import pizzas from './assets/data/pizza.json';

function App() {
  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    fetch('https://63692f3815219b849611dc7a.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        // console.log(json);
        setPizzas(json);
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
            {pizzas && pizzas.map((obj) => <Pizzablock key={obj.id} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
