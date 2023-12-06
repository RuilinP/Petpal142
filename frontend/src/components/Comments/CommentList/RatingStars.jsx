import React from 'react';

const RatingStars = ({ rating }) => {
  // Create an array of stars based on the rating
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <i 
      key={`star-${i}`} // Add a unique key prop here
      className={`fa fa-star ${i < rating ? 'rating-color' : ''}`}></i>
    );
  }

  return <div className="d-flex align-items-center">{stars}</div>;
};

export default RatingStars;
