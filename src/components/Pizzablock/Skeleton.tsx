import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzablockSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={0}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="135" cy="125" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="18" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="430" rx="10" ry="10" width="90" height="25" />
    <rect x="120" y="420" rx="22" ry="22" width="160" height="45" />
  </ContentLoader>
);

export default PizzablockSkeleton;
