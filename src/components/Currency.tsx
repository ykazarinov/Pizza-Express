import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActualCurrency,
  selectActualLang,
  selectIsVisibleCurrencyPopup,
} from '../redux/lang/selectors';
import langData from '../assets/data/interface.json';
import { CurrencyEnum } from '../redux/lang/types';
import {
  onChooseCurrency,
  setIsVisibleCurrencyPopup,
  setIsVisibleLangPopup,
} from '../redux/lang/slice';

const Currency: React.FC = React.memo(() => {
  const actualLang = useSelector(selectActualLang);
  const actualCurrency = useSelector(selectActualCurrency);
  const dispatch = useDispatch();

  const currencyRef = React.useRef<HTMLDivElement>(null);

  const isVisibleCurrencyPopup = useSelector(selectIsVisibleCurrencyPopup);

  const currencyClick = (el: CurrencyEnum) => {
    dispatch(onChooseCurrency(el));
    dispatch(setIsVisibleCurrencyPopup(false));
  };

  React.useEffect(() => {
    const hendleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !event.composedPath().includes(currencyRef.current)) {
        dispatch(setIsVisibleCurrencyPopup(false));
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
    <div ref={currencyRef} className="currency">
      <div className="currency__label">
        <b>{langData.find((el) => el.lang === actualLang)?.inscription.footer.currency}</b>
        <span
          onClick={() =>
            dispatch(setIsVisibleCurrencyPopup(isVisibleCurrencyPopup ? false : true))
          }>
          {
            langData
              .find((el) => el.lang === actualLang)
              ?.inscription.footer.currencyList.find((cur) => cur.abbr === actualCurrency)?.name
          }
        </span>
      </div>
      {isVisibleCurrencyPopup && (
        <div className="currency__popup">
          <ul>
            {langData
              .find((el) => el.lang === actualLang)
              ?.inscription.footer.currencyList.map((cur, j) => (
                <li
                  className={actualCurrency === cur.abbr ? 'active' : ''}
                  onClick={() => currencyClick(cur.abbr as CurrencyEnum)}
                  key={`cur${j}`}>
                  {cur.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Currency;
