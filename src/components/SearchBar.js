import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

// Search input should dynamically load a list of breweries that correspond to what is being typed
const SearchBar = ({ handleChange, searchInput, handleSubmit }) => {
  return (
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
  );
};

export default SearchBar;
