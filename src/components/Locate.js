import React from "react";
import { connect } from "react-redux";
import { fetchUserLocationBrews } from "../actions/breweryActions";
import { ImLocation } from "react-icons/im";

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// PANS TO USER LOCATION
// find location, then search for breweries based on coordinates
// as finding user location takes a while, use a promise to wait for response and then search brews
//
const Locate = ({ panTo, fetchUserLocationBrews }) => {
  const handleClick = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        fetchUserLocationBrews(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => null,
      options
    );
  };

  // const handleClick = () => {
  //   panToUserLocation().then(() => console.log("finding user breweries"));
  // };

  return (
    <button className="locate" onClick={handleClick}>
      <ImLocation />
    </button>
  );
};

export default connect(null, { fetchUserLocationBrews })(Locate);
