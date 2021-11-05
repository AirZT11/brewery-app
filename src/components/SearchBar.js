import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getRatings } from "../actions/ratingActions";
import { fetchBreweries } from "../actions/breweryActions";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

// Search input should dynamically load a list of breweries that correspond to what is being typed
const SearchBar = ({ fetchBreweries }) => {
  const [searchInput, setSearchInput] = useState("");
  const [delayedInput, setDelayedInput] = useState("");
  const [autoCompBrews, setAutoCompBrews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOutId = setTimeout(() => setDelayedInput(searchInput), 500);
    return () => clearTimeout(timeOutId);
  }, [searchInput]);

  useEffect(() => {
    getAutoComplete(delayedInput);
  }, [delayedInput]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const getAutoComplete = (query) => {
    axios
      .request({
        mthod: "GET",
        url: `https://api.openbrewerydb.org/breweries/autocomplete?query=${query}`,
      })
      .then((breweries) => {
        setAutoCompBrews(breweries);
      });
  };

  // SEARCH SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBreweries(searchInput);
    // displayList();
    // setMapZoom(5);
    setSearchInput("");
    dispatch({ type: "CLOSE_WELCOME_MODAL" });
  };

  return (
    <>
      <form className="search-bar-container">
        <input
          className="search-bar"
          type="text"
          value={searchInput}
          onChange={handleChange}
          placeholder="Search Breweries..."
        />
        <button
          className="search-button"
          title="Search for Brewery"
          onClick={handleSubmit}
        >
          <BsSearch />
        </button>
      </form>
      <div className="auto-comp-container">
        {autoCompBrews &&
          autoCompBrews.map((brew, key) => (
            <ul>
              <li>{brew.name}</li>
            </ul>
          ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getRatings,
  fetchBreweries,
})(SearchBar);
