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
  mapZoom,
  setMapZoom,
  userLocation,
}) => {
  useEffect(() => {
    loadUserBrews(mapZoom);
  }, [userLocation]);

  const dispatch = useDispatch();

  const loadUserBrews = (zoom) => {
    dispatch({ type: "SET_LOADING" });
    setLoadDisplay("block");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom
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

  const handleClick = () => {
    loadUserBrews(11);
    setMapZoom(11);
  };

  return (
    <button className="locate" onClick={handleClick}>
      <ImLocation />
      Nearby Breweries
    </button>
  );
};

export default connect(null, { fetchUserLocationBrews })(Locate);
