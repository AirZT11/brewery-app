import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NavBar from "./components/containers/NavBar";
import About from "./components/About";
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
import BottomNav from "./components/BottomNav";

import "./css/App.css";
import "./css/NavBar.css";
import "./css/Rating.css";
import "./css/Breweries.css";
import "./css/Loading.css";

const App = ({ fetchCurrentUser, getRatings, currentUser, fetchBreweries }) => {
  const [display, setDisplay] = useState("none");
  const [mapZoom, setMapZoom] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [menuState, setMenuState] = useState(false);

  const dispatch = useDispatch();

  // SEARCH INPUT CHANGE
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  // SEARCH SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBreweries(searchInput);
    displayList();
    setMapZoom(5);
    setSearchInput("");
    dispatch({ type: "CLOSE_WELCOME_MODAL" });
  };

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

  return (
    <Router>
      <div className="App">
        <NavBar
          currentUser={currentUser}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchInput={searchInput}
          menuState={menuState}
          closeMenu={closeMenu}
          handleMenuStateChange={handleMenuStateChange}
        />

        <WelcomePage
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchInput={searchInput}
        />

        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/user/">
            <UserProfile />
          </Route>
          <Route exact path="/">
            <BreweryContainer
              displayList={displayList}
              display={display}
              mapZoom={mapZoom}
              setMapZoom={setMapZoom}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              searchInput={searchInput}
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
