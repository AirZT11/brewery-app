import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchCurrentUser } from "../actions/userActions";
import axios from "axios";
import Stars from "react-star-ratings";
import Map from "./Map";

const Profile = ({ currentUser, userLocation }) => {
  const [userBreweries, setUserBreweries] = useState([]);

  // TRYING TO FETCH BREWERIES THAT MATCH UP TO THE RATINGS
  // useEffect(() => {
  //   currentUser.ratings.forEach((rating) => {
  //     axios
  //       .get(`https://api.openbrewerydb.org/breweries/${rating.brewery_id}`)
  //       .then((brewery) => console.log(brewery));
  //   });
  // }, [currentUser]);

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

          {/* <div className="small-map">
            <Map
              breweries={currentUser.ratings}
              userLocation={userLocation}
              mapWidth="50vw"
              mapZoom={12}
              mapCenter={{
                lat: Number(userLocation.latitude),
                lng: Number(userLocation.longitude),
              }}
            />
          </div> */}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.userData.currentUser,
  userLocation: state.userData.userLocation,
});

export default connect(mapStateToProps, { fetchCurrentUser })(Profile);
