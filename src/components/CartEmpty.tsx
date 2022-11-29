import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/images/empty-cart.png';

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Empty cart <span>😕</span>
      </h2>
      <p>
        You probably haven't ordered pizza yet.
        <br />
        To order pizza, go to the main page.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Come back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
