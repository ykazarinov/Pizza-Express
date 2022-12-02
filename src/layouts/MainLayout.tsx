import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { selectActualLang } from '../redux/lang/selectors';

import { LangEnum } from '../redux/lang/types';

const MainLayout: React.FC = () => {
  const actualLang = useSelector(selectActualLang);
  const navigate = useNavigate();
  const { lang } = useParams();

  React.useEffect(() => {
    console.log(actualLang);
    if (!lang) {
      navigate(`/${actualLang}`);
    } else if (lang !== LangEnum.ENG && lang !== LangEnum.FR) {
      navigate(`/${actualLang}/${lang}`);
    }
  }, []);

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
