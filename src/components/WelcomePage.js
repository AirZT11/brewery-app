import React, { useState } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import SignUpContainer from "./containers/SignUpContainer";
import Login from "./Login";
import SearchBar from "./SearchBar";

const WelcomePage = ({
  handleChange,
  handleSubmit,
  searchInput,
  welcomeView,
}) => {
  return (
    <Popup open={welcomeView} modal nested>
      <div className="modal">
        <p className="welcome-name">The Brewery Finder</p>
        <SearchBar
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchInput={searchInput}
        />

        {/* BUTTON FOR LOGIN  */}
        <Popup
          open={false}
          trigger={<button className="main-btn-style">Login</button>}
          modal
        >
          {(close) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <Login />
            </div>
          )}
        </Popup>

        {/* BUTTON FOR SIGNUP  */}
        <Popup
          trigger={<button className="main-btn-style">Sign Up</button>}
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <SignUpContainer />
            </div>
          )}
        </Popup>
      </div>
    </Popup>
  );
};

const mapStateToProps = (state) => ({
  welcomeView: state.userData.welcomeView,
});

export default connect(mapStateToProps)(WelcomePage);
