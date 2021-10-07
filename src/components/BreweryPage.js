import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import Map from "./Map";

import filterBreweryRatings from "../lib/filterBreweryRatings";

import Reviews from "./Reviews";
import StarRating from "./StarRating";

// TODO:
// DONE - Display starRating
// DONE - Display # of reviews
// DONE - Display Reviews

const BreweryPage = ({ allRatings, display, displayList, userLocation }) => {
  const [breweryRatings, setBreweryRatings] = useState([]);
  const { id } = useParams();
  const [brewery, setBrewery] = useState({});
  const { name, city, state, country, website_url, latitude, longitude } =
    brewery;

  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: `https://api.openbrewerydb.org/breweries/${id}`,
        // headers: {
        //   "x-rapidapi-key":
        //     "0d5f8f8bb8mshdec6240eba9abb8p130b38jsn82704896f6c0",
        //   "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com",
        // },
      })
      .then((response) => {
        setBrewery(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    filterBreweryRatings(allRatings, parseInt(id), setBreweryRatings);
  }, []);

  // useEffect(() => {
  //   displayList("block");
  // });

  return (
    <div className="brewery-page">
      <div className="brewpage-description">
        <h1>{name}</h1>
        <StarRating breweryId={parseInt(id)} breweryName={name} />
        <p className="brew-location">
          {city}, {state}
        </p>
        <p className="brew-location">{country}</p>
        <a href={website_url} target="_blank" rel="noreferrer">
          {website_url}
        </a>

        {breweryRatings.map((review) => (
          <div key={review.id}>
            <Reviews review={review} />
          </div>
        ))}
      </div>

      <div className="small-map">
        <Map
          breweries={brewery}
          userLocation={userLocation}
          displayList={displayList}
          display={display}
          mapWidth="50vw"
          mapZoom={12}
          mapCenter={{ lat: Number(latitude), lng: Number(longitude) }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allRatings: state.ratingData.ratings,
  userLocation: state.userData.userLocation,
});

export default connect(mapStateToProps)(BreweryPage);
