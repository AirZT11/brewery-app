import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchBreweries } from "../../actions/breweryActions";
import { getUserLocation, setPromptView } from "../../actions/userActions";
import Map from "../Map";
import Prompt from "../Prompt";
import "../../css/Modal.css";
import "../../css/Breweries.css";

const BreweryContainer = ({
  displayList,
  display,
  breweries,
  fetchBreweries,
  getUserLocation,
  locationAvail,
  userLocation,
  mapZoom,
  setMapZoom,
  handleChange,
  handleSubmit,
  searchInput,
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
          mapWidth="75vw"
          mapZoom={mapZoom}
          setMapZoom={setMapZoom}
          mapCenter={userLocation}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchInput={searchInput}
        />

        {/* SIDE BAR LIST DISPLAY */}
        {/* displays breweryList when search is submitted */}
        {/* <div style={{display: this.state.display}}>
            < BreweryList breweries={this.state.breweries} listStyle={'brewList-map'}/>
          </div>   */}

        <Prompt />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  breweries: state.breweryData.breweries,
  locationAvail: state.userData.locationAvail,
  userLocation: state.userData.userLocation,
});

export default connect(mapStateToProps, {
  fetchBreweries,
  getUserLocation,
})(BreweryContainer);
