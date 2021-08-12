import './css/App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import NavBar from './components/containers/NavBar';
import About from './components/About';
import UserProfile from './components/UserProfile';
import BreweryPage from './components/BreweryPage';
import BreweryContainer from './components/containers/BreweryContainer';
import SignUpContainer from './components/containers/SignUpContainer';
import Login from './components/Login';
import Reviews from './components/Reviews';

import { fetchCurrentUser } from './actions/userActions';
import { getRatings } from './actions/ratingActions';

class App extends Component{

  componentDidMount() {
    this.props.fetchCurrentUser();
    this.props.getRatings();
  }

  render() {
    return (
      <div className="App">
        <Router>
          < NavBar currentUser={this.props.currentUser} />
  
          <div className='content'>
            <Switch>
              <Route exact path="/about"><About /></Route>
              <Route exact path="/user/">< UserProfile /></Route>
              <Route exact path="/">< BreweryContainer /></Route>
              <Route exact path='/brewery/:id'><BreweryPage/> </Route>
              <Route exact path='/signup'><SignUpContainer /></Route>
              <Route exact path='/login' 
                render={() => 
                  this.props.currentUser ? 
                  < Redirect to="/" /> : < Login /> 
                }
              ></Route>
              <Route exact path='/reviews/:id'><Reviews/></Route>
            </Switch>
          </div>
  
      </Router>
  
      </div>
      
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser
})

export default connect(mapStateToProps, { fetchCurrentUser, getRatings })(App);
