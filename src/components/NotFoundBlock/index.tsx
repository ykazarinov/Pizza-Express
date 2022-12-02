import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectActualLang } from '../../redux/lang/selectors';
import getLangData from '../../utils/getLangData';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  const actualLang = useSelector(selectActualLang);
  const langData = getLangData(actualLang);
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        {langData?.inscription.page404.title}
      </h1>
      <p className={styles.description}>
        {langData?.inscription.page404.text}{' '}
        <Link to="/">{langData?.inscription.page404.linkText}</Link>.
      </p>
    </div>
  );
};

export default NotFoundBlock;
