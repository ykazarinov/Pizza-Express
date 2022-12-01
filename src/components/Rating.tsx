import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type ratingType = {
  rating: number;
};

const RatingBlock: React.FC<ratingType> = ({ rating }) => {
  return (
    <>
      {/* <FontAwesomeIcon icon={faStar} className="yellow" /> */}
      {[...Array(5)].map((el, i) =>
        i < rating ? (
          <FontAwesomeIcon key={i} icon={faStar} className="yellow" />
        ) : (
          <FontAwesomeIcon key={i} icon={faStar} />
        ),
      )}
    </>
  );
};

export default RatingBlock;
