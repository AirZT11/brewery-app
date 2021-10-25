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
  menuState,
  closeMenu,
  handleMenuStateChange,
}) => {
  const logout = () => {
    logOut(true);
    localStorage.removeItem("token");
    closeMenu();
    setTimeout(() => {
      return setPromptView("LOGOUT", false);
    }, 2500);
  };

  return (
    <Menu
      right
      noOverlay
      width={"23%"}
      isOpen={menuState}
      onStateChange={(state) => handleMenuStateChange(state)}
    >
      <NavLink exact className="menu-item" to="/">
        <p>TheBreweryFinder</p>
      </NavLink>

      {/* <SearchBar
        handleChange={handleChange}
        searchInput={searchInput}
        handleSubmit={handleSubmit}
      /> */}

      <NavLink exact className="menu-item" to="/" onClick={closeMenu}>
        Home
      </NavLink>

      <NavLink exact className="menu-item" to="/about" onClick={closeMenu}>
        About
      </NavLink>

      {currentUser ? (
        <NavLink exact className="menu-item" to="/profile" onClick={closeMenu}>
          {currentUser.user.name}
        </NavLink>
      ) : (
        <NavLink exact className="menu-item" to="/signup" onClick={closeMenu}>
          Sign Up
        </NavLink>
      )}

      {currentUser ? (
        <NavLink exact className="menu-item" to="/" onClick={logout}>
          Logout
        </NavLink>
      ) : (
        <NavLink exact className="menu-item" to="/login" onClick={closeMenu}>
          Login
        </NavLink>
      )}
    </Menu>
  );
};

export default connect(null, { fetchBreweries, logOut, setPromptView })(NavBar);
