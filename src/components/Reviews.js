import React from 'react';

const Reviews = ({review: {user, review, rating}}) => {
  // console.log(review)
  return (
    <div>
      <p><strong>{user.name}</strong> gave {rating} stars</p>
      <p>{review}</p>
    </div>
  )
}

export default Reviews;