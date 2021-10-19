import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchBreweries } from "../../actions/breweryActions";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar";
import "../../css/NavBar.css";
import { logOut, setPromptView } from "../../actions/userActions";

const NavBar = ({
  currentUser,
  fetchBreweries,
  logOut,
  displayList,
  setMapZoom,
  setPromptView,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBreweries(searchInput);
    displayList();
    setMapZoom(5);
    setSearchInput("");
  };

  const logout = () => {
    logOut(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      return setPromptView("LOGOUT", false);
    }, 2500);
    // alert("You have been successfully logged out");
  };

  return (
    <nav className="nav-bar">
      <div className="bar">
        <NavLink exact className="app-name" to="/">
          BreweryFinder
        </NavLink>
        <span className="search">
          <SearchBar
            handleChange={handleChange}
            searchInput={searchInput}
            handleSubmit={handleSubmit}
          />
        </span>
      </div>
      <div id="menuToggle">
        <input type="checkbox" />

        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          <NavLink exact className="nav-link" to="/">
            <li>Home</li>
          </NavLink>

          <NavLink exact className="nav-link" to="/about">
            <li>About</li>
          </NavLink>

          {currentUser ? (
            <NavLink exact className="nav-link" to="/profile">
              <li>{currentUser.user.name}</li>
            </NavLink>
          ) : (
            <NavLink exact className="nav-link" to="/signup">
              <li>Sign Up</li>
            </NavLink>
          )}

          {currentUser ? (
            <NavLink exact className="nav-link" to="/" onClick={logout}>
              <li>Logout</li>
            </NavLink>
          ) : (
            <NavLink exact className="nav-link" to="/login">
              <li>Login</li>
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default connect(null, { fetchBreweries, logOut, setPromptView })(NavBar);
