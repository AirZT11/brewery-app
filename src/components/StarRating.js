import React, { useState, useEffect } from "react";
import useToggle from "../hooks/useToggle";

import { connect } from "react-redux";
import { postRating } from "../actions/ratingActions";
import { setPromptView } from "../actions/userActions";

import Stars from "react-star-ratings";
import Popup from "reactjs-popup";

import Reviews from "./Reviews";
import Login from "./Login";
import SignUpContainer from "./containers/SignUpContainer";

import "../css/Modal.css";
import "../css/Rating.css";
import "reactjs-popup/dist/index.css";

const StarRating = ({
  breweryId,
  breweryName,
  currentUser,
  postRating,
  breweryRatings,
  promptView,
  setPromptView,
  getBreweryRatings,
  setBreweryRatings,
}) => {
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [submitDisplay, setSubmitDisplay] = useState(false);
  const [review, setReview] = useState("");
  const [loginView, setLoginView] = useState(false);
  const [modalView, toggleModalView] = useToggle();

  useEffect(() => {
    averageRatings();
  }, [breweryRatings]);

  // calculates the average rating for brewery
  // Move this into lib file - MAYBE
  const averageRatings = () => {
    const ratingValues = breweryRatings.map((rating) => {
      return rating.rating;
    });
    if (breweryRatings.length > 0) {
      const reducer = (acc, currentVal) => acc + currentVal;
      const average = ratingValues.reduce(reducer) / breweryRatings.length;
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
      // setPromptView("LOGGED_IN", true);
    }
  };

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const handleCancel = (e) => {
    // e.preventDefault();
    setSubmitDisplay(false);
    setRating(averageRating);
    setReview("");
  };

  // SUBMITS A REVIEW TO THE BACKEND
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const state = {
      rating: rating,
      userId: currentUser.user.id,
      breweryId: breweryId,
      breweryName: breweryName,
      review: review,
    };
    postRating(state);
    setSubmitDisplay(false);
    setReview("");
    getBreweryRatings(breweryId, setBreweryRatings);
  };

  return (
    <>
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

      {/* POPUP IF NOT LOGGED IN */}
      <Popup
        open={loginView}
        modal
        nested
        onClose={() => {
          setLoginView(false);
          setPromptView(false);
          toggleModalView(false);
        }}
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header">
              Please Login or Create New Account to Review
            </div>

            {modalView ? (
              <SignUpContainer />
            ) : (
              <Login setPromptView={setPromptView} />
            )}

            <button className="toggle-modal" onClick={toggleModalView}>
              {modalView ? "Login" : "Create New Account"}
            </button>
          </div>
        )}
      </Popup>

      <span className="average-rating"> {averageRating} Stars</span>

      <br />

      <Popup
        trigger={
          <button className="button">{breweryRatings.length} Reviews</button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
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
              <p>{breweryRatings.length} Reviews</p>
            </div>
            <br />
            {breweryRatings.map((review) => {
              return <Reviews key={review.id} review={review} />;
            })}
          </div>
        )}
      </Popup>

      <Popup open={submitDisplay}>
        <div className="modal">
          <form onSubmit={handleReviewSubmit} className="modal-content">
            {/* <div> */}
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
            <p>{breweryRatings.length} Reviews</p>
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
            {/* </div> */}
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
  allRatings: state.ratingData.ratings,
  promptView: state.ratingData.promptView,
});

export default connect(mapStateToProps, { postRating, setPromptView })(
  StarRating
);
