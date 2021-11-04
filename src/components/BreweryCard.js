import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { IoMdLocate, IoIosBeer, IoIosLocate } from "react-icons/io";
import { FaDirections } from "react-icons/fa";
import { RiExternalLinkFill } from "react-icons/ri";
import { MdLocationSearching, MdReviews } from "react-icons/md";
import { getBreweryRatings } from "../lib/helperMethods";
import { getRatings } from "../actions/ratingActions";

const BreweryCard = ({
  brewery,
  userLocation,
  panTo,
  setSelectedBrew,
  panBtnView,
}) => {
  // RATINGS HAV TO LIVE IN COMPONENT AS ITS RELATED TO INDIVIDAUL BREWERIES
  const [breweryRatings, setBreweryRatings] = useState([]);

  useEffect(() => {
    getBreweryRatings(brewery.id, setBreweryRatings);
  }, [brewery]);

  const handleLocateOnMapClick = () => {
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
      <div className="flex-left">
        <Link
          title={`${brewery.name} Info`}
          to={{ pathname: `brewery/${brewery.id}` }}
        >
          <span className="brew-name">
            <b>{brewery.name}</b>
          </span>
        </Link>

        <p className="brew-location">
          {brewery.city}, {brewery.state}
        </p>

        <StarRating
          breweryId={brewery.id}
          breweryName={brewery.name}
          breweryRatings={breweryRatings}
          getBreweryRatings={getBreweryRatings}
          setBreweryRatings={setBreweryRatings}
        />
      </div>

      <br />

      <div className="flex-right">
        {urlExist(brewery.website_url)}

        <br />

        <a
          className="link-icons"
          title="Get Directions"
          href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${brewery.latitude},${brewery.longitude}`}
          target="_blank"
        >
          <FaDirections />
        </a>

        <br />

        <a
          className="link-icons"
          title="Locate Brewery"
          style={{ display: panBtnView }}
          onClick={handleLocateOnMapClick}
        >
          <IoIosLocate />
        </a>
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
  userLocation: state.userData.userLocation,
});

export default connect(mapStateToProps)(BreweryCard);
