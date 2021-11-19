import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchCurrentUser } from "../actions/userActions";
import Stars from "react-star-ratings";

const Profile = ({ currentUser }) => {
  return (
    <>
      {currentUser && (
        <div className="profile-container">
          <h1>{currentUser.name}'s Profile</h1>

          <div className="user-reviews-list">
            <h2>Your Brewery Reviews</h2>
            {currentUser.ratings.map((review) => (
              <ul className="user-review" key={review.id}>
                <li>
                  <h3>{review.brewery_name}</h3>
                  <p className="review-date">
                    posted on {new Date(review.created_at).toDateString()}
                  </p>
                  <span className="stars">
                    <Stars
                      rating={review.rating}
                      starRatedColor="orange"
                      numberOfStars={5}
                      starEmptyColor="grey"
                      starHoverColor="orange"
                      starDimension="22px"
                      starSpacing="2px"
                    />
                  </span>
                  <span> {review.rating} stars</span>
                  <p className="review">{review.review}</p>
                </li>
              </ul>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.userData.currentUser,
});

export default connect(mapStateToProps, { fetchCurrentUser })(Profile);
