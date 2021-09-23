import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchUserLocationBrews } from "../actions/breweryActions";
import { ImLocation } from "react-icons/im";

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Locate = ({
  panTo,
  fetchUserLocationBrews,
  displayList,
  setLoadDisplay,
}) => {
  useEffect(() => {
    handleClick();
  });

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "SET_LOADING" });
    setLoadDisplay("block");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          11
        );

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

  return (
    <button className="locate" onClick={handleClick}>
      <ImLocation />
      Nearby Breweries
    </button>
  );
};

export default connect(null, { fetchUserLocationBrews })(Locate);
