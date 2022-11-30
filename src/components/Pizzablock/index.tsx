import { Link } from 'react-router-dom';
import { Pizza } from '../../redux/pizza/types';
import AddCartButton from '../AddButton';
import options from '../../assets/data/options.json';
import React from 'react';

const Pizzablock: React.FC<Pizza> = ({ id, title, price, imageUrl, sizes, types }) => {
  const [actualType, setActualType] = React.useState(0);
  const [actualSize, setActualSize] = React.useState(0);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <Link to={`pizza/${id}`}>
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types &&
              types.map((i) => (
                <li
                  key={i}
                  onClick={() => {
                    setActualType(i);
                  }}
                  className={actualType === i ? 'active' : ''}>
                  {options.typesNames[i]}
                </li>
              ))}
          </ul>
          <ul>
            {sizes &&
              sizes.map((el, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setActualSize(i);
                  }}
                  className={actualSize === i ? 'active' : ''}>
                  {el} cm.
                </li>
              ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">
            Price: $
            {Number(
              (price * options.marginTypes[actualType] * options.marginSizes[actualSize]).toFixed(
                2,
              ),
            )}
          </div>
          <AddCartButton
            id={id}
            title={title}
            price={price}
            imageUrl={imageUrl}
            sizes={sizes}
            types={types}
            // {...{ id, title, price, imageUrl, sizes, types }}
            actualType={actualType}
            actualSize={actualSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Pizzablock;
