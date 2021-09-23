import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../css/NavBar.css";
import { logOut } from "../../actions/userActions";

const NavBar = ({ currentUser, logOut }) => {
  const logout = () => {
    logOut();
    localStorage.removeItem("token");
    // localStorage.removeItem('persist:root')
    alert("You have been successfully logged out");
  };

  return (
    <nav className="nav-bar">
      <div className="bar">
        <a className="app-name">BreweryFinder</a>
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
            <li>
              <NavLink exact className="nav-link" to="/profile">
                {currentUser.user.name}
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink exact className="nav-link" to="/signup">
                Sign Up
              </NavLink>
            </li>
          )}

          {currentUser ? (
            <li>
              <NavLink exact className="nav-link" to="/" onClick={logout}>
                Logout
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink exact className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default connect(null, { logOut })(NavBar);
