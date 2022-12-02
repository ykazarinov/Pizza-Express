import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddCartButton from '../../components/AddButton';
import options from '../../assets/data/options.json';
// import { categories } from '../../components/Categories';
import RatingBlock from '../../components/Rating';
import FullPizzaSkeleton from './Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { onChooseLang } from '../../redux/lang/slice';
import { LangEnum } from '../../redux/lang/types';
import { selectActualLang } from '../../redux/lang/selectors';
import getLangData from '../../utils/getLangData';

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
    rating: number;
  }>();
  const navagate = useNavigate();

  const [actualType, setActualType] = React.useState(0);
  const [actualSize, setActualSize] = React.useState(0);

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63692f3815219b849611dc7a.mockapi.io/items/' + id);
        setPizza(data);
        // setActualType(data.types[0]);
        // setActualSize(options.sizes.indexOf(data.sizes[0]));
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

  const dispatch = useDispatch();
  const { lang } = useParams();
  React.useEffect(() => {
    dispatch(onChooseLang(lang as LangEnum));
  }, []);
  const actualLang = useSelector(selectActualLang);
  const langData = getLangData(actualLang);
  const categories = langData?.inscription.categories;

  if (!pizza) {
    return (
      <div className="container">
        <div className="fullpizza">
          <FullPizzaSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="fullpizza">
        <div className="fullpizza__left">
          <img src={pizza.imageUrl} alt="Pizza" className="fullpizza__image" />
        </div>
        <div className="fullpizza__right">
          <h2>{pizza.title}</h2>
          <p>
            {langData?.inscription.fullPizzaPage.category}{' '}
            {categories && categories[pizza.category]}
          </p>
          <p>
            {langData?.inscription.fullPizzaPage.rating}
            <RatingBlock rating={pizza.rating} />
          </p>
          <div className="pizza-block__selector">
            <ul>
              {pizza.types &&
                pizza.types.map((i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setActualType(i);
                    }}
                    className={actualType === i ? 'active' : ''}>
                    {langData?.inscription.typesNames[i]}
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
                    {el} {langData?.inscription.pizzaBlock.cm}
                  </li>
                ))}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">
              {langData?.inscription.pizzaBlock.price} $
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
              actualType={actualType}
              actualSize={actualSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
