import React from "react";
import Popup from "reactjs-popup";
import Stars from "react-star-ratings";

const Reviews = ({ review: { user, review, rating } }) => {
  return (
    <div className="reviews">
      <p>
        <strong>{user.name}</strong>
      </p>
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
