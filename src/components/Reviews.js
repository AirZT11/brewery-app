import React from "react";
import Popup from "reactjs-popup";

const Reviews = ({ review: { user, review, rating } }) => {
  return (
    <div className="content">
      <p>
        <strong>{user.name}</strong>
      </p>
      <p>{rating} stars</p>
      <p>{review}</p>
    </div>
  );
};

export default Reviews;
