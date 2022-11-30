import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddCartButton from '../components/AddButton';
import options from '../assets/data/options.json';
import { categories } from '../components/Categories';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[];
    category: number;
  }>();
  const navagate = useNavigate();

  const [actualType, setActualType] = React.useState(0);
  const [actualSize, setActualSize] = React.useState(0);

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63692f3815219b849611dc7a.mockapi.io/items/' + id);
        setPizza(data);
        setActualType(data.types[0]);
        setActualSize(options.sizes.indexOf(data.sizes[0]));
      } catch (err) {
        console.log(err);
        alert(err);
        navagate('/');
      }
    }
    fetchPizza();
  }, []);

  if (pizza) {
    // setActualType(pizza.types[0]);
    // setActualSize(options.sizes.indexOf(pizza.sizes[0]));
  }

  if (!pizza) {
    return <>'Upload pizza...'</>;
  }
  return (
    <div className="container">
      <div className="fullpizza">
        <div className="fullpizza__left">
          <img src={pizza.imageUrl} alt="Pizza" className="fullpizza__image" />
        </div>
        <div className="fullpizza__right">
          <h2>{pizza.title}</h2>
          <p>Category: {categories[pizza.category]}</p>
          <div className="pizza-block__selector">
            <ul>
              {pizza.types &&
                pizza.types.map((i) => (
                  <li
                    key={i}
                    onClick={() => {
                      // options.marginTypes.indexOf(options.typesNames[i])
                      setActualType(i);
                    }}
                    className={actualType === i ? 'active' : ''}>
                    {options.typesNames[i]}
                  </li>
                ))}
            </ul>
            <ul>
              {pizza.sizes &&
                pizza.sizes.map((el, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setActualSize(options.sizes.indexOf(el));
                    }}
                    className={options.sizes[actualSize] === el ? 'active' : ''}>
                    {el} cm.
                  </li>
                ))}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">
              Price: $
              {Number(
                (
                  pizza.price *
                  options.marginTypes[actualType] *
                  options.marginSizes[actualSize]
                ).toFixed(2),
              )}
            </div>
            <AddCartButton
              id={pizza.id}
              title={pizza.title}
              price={pizza.price}
              imageUrl={pizza.imageUrl}
              sizes={pizza.sizes}
              types={pizza.types}
              // {...{ id, title, price, imageUrl, sizes, types }}
              actualType={0}
              actualSize={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
