import './css/App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './components/containers/NavBar';
import About from './components/About';
import Profile from './components/Profile';
import BreweryPage from './components/BreweryPage';
import BrewerContainer from './components/containers/BreweryContainer';
import SignUpContainer from './components/containers/SignUpContainer';

class App extends Component{

  render() {
    return (
      <div className="App">
        <Router>
          < NavBar />
  
          <div className='content'>
            <Switch>
              <Route exact path="/about"><About /></Route>
              <Route exact path="/profile">< Profile /></Route>
              <Route exact path="/">< BrewerContainer /></Route>
              <Route exact path='/brewery/:id'>
                <BreweryPage/> 
              </Route>
              <Route exact path='/signup'><SignUpContainer /></Route>
            </Switch>
          </div>
  
      </Router>
  
      </div>
      
    );
  }
}

export default App;
