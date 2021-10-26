import React, { useState } from "react";

// Search input should dynamically load a list of breweries that correspond to what is being typed
const SearchBar = ({ handleChange, searchInput, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <input
        className="search-bar"
        type="text"
        value={searchInput}
        onChange={handleChange}
        placeholder="Search Breweries..."
      />
      <input type="submit" className="search-button" />
    </form>
  );
};

export default SearchBar;
