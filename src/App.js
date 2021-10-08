import "./css/App.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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

import { fetchCurrentUser } from "./actions/userActions";
import { getRatings } from "./actions/ratingActions";
import BottomNav from "./components/BottomNav";

const App = ({ fetchCurrentUser, getRatings, currentUser }) => {
  const [display, setDisplay] = useState("none");
  const [mapZoom, setMapZoom] = useState(10);

  useEffect(() => {
    fetchCurrentUser();
    // getRatings();
  }, []);

  const displayList = () => {
    setDisplay("block");
  };

  return (
    <div className="App">
      <Router>
        <NavBar
          currentUser={currentUser}
          displayList={displayList}
          display={display}
          setMapZoom={setMapZoom}
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
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.userData.currentUser,
});

export default connect(mapStateToProps, { fetchCurrentUser, getRatings })(App);
