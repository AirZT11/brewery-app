import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchBreweries } from "../../actions/breweryActions";
import { getUserLocation } from "../../actions/userActions";
import "../../css/Breweries.css";
import Map from "../Map";

const BreweryContainer = ({
  displayList,
  display,
  breweries,
  fetchBreweries,
  getUserLocation,
  locationAvail,
  userLocation,
  mapZoom,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "IS_LOCATION_AVAIL" });
  }, []);

  useEffect(() => {
    getUserLocation(locationAvail);
  }, [locationAvail]);

  return (
    <>
      <div className="brew-container">
        <Map
          breweries={breweries}
          userLocation={userLocation}
          displayList={displayList}
          display={display}
          mapWidth="100vw"
          mapZoom={mapZoom}
        />

        {/* SIDE BAR LIST DISPLAY */}
        {/* displays breweryList when search is submitted */}
        {/* <div style={{display: this.state.display}}>
            < BreweryList breweries={this.state.breweries} listStyle={'brewList-map'}/>
          </div>   */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  breweries: state.breweryData.breweries,
  locationAvail: state.userData.locationAvail,
  userLocation: state.userData.userLocation,
});

export default connect(mapStateToProps, { fetchBreweries, getUserLocation })(
  BreweryContainer
);
