import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchBreweries } from "../../actions/breweryActions";
import { getUserLocation } from "../../actions/userActions";
import "../../css/Breweries.css";
import BreweryList from "./BreweryList";
import SearchBar from "../SearchBar";
import Map from "../Map";

const BreweryContainer = ({
  breweries,
  fetchBreweries,
  getUserLocation,
  locationAvail,
  userLocation,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [display, setDisplay] = useState("none");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "IS_LOCATION_AVAIL" });
  }, []);

  useEffect(() => {
    getUserLocation(locationAvail);
  }, [locationAvail]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBreweries(searchInput);
    displayList();
  };

  const displayList = () => {
    setDisplay("block");
  };

  return (
    <>
      <div className="brew-container">
        <Map
          breweries={breweries}
          userLocation={userLocation}
          displayList={displayList}
          display={display}
        />

        {/* SIDE BAR LIST DISPLAY */}
        {/* displays breweryList when search is submitted */}
        {/* <div style={{display: this.state.display}}>
            < BreweryList breweries={this.state.breweries} listStyle={'brewList-map'}/>
          </div>   */}
      </div>

      <SearchBar
        handleChange={handleChange}
        searchInput={searchInput}
        handleSubmit={handleSubmit}
      />
      <br />

      {/* <div style={{ display: display }}>
        <BreweryList breweries={breweries} listStyle={"brewList"} />
      </div> */}
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
