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
  if (currentUser) {
    return (
      <nav className="nav-bar">
        <ul>
          <li>
            <NavLink exact className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          {/* <li><NavLink exact className='nav-link' to="/profile">Profile</NavLink></li> */}
          <li>
            <NavLink exact className="nav-link" to="/profile">
              {currentUser.user.name}
            </NavLink>
          </li>
          <li>
            <NavLink exact className="nav-link" to="/" onClick={logout}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <div className="nav-bar">
        <ul>
          <li>
            <NavLink exact className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink exact className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink exact className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
};

export default connect(null, { logOut })(NavBar);
