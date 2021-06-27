import './css/App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import NavBar from './components/containers/NavBar';
import About from './components/About';
import Profile from './components/Profile';
import BreweryPage from './components/BreweryPage';
import BrewerContainer from './components/containers/BreweryContainer';
import SignUpContainer from './components/containers/SignUpContainer';
import Login from './components/Login';

import { fetchCurrentUser } from './actions/userActions'

class App extends Component{

  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div className="App">
        <Router>
          < NavBar currentUser={this.props.currentUser} />
  
          <div className='content'>
            <Switch>
              <Route exact path="/about"><About /></Route>
              <Route exact path="/profile">< Profile /></Route>
              <Route exact path="/">< BrewerContainer /></Route>
              <Route exact path='/brewery/:id'>
                <BreweryPage/> 
              </Route>
              <Route exact path='/signup'><SignUpContainer /></Route>
              <Route exact path='/login'><Login /></Route>
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

export default connect(mapStateToProps, { fetchCurrentUser })(App);
