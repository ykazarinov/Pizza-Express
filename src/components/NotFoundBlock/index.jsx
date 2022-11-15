import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Rien n'a été trouvé :
      </h1>
      <p className={styles.description}>
        Malheureusement, cette page n'a pas été trouvée sur notre site. Pour aller à la page
        principale, cliquez sur le lien suivant : <a href="/">Aller à la page principale</a>.
      </p>
    </div>
  );
};

export default NotFoundBlock;
