import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

const BreweryCard = ({ brewery, ratings, userLocation }) => {
  return (
    <div className="brew-card">
      <Link
        to={{
          pathname: `brewery/${brewery.id}`,
        }}
      >
        <strong>
          <p>{brewery.name}</p>
        </strong>
      </Link>

      <StarRating breweryId={brewery.id} breweryName={brewery.name} />
      <p className="brew-location">
        <i>{brewery.city}</i>, {brewery.state}
      </p>
      <p className="brew-location">{brewery.country}</p>
      <p>{urlExist(brewery.website_url)}</p>
      <p>
        <a
          className="brew-website"
          href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${brewery.latitude},${brewery.longitude}`}
          target="_blank"
        >
          Directions
        </a>
      </p>
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
  ratings: state.ratingData.ratings,
  userLocation: state.userData.userLocation,
});

export default connect(mapStateToProps)(BreweryCard);
