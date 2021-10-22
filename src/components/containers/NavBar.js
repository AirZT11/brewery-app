import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchBreweries } from "../../actions/breweryActions";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar";
import "../../css/NavBar.css";
import { logOut, setPromptView } from "../../actions/userActions";
import { slide as Menu } from "react-burger-menu";

const NavBar = ({
  currentUser,
  handleChange,
  handleSubmit,
  searchInput,
  logOut,
  setPromptView,
  // fetchBreweries,
  // displayList,
  // setMapZoom,
}) => {
  // const [searchInput, setSearchInput] = useState("");

  // const handleChange = (e) => {
  //   setSearchInput(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetchBreweries(searchInput);
  //   displayList();
  //   setMapZoom(5);
  //   setSearchInput("");
  // };

  const logout = () => {
    logOut(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      return setPromptView("LOGOUT", false);
    }, 2500);
    // alert("You have been successfully logged out");
  };

  return (
    <Menu right noOverlay width={"23%"}>
      <NavLink exact className="menu-item" to="/">
        <p>TheBreweryFinder</p>
      </NavLink>

      {/* <SearchBar
        handleChange={handleChange}
        searchInput={searchInput}
        handleSubmit={handleSubmit}
      /> */}

      <NavLink exact className="menu-item" to="/">
        Home
      </NavLink>

      <NavLink exact className="menu-item" to="/about">
        About
      </NavLink>

      {currentUser ? (
        <NavLink exact className="menu-item" to="/profile">
          {currentUser.user.name}
        </NavLink>
      ) : (
        <NavLink exact className="menu-item" to="/signup">
          Sign Up
        </NavLink>
      )}

      {currentUser ? (
        <NavLink exact className="menu-item" to="/" onClick={logout}>
          Logout
        </NavLink>
      ) : (
        <NavLink exact className="menu-item" to="/login">
          Login
        </NavLink>
      )}
    </Menu>
  );
};

export default connect(null, { fetchBreweries, logOut, setPromptView })(NavBar);
