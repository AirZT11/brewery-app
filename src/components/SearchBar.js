import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getRatings } from "../actions/ratingActions";
import { fetchBreweries, getUserRatedBrews } from "../actions/breweryActions";
import { BsSearch } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";

// Search input should dynamically load a list of breweries that correspond to what is being typed
const SearchBar = ({ fetchBreweries, getUserRatedBrews, currentUser }) => {
  const [searchInput, setSearchInput] = useState("");
  const [delayedInput, setDelayedInput] = useState("");
  const [autoCompBrews, setAutoCompBrews] = useState([]);
  const [autoCompDisplay, setAutoCompDisplay] = useState("none");
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDelayedInput(searchInput);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchInput]);

  useEffect(() => {
    getAutoComplete(delayedInput);
    if (delayedInput === "") setAutoCompDisplay("none");
  }, [delayedInput]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setTimeout(() => setAutoCompDisplay("block"), 500);
  };

  const alpabetize = (a, b) => {
    return a.id.localeCompare(b.id);
  };

  const getAutoComplete = (query) => {
    axios
      .request({
        mthod: "GET",
        url: `https://api.openbrewerydb.org/breweries/autocomplete?query=${query}`,
      })
      .then((breweries) => {
        setAutoCompBrews(breweries.data.sort(alpabetize));
      });
  };

  // SEARCH SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBreweries(searchInput);
    // displayList();
    // setMapZoom(5);
    dispatch({ type: "SET_MAP_ZOOM", payload: 5 });
    setSearchInput("");
    setAutoCompDisplay("none");
    dispatch({ type: "CLOSE_WELCOME_MODAL" });
  };

  return (
    <>
      <form className="search-bar-container" id="search-bar-container">
        <input
          className="search-bar"
          type="text"
          value={searchInput}
          onChange={handleChange}
          placeholder="Search Breweries..."
        />

        <button
          id="search-button"
          className="search-button"
          title="Search for Brewery"
          onClick={handleSubmit}
        >
          <BsSearch />
        </button>

        <span className="search-btn-middle-bar" />

        <button
          onClick={(e) => {
            e.preventDefault();
            getUserRatedBrews(currentUser.ratings);
          }}
          className="search-button"
        >
          <FaUserAlt />
        </button>
      </form>
      <div className="auto-comp-container" style={{ display: autoCompDisplay }}>
        {Array.isArray(autoCompBrews) &&
          autoCompBrews.map((brew) => (
            <ul key={brew.id}>
              <li onClick={() => setSearchInput(brew.name)}>{brew.name}</li>
            </ul>
          ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.userData.currentUser,
});

export default connect(mapStateToProps, {
  getRatings,
  fetchBreweries,
  getUserRatedBrews,
})(SearchBar);
