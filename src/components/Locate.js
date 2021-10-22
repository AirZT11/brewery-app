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
            lat: userLocation.lat,
            lng: userLocation.lng,
          },
          zoom
        );
      },
      () => null,
      options
    );
    fetchUserLocationBrews(userLocation.lat, userLocation.lng);
    displayList();
  };

  const handleClick = () => {
    loadUserBrews(11);
    setMapZoom(11);
  };

  return (
    <button className="locate" onClick={handleClick}>
      <ImLocation />
      {/* Nearby Breweries */}
    </button>
  );
};

const mapStateToProps = (state) => ({
  userLocation: state.userData.userLocation,
});

export default connect(mapStateToProps, { fetchUserLocationBrews })(Locate);
