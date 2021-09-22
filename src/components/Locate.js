import React from "react";
import { connect, useDispatch } from "react-redux";
import { fetchUserLocationBrews, setLoading } from "../actions/breweryActions";
import { ImLocation } from "react-icons/im";

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// PANS TO USER LOCATION
// find location, then search for breweries based on coordinates
// as finding user location takes a while, use a promise to wait for response and then search brews
//
const Locate = ({
  panTo,
  fetchUserLocationBrews,
  displayList,
  setLoadDisplay,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "SET_LOADING" });
    setLoadDisplay("block");
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
    displayList();
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
