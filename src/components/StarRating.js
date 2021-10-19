import React, { useState, useEffect } from "react";
import useToggle from "../hooks/useToggle";

import { connect } from "react-redux";
import { postRating } from "../actions/ratingActions";
import { setLoginView } from "../actions/userActions";

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
  // loginView,
  // setLoginView,
}) => {
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [submitDisplay, setSubmitDisplay] = useState("none");
  const [review, setReview] = useState("");
  const [loginView, setLoginView] = useState(false);
  const [modalView, toggleModalView] = useToggle();

  useEffect(() => {
    averageRatings();
  }, [breweryRatings]);

  // calculates the average rating for brewery
  // Move this into lib file
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
      setSubmitDisplay("block");
    } else {
      setLoginView(true);
    }
  };

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setSubmitDisplay("none");
    setRating(averageRating);
    setReview("");
  };

  // submits a rating to the backend database
  const handleSubmit = (e) => {
    e.preventDefault();
    const state = {
      rating: rating,
      userId: currentUser.user.id,
      breweryId: breweryId,
      breweryName: breweryName,
      review: review,
    };
    postRating(state);
    setSubmitDisplay("none");
    setReview("");
    // getBreweryRatings(breweryId, setBreweryRatings);
  };

  return (
    <div>
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
      <Popup
        open={loginView}
        modal
        nested
        onClose={() => {
          setLoginView(false);
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
              <Login setLoginView={setLoginView} />
            )}

            <button className="toggle-modal" onClick={toggleModalView}>
              {modalView ? "Login" : "Create New Account"}
            </button>
          </div>
        )}
      </Popup>

      <span> {averageRating} Stars</span>

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
              {breweryName} Reviews
              <p>{breweryRatings.length} ratings</p>
              <p>{averageRating} Stars</p>
            </div>

            {breweryRatings.map((review) => {
              return <Reviews key={review.id} review={review} />;
            })}

            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close
            </button>
          </div>
        )}
      </Popup>

      <form onSubmit={handleSubmit}>
        <div style={{ display: submitDisplay }}>
          <input
            type="text"
            name="review"
            onChange={handleChange}
            value={review}
            placeholder="Submit a review..."
          ></input>
          <button onClick={handleCancel}>Cancel</button>
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.userData.currentUser,
  allRatings: state.ratingData.ratings,
  // loginView: state.userData.loginView,
});

export default connect(mapStateToProps, { postRating })(StarRating);
