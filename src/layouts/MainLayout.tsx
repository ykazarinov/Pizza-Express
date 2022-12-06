import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { selectActualLang } from '../redux/lang/selectors';

import { LangEnum } from '../redux/lang/types';
import { Helmet } from 'react-helmet';

const MainLayout: React.FC = () => {
  const actualLang = useSelector(selectActualLang);
  const navigate = useNavigate();
  const { lang } = useParams();

  React.useEffect(() => {
    if (!lang) {
      navigate(`/${actualLang}`);
    } else if (lang !== LangEnum.ENG && lang !== LangEnum.FR) {
      navigate(`/${actualLang}/${lang}`);
    }
  }, []);

  return (
    <>
      <div className="wrapper">
        <Helmet>
          {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Helmet>
        <Header />

        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
