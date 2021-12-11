import React from "react";
import Stars from "react-star-ratings";

const Reviews = ({ review: { user, review, rating, created_at } }) => {
  const dateFormat = new Date(created_at).toDateString();

  return (
    <div className="reviews">
      <p>{user.name}</p>
      <p className="review-date">Posted on: {dateFormat}</p>
      <span className="stars">
        <Stars
          rating={rating}
          starRatedColor="orange"
          numberOfStars={5}
          starEmptyColor="grey"
          starHoverColor="orange"
          starDimension="22px"
          starSpacing="2px"
        />
      </span>
      <span> {rating} stars</span>
      <p>{review}</p>
      <br />
    </div>
  );
};

export default Reviews;
