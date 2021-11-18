import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { postRating } from "../actions/ratingActions";

import Stars from "react-star-ratings";
import Popup from "reactjs-popup";

import Reviews from "./Reviews";
import LoginSignUpContainer from "./containers/LoginSignUpContainer";

import "../css/Modal.css";
import "../css/Rating.css";
import "reactjs-popup/dist/index.css";

const StarRating = ({
  breweryId,
  breweryName,
  currentUser,
  postRating,
  breweryRatings,
}) => {
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [submitDisplay, setSubmitDisplay] = useState(false);
  const [review, setReview] = useState("");
  const [loginView, setLoginView] = useState(false);

  useEffect(() => {
    averageRatings(breweryRatings);
  }, [breweryRatings]);

  // calculates the average rating for brewery
  // Move this into lib file - MAYBE
  const averageRatings = (userRatings) => {
    const ratingValues = userRatings.map((rating) => {
      return rating.rating;
    });
    if (userRatings.length > 0) {
      const reducer = (acc, currentVal) => acc + currentVal;
      const average = ratingValues.reduce(reducer) / userRatings.length;
      const formattedAverage = Number(average.toFixed(1));
      setAverageRating(formattedAverage);
      setRating(formattedAverage);
    } else {
      setAverageRating(0);
      setRating(0);
    }
  };

  // if currentUser exists, setRating to value of the clicked star and display review form
  const handleClick = (ratingVal) => {
    if (currentUser) {
      setRating(ratingVal);
      setSubmitDisplay(true);
    } else {
      setLoginView(true);
    }
  };

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const handleCancel = (e) => {
    setSubmitDisplay(false);
    setRating(averageRating);
    setReview("");
  };

  // SUBMITS A REVIEW TO THE BACKEND
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const state = {
      rating: rating,
      userId: currentUser.id,
      breweryId: breweryId,
      breweryName: breweryName,
      review: review,
    };
    postRating(state);
    setSubmitDisplay(false);
    setReview("");
  };

  const isReviewPlural = breweryRatings.length === 1 ? "Review" : "Reviews";

  return (
    <>
      <label className="stars">
        <Stars
          rating={rating}
          starRatedColor="orange"
          changeRating={handleClick}
          numberOfStars={5}
          starEmptyColor="grey"
          starHoverColor="orange"
          starDimension="22px"
          starSpacing="2px"
          // typeOfWidget="Rate"
        />
      </label>

      {/* POPUP IF NOT LOGGED IN */}
      <LoginSignUpContainer
        setLoginView={setLoginView}
        loginView={loginView}
        popUpPrompt={"Please login or create account to review"}
      />

      <label className="average-rating"> {averageRating} Star Rating</label>

      <br />

      {/* POPUP DISPLAYING USER REVIEWS */}
      <Popup
        trigger={
          <button className="second-btn-style" title="Show Reviews">
            {breweryRatings.length} {isReviewPlural}
          </button>
        }
        modal
        nested
      >
        <div className="modal">
          <div className="header">
            <p className="brew-name-lrg">{breweryName}</p>
            <span className="stars">
              <Stars
                rating={rating}
                starRatedColor="orange"
                changeRating={handleClick}
                numberOfStars={5}
                starEmptyColor="grey"
                starHoverColor="orange"
                starDimension="22px"
                starSpacing="2px"
              />
            </span>
            <span className="average-rating"> {averageRating} Stars</span>
            <p>
              {breweryRatings.length} {isReviewPlural}
            </p>
          </div>
          <br />
          {breweryRatings.map((review) => {
            return <Reviews key={review.id} review={review} />;
          })}
        </div>
      </Popup>

      {/* POPUP TO RATE BREWERY */}
      <Popup open={submitDisplay} onClose={handleCancel}>
        <div className="modal">
          <form onSubmit={handleReviewSubmit} className="modal-content">
            <h1 className="title">{breweryName}</h1>
            <span className="stars">
              <Stars
                rating={rating}
                starRatedColor="orange"
                changeRating={handleClick}
                numberOfStars={5}
                starEmptyColor="grey"
                starHoverColor="orange"
                starDimension="22px"
                starSpacing="2px"
              />
            </span>
            <span> {averageRating} Stars</span>
            <p>
              {breweryRatings.length}{" "}
              {breweryRatings.length === 1 ? "Review" : "Reviews"}
            </p>
            <textarea
              className="text-box"
              type="text"
              name="review"
              onChange={handleChange}
              value={review}
              placeholder="Submit a review..."
            ></textarea>
            <br />
            <button className="main-btn-style" onClick={handleCancel}>
              Cancel
            </button>
            <input className="main-btn-style" type="submit"></input>
          </form>
          <h1 className="title-sm">User Reviews</h1>
          {breweryRatings.map((review) => {
            return <Reviews key={review.id} review={review} />;
          })}
        </div>
      </Popup>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.userData.currentUser,
  ratingsFromStore: state.ratingData.ratings,
});

export default connect(mapStateToProps, { postRating })(StarRating);
