import React, { Component } from 'react';
import '../../css/Breweries.css'
import axios from "axios";
import BreweryList from './BreweryList';
import SearchBar from '../SearchBar';
import Map from '../Map';
import BreweryPage from '../BreweryPage';
// import 'mapbox-gl.css'

class BreweryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breweries: [],
      searchInput: '',
      display: 'none'
    }
  }

  componentDidMount() {
    // this.fetchBreweries()
  }

  fetchBreweries = () => {
    axios.request({
      method: 'GET',
      url: `https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search`,
      params: { query: this.state.searchInput },
      headers: {
        'x-rapidapi-key': '0d5f8f8bb8mshdec6240eba9abb8p130b38jsn82704896f6c0',
        'x-rapidapi-host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
      }
    }).then((response) => {
      // function filters all breweries that dont have a latitude point
      let filteredBrews = response.data.filter(brew => {
        return brew.latitude !== null
      })
      this.setState({
        breweries: filteredBrews
      }) 
    }).catch(error => {
      console.error(error);
    });
  }

  handleChange = (e) => {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchBreweries();
    this.displayList();
  }
  
  displayList = () => {
    this.setState({
      display: 'block'
    })
  }

  render() {
    return (
      <div>
        
        <div className='brew-container'>
          < Map breweries={this.state.breweries} />
          {/* displays breweryList when search is submitted */}
          <div style={{display: this.state.display}}>
            < BreweryList breweries={this.state.breweries} listStyle={'brewList-map'}/>
          </div>  
        </div>
        
        < SearchBar handleChange={this.handleChange} searchInput={this.searchInput} handleSubmit = {this.handleSubmit}/>
        <br/>

        <div style={{display: this.state.display}} >
          < BreweryList breweries={this.state.breweries} listStyle={'brewList'} />
        </div>
      </div>
    )
  }
}

export default BreweryContainer;