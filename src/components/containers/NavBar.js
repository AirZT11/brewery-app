import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchBreweries } from "../../actions/breweryActions";
import { NavLink } from "react-router-dom";

import { logOut, setPromptView } from "../../actions/userActions";
import { slide as Menu } from "react-burger-menu";
import { GoMarkGithub } from "react-icons/go";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import LoginSignUpContainer from "./LoginSignUpContainer";

const NavBar = ({
  currentUser,
  logOut,
  setPromptView,
  menuState,
  closeMenu,
  handleMenuStateChange,
  displayLoginSignupPopup,
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
        <p>The Brewery Finder</p>
      </NavLink>

      <br />

      <NavLink exact className="menu-item" to="/" onClick={closeMenu}>
        Home
      </NavLink>

      {/* <NavLink exact className="menu-item" to="/about" onClick={closeMenu}>
          About
        </NavLink> */}

      {currentUser ? (
        <NavLink exact className="menu-item" to="/profile" onClick={closeMenu}>
          {currentUser.name}
        </NavLink>
      ) : (
        <a className="menu-item" onClick={displayLoginSignupPopup}>
          Sign Up
        </a>
      )}

      {currentUser ? (
        <NavLink exact className="menu-item" to="/" onClick={logout}>
          Logout
        </NavLink>
      ) : (
        <a className="menu-item" onClick={displayLoginSignupPopup}>
          Login
        </a>
      )}

      <br />
      <br />

      <div>
        <a
          href="https://github.com/AirZT11/brewery-app"
          className="nav-icons"
          target="_blank"
        >
          <GoMarkGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/samkim-dev/"
          className="nav-icons"
          target="_blank"
          style={{ fontSize: "44px" }}
        >
          <FaLinkedin />
        </a>
      </div>
    </Menu>
  );
};

export default connect(null, { fetchBreweries, logOut, setPromptView })(NavBar);
