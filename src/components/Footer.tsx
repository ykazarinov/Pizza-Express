import React from 'react';
import Lang from './Lang';

const Footer: React.FC = () => {
  return (
    <footer className="container">
      <div className="footer__col">1</div>
      <div className="footer__col">2</div>
      <div className="footer__col">
        <Lang />
      </div>
    </footer>
  );
};

export default Footer;
