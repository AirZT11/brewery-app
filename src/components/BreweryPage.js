import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

import { getBreweryRatings } from "../lib/helperMethods";

import StarRating from "./StarRating";
import Map from "./Map";

import { FaDirections, FaHome } from "react-icons/fa";
import { RiExternalLinkFill } from "react-icons/ri";

const BreweryPage = ({ allRatings, display, displayList, userLocation }) => {
  const [brewery, setBrewery] = useState([]);
  const [breweryRatings, setBreweryRatings] = useState([]);
  const { id } = useParams();
  const { name, city, state, country, website_url, latitude, longitude } =
    brewery;

  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: `https://api.openbrewerydb.org/breweries/${id}`,
      })
      .then((response) => {
        setBrewery(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getBreweryRatings(id, setBreweryRatings);
  }, []);

  return (
    <div className="brewpage-container">
      <navbar className="brewpage-nav">
        <NavLink exact className="home-btn" to="/">
          <FaHome />
        </NavLink>
      </navbar>
      <div className="brewpage-content">
        <h1 className="brew-name-lrg">{name}</h1>

        <StarRating
          breweryId={id}
          breweryName={name}
          breweryRatings={breweryRatings}
        />

        <p className="brew-location">
          {city}, {state}
        </p>
        <p className="brew-location">{country}</p>

        {urlExist(website_url)}

        <a
          className="link-icons"
          title="Get Directions"
          href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${brewery.latitude},${brewery.longitude}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaDirections />
        </a>

        <br />

        <div className="brewpage-map">
          <Map
            breweries={brewery}
            userLocation={userLocation}
            displayList={displayList}
            display={display}
            mapWidth="90vw"
            mapHeight="50vh"
            mapZoom={12}
            mapCenter={{ lat: Number(latitude), lng: Number(longitude) }}
          />
        </div>
      </div>
    </div>
  );
};

const urlExist = (url) => {
  if (url != null) {
    return (
      <a
        className="link-icons"
        title="Website"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <RiExternalLinkFill />
      </a>
    );
  }
};

const mapStateToProps = (state) => ({
  allRatings: state.ratingData.ratings,
  userLocation: state.userData.userLocation,
});

export default connect(mapStateToProps)(BreweryPage);
