import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchUserLocationBrews } from "../actions/breweryActions";
import { RiMapPinUserLine } from "react-icons/ri";

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Locate = ({
  panTo,
  fetchUserLocationBrews,
  displayList,
  setLoadDisplay,
  // mapZoom,
  userLocation,
}) => {
  // ON LOAD OF APP,
  useEffect(() => {
    loadUserBrews(11);
  }, [userLocation]);

  const dispatch = useDispatch();

  const loadUserBrews = (zoom) => {
    dispatch({ type: "SET_LOADING" });
    setLoadDisplay("block");
    // SYNTAX ERROR IF NO navigator.getlocation...WHY??
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
    dispatch({ type: "SEARCH_REVIEW_PROMPT", payload: "block" });
  };

  return (
    <button className="locate" onClick={handleClick}>
      <RiMapPinUserLine />
    </button>
  );
};

const mapStateToProps = (state) => ({
  userLocation: state.userData.userLocation,
  // mapZoom: state.breweryData.mapZoom,
});

export default connect(mapStateToProps, { fetchUserLocationBrews })(Locate);
