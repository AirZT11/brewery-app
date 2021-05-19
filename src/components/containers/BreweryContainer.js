import React, { Component } from 'react';
import axios from "axios";
import BreweryList from '../BreweryList';
import SearchBar from '../SearchBar';

class BreweryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breweries: []
    }
  }

  componentDidMount() {
    this.fetchBreweries()
  }

  // request headers for axios fetch call
  options = {
    method: 'GET',
    url: 'https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries',
    headers: {
      'x-rapidapi-key': '0d5f8f8bb8mshdec6240eba9abb8p130b38jsn82704896f6c0',
      'x-rapidapi-host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
    }
  };

  fetchBreweries = () => {
    axios.request(this.options).then((response) => {
      this.setState({
        breweries: response.data
      })
      // console.log(response.data)
    }).catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
      <div>
        <p>BreweryContainer</p>
        < SearchBar />
        < BreweryList breweries={this.state.breweries}/>
      </div>
    )
  }
}

export default BreweryContainer;