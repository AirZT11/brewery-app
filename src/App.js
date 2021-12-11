import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NavBar from "./components/containers/NavBar";
import UserProfile from "./components/UserProfile";
import BreweryPage from "./components/BreweryPage";
import BreweryContainer from "./components/containers/BreweryContainer";
import SignUpContainer from "./components/containers/SignUpContainer";
import Login from "./components/Login";
import Reviews from "./components/Reviews";
import WelcomePage from "./components/WelcomePage";

import { fetchCurrentUser } from "./actions/userActions";
import { getRatings } from "./actions/ratingActions";
import { fetchBreweries } from "./actions/breweryActions";

import "./css/App.css";
import "./css/NavBar.css";
import "./css/Rating.css";
import "./css/Breweries.css";
import "./css/Loading.css";
import LoginSignUpContainer from "./components/containers/LoginSignUpContainer";

const App = ({ fetchCurrentUser, getRatings, currentUser, fetchBreweries }) => {
  const [display, setDisplay] = useState("none");
  const [menuState, setMenuState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const displayList = () => {
    setDisplay("block");
  };

  const handleMenuStateChange = (state) => {
    setMenuState(state.isOpen);
  };

  const closeMenu = () => {
    setMenuState(false);
  };

  const displayLoginSignupPopup = () => {
    setMenuState(false);
    dispatch({
      type: "SET_LOGIN_SIGNUP_PROMPT",
      payload: "",
    });
    dispatch({ type: "SET_LOGIN_VIEW", payload: true });
  };

  return (
    <Router>
      <div className="App">
        <NavBar
          currentUser={currentUser}
          menuState={menuState}
          closeMenu={closeMenu}
          handleMenuStateChange={handleMenuStateChange}
          displayLoginSignupPopup={displayLoginSignupPopup}
        />

        <WelcomePage />

        {/* POPS UP IF USER WANTS TO LOGIN/SIGNUP OR REVIEW BREWERY */}
        <LoginSignUpContainer />

        <Switch>
          {/* <Route exact path="/about">
            <About />
          </Route> */}
          <Route exact path="/profile/">
            <UserProfile />
          </Route>
          <Route exact path="/">
            <BreweryContainer
              displayList={displayList}
              display={display}
              closeMenu={closeMenu}
            />
          </Route>
          <Route exact path="/brewery/:id">
            <BreweryPage displayList={displayList} display={display} />{" "}
          </Route>
          <Route exact path="/signup">
            <SignUpContainer />
          </Route>
          <Route
            exact
            path="/login"
            render={() => (currentUser ? <Redirect to="/" /> : <Login />)}
          ></Route>
          <Route exact path="/reviews/:id">
            <Reviews />
          </Route>
        </Switch>
        {/* <BottomNav /> */}
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.userData.currentUser,
});

export default connect(mapStateToProps, {
  fetchCurrentUser,
  getRatings,
  fetchBreweries,
})(App);
