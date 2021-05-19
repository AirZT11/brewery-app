import React, {Component} from 'react';
import { connect } from 'react-redux';
import './App.css';
import {fetchBreweries} from './actions/breweryActions';
import HomePage from './components/HomePage';
import BreweryContainer from './components/containers/BreweryContainer';

class App extends Component {

  componentDidMount() {
    this.props.fetchBreweries();
  }

  render() {
    return (
      <div className="App">
        < HomePage />
        < BreweryContainer breweries={ this.state.breweries }/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  breweries: state.breweryData.breweries
})

export default connect(null, {fetchBreweries})(App);
