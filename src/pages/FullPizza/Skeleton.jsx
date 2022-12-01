import React from 'react';
import ContentLoader from 'react-content-loader';

const FullPizzaSkeleton = (props) => (
  <ContentLoader
    speed={0}
    width={1200}
    height={466}
    viewBox="0 0 1200 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="320" cy="210" r="210" />
    <rect x="563" y="0" rx="0" ry="0" width="450" height="23" />
    <rect x="563" y="43" rx="0" ry="0" width="400" height="20" />
    <rect x="563" y="84" rx="0" ry="0" width="300" height="20" />
    <rect x="563" y="122" rx="0" ry="0" width="500" height="90" />
  </ContentLoader>
);

export default FullPizzaSkeleton;
