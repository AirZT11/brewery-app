import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getRatings } from "../actions/ratingActions";
import { fetchBreweries, getUserRatedBrews } from "../actions/breweryActions";
import { BsSearch } from "react-icons/bs";
import { FaUserAlt, FaStar } from "react-icons/fa";
import LoginSignUpContainer from "./containers/LoginSignUpContainer";

import axios from "axios";

// Search input should dynamically load a list of breweries that correspond to what is being typed
const SearchBar = ({
  fetchBreweries,
  getUserRatedBrews,
  currentUser,
  panTo,
  userLocation,
  searchReviewPrompt,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [delayedInput, setDelayedInput] = useState("");
  const [autoCompBrews, setAutoCompBrews] = useState([]);
  const [autoCompDisplay, setAutoCompDisplay] = useState("none");
  // const [userReviewsDisplay, setUserReviewsDisplay] = useState("none");
  const [loginView, setLoginView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDelayedInput(searchInput);
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [searchInput]);

  useEffect(() => {
    getAutoComplete(delayedInput);
    if (delayedInput === "") setAutoCompDisplay("none");
  }, [delayedInput]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setAutoCompDisplay("block");
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

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (currentUser) {
      getUserRatedBrews(currentUser.ratings);
      dispatch({ type: "SEARCH_REVIEW_PROMPT", payload: "block" });
    } else {
      setLoginView(true);
    }
  };

  // SEARCH SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    fetchBreweries(searchInput);
    panTo(
      {
        lat: Number(userLocation.lat),
        lng: Number(userLocation.lng),
      },
      5
    );
    setSearchInput("");
    setDelayedInput("");
    setAutoCompDisplay("none");
    dispatch({ type: "SEARCH_REVIEW_PROMPT", payload: "none" });
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
            handleProfileClick(e);
          }}
          className="search-button"
        >
          <FaUserAlt />
        </button>

        {/* ONLY IF CURRENTUSER EXISTS */}
        <LoginSignUpContainer
          setLoginView={setLoginView}
          loginView={loginView}
          popUpPrompt={"Please login or sign up for an account"}
        />
      </form>

      <div className="auto-comp-container" style={{ display: autoCompDisplay }}>
        {Array.isArray(autoCompBrews) &&
          autoCompBrews.map((brew) => (
            <ul key={brew.id}>
              <li onClick={() => setSearchInput(brew.name)}>{brew.name}</li>
            </ul>
          ))}
      </div>
      <div
        className="user-reviews-display"
        style={{ display: searchReviewPrompt }}
      >
        <p>Displaying your reviewed breweries</p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.userData.currentUser,
  userLocation: state.userData.userLocation,
  searchReviewPrompt: state.breweryData.searchReviewPrompt,
});

export default connect(mapStateToProps, {
  getRatings,
  fetchBreweries,
  getUserRatedBrews,
})(SearchBar);
