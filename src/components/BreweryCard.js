import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { ImLocation } from "react-icons/im";
import { getBreweryRatings } from "../lib/filterBreweryRatings";

const BreweryCard = ({ brewery, userLocation, panTo, setSelectedBrew }) => {
  const [breweryRatings, setBreweryRatings] = useState([]);

  useEffect(() => {
    getBreweryRatings(brewery.id, setBreweryRatings);
  }, [brewery]);

  const handleClick = () => {
    setSelectedBrew(brewery);
    panTo(
      {
        lat: Number(brewery.latitude),
        lng: Number(brewery.longitude),
      },
      14
    );
  };

  return (
    <div className="brew-card">
      <Link
        style={{ textDecoration: "none" }}
        to={{ pathname: `brewery/${brewery.id}` }}
      >
        <span className="brew-name">{brewery.name}</span>
      </Link>
      <br />
      <StarRating
        breweryId={brewery.id}
        breweryName={brewery.name}
        breweryRatings={breweryRatings}
      />
      {/* </div> */}
      {/* <div className="brew-card" style={{ textAlign: "left" }}> */}
      <span className="brew-location">
        <i>{brewery.city}</i>, {brewery.state}
      </span>

      {/* <p className="brew-location">{brewery.country}</p> */}

      <br />

      <span>{urlExist(brewery.website_url)}</span>
      <span> || </span>
      <a
        className="brew-website"
        href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${brewery.latitude},${brewery.longitude}`}
        target="_blank"
      >
        <span>Directions</span>
      </a>

      <br />

      <button className="pan-to-on-map-btn" onClick={handleClick}>
        <ImLocation /> Map
      </button>
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
});

export default connect(mapStateToProps)(BreweryCard);
