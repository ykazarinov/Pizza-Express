import React from 'react';
import Lang from './Lang';
import langData from '../assets/data/interface.json';
import contactData from '../assets/data/contacts.json';
import { useSelector } from 'react-redux';
import { selectActualLang } from '../redux/lang/selectors';
import { Link } from 'react-router-dom';
import logo from '../assets/images/pizza-logo.svg';
import Currency from './Currency';

const Footer: React.FC = () => {
  const actualLang = useSelector(selectActualLang);
  const footerData = langData.find((el) => el.lang === actualLang)?.inscription.footer;
  const headerData = langData.find((el) => el.lang === actualLang)?.inscription.header;
  return (
    <footer className="container">
      <div className="footer__col">
        <Link to={`/${actualLang}`}>
          <div className="footer__logo">
            <img width="60" src={logo} alt="Pizza logo" />
            <div>
              <h1>{headerData?.sitename}</h1>
              <p>{headerData?.slogan}</p>
            </div>
          </div>
        </Link>
        <aside>
          <p>{footerData?.seoText}</p>
        </aside>
      </div>
      <div className="footer__col">
        <h3>{footerData?.contacts}</h3>
        <aside>
          <h4>{footerData?.address}</h4>
          <p>{contactData.address1}</p>
          <p>{contactData.address2}</p>
        </aside>
        <aside>
          <h4>{footerData?.phone}</h4>
          <p>{contactData.phone}</p>
        </aside>
        <aside>
          <h4>{footerData?.workingHours}</h4>
          <p>{contactData.workingHours1.find((el) => el.lang === actualLang)?.text}</p>
          <p>{contactData.workingHours2.find((el) => el.lang === actualLang)?.text}</p>
        </aside>
      </div>
      <div className="footer__col">
        <h3>{footerData?.siteSettings}</h3>
        <Lang />
        <Currency />
      </div>
      <div className="footer__col">
        <h3>{footerData?.usefulLinks}</h3>
        <ul>
          {footerData?.linksList?.map((el, i) =>
            i !== 3 ? (
              <li key={i}>
                <Link target={i === 3 ? '_blanc' : ''} to={el.link}>
                  {el.text}
                </Link>
              </li>
            ) : (
              <li key="3">
                <a rel="noreferrer" href={footerData?.linksList[3].link} target="_blank">
                  {footerData?.linksList[3].text}
                </a>
              </li>
            ),
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
