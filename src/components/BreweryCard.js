import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import filterBreweryRatings from "../lib/filterBreweryRatings";

const BreweryCard = ({
  brewery,
  ratings,
  userLocation,
  panTo,
  setSelectedBrew,
  allRatings,
}) => {
  const [breweryRatings, setBreweryRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    filterBreweryRatings(allRatings, brewery.id, setBreweryRatings);
  }, [allRatings]);

  useEffect(() => {
    averageRatings();
  }, [breweryRatings]);

  const ratingValues = breweryRatings.map((rating) => {
    return rating.rating;
  });

  // calculates the average rating for brewery
  const averageRatings = () => {
    if (breweryRatings.length > 0) {
      const reducer = (acc, currentVal) => acc + currentVal;
      setAverageRating(ratingValues.reduce(reducer) / breweryRatings.length);
    } else setAverageRating(0);
  };

  const handleClick = () => {
    panTo(
      {
        lat: Number(brewery.latitude),
        lng: Number(brewery.longitude),
      },
      14
    );
    setSelectedBrew(brewery);
  };
  return (
    <div className="brew-card" onClick={handleClick}>
      <Link
        to={{
          pathname: `brewery/${brewery.id}`,
        }}
      >
        <strong>{brewery.name}</strong>
      </Link>

      <StarRating
        breweryId={brewery.id}
        breweryName={brewery.name}
        averageRating={averageRating}
        breweryRatings={breweryRatings}
      />

      <p className="brew-location">
        <i>{brewery.city}</i>, {brewery.state}
      </p>
      {/* <p className="brew-location">{brewery.country}</p> */}
      <span>
        {urlExist(brewery.website_url)}
        <span> || </span>
        <a
          className="brew-website"
          href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${brewery.latitude},${brewery.longitude}`}
          target="_blank"
        >
          Directions
        </a>
      </span>
    </div>
  );
};

const urlExist = (url) => {
  if (url != null) {
    return (
      <a className="brew-website" href={url} target="_blank" rel="noreferrer">
        Website
      </a>
    );
  }
};

const mapStateToProps = (state) => ({
  userLocation: state.userData.userLocation,
  allRatings: state.ratingData.ratings,
});

export default connect(mapStateToProps)(BreweryCard);
