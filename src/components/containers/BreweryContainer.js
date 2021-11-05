import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBreweries } from "../../actions/breweryActions";
import { getUserLocation } from "../../actions/userActions";
import Map from "../Map";
import Prompt from "../Prompt";
import "../../css/Modal.css";
import "../../css/Breweries.css";

const BreweryContainer = ({
  displayList,
  display,
  breweries,
  getUserLocation,
  userLocation,
  mapZoom,
  setMapZoom,
  closeMenu,
}) => {
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <>
      <div className="brew-container" onClick={closeMenu}>
        <Map
          breweries={breweries}
          userLocation={userLocation}
          displayList={displayList}
          display={display}
          mapWidth="73vw"
          mapZoom={mapZoom}
          setMapZoom={setMapZoom}
          mapCenter={userLocation}
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
  userLocation: state.userData.userLocation,
});

export default connect(mapStateToProps, {
  fetchBreweries,
  getUserLocation,
})(BreweryContainer);
