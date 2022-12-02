import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/images/empty-cart.png';
import { selectActualLang } from '../redux/lang/selectors';
import getLangData from '../utils/getLangData';

const CartEmpty: React.FC = () => {
  const actualLang = useSelector(selectActualLang);
  const langData = getLangData(actualLang);
  return (
    <div className="cart cart--empty">
      <h2>
        {langData?.inscription.emptyCartPage.title} <span>😕</span>
      </h2>
      <p>
        {langData?.inscription.emptyCartPage.text1}
        <br />
        {langData?.inscription.emptyCartPage.text2}
        <Link to={'/'}>{langData?.inscription.emptyCartPage.linkText}</Link>
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>{langData?.inscription.emptyCartPage.comeBack} </span>
      </Link>
    </div>
  );
};

export default CartEmpty;
