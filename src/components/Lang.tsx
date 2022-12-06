import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActualLang, selectIsVisibleLangPopup } from '../redux/lang/selectors';
import lang from '../assets/data/interface.json';
import { LangEnum } from '../redux/lang/types';
import { onChooseLang, setIsVisibleLangPopup } from '../redux/lang/slice';

const Lang: React.FC = React.memo(() => {
  const actualLang = useSelector(selectActualLang);
  const dispatch = useDispatch();

  const langRef = React.useRef<HTMLDivElement>(null);

  const isVisibleLangPopup = useSelector(selectIsVisibleLangPopup);

  const langClick = (el: LangEnum) => {
    dispatch(onChooseLang(el));
    dispatch(setIsVisibleLangPopup(false));
  };

  React.useEffect(() => {
    const hendleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !event.composedPath().includes(langRef.current)) {
        dispatch(setIsVisibleLangPopup(false));
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
    <div ref={langRef} className="lang">
      <div className="lang__label">
        <b>Lang:</b>
        <span onClick={() => dispatch(setIsVisibleLangPopup(isVisibleLangPopup ? false : true))}>
          {lang.find((el) => el.lang === actualLang)?.langName}
        </span>
      </div>
      {isVisibleLangPopup && (
        <div className="lang__popup">
          <ul>
            {lang.map((el, i) => (
              <li
                className={actualLang === el.lang ? 'active' : ''}
                onClick={() => langClick(el.lang as LangEnum)}
                key={i}>
                {el.langName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Lang;
