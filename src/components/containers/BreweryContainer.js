import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBreweries } from "../../actions/breweryActions";
import "../../css/Breweries.css";
import axios from "axios";
import BreweryList from "./BreweryList";
import SearchBar from "../SearchBar";
import Map from "../Map";

class BreweryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      display: "none",
      isLocationAvail: false,
      userLocation: {},
    };
  }

  componentDidMount() {
    this.checkLocationAvail();
    this.getUserLocation();
  }

  checkLocationAvail = () => {
    if ("geolocation" in navigator) {
      this.setState({ isLocationAvail: true });
    } else {
      this.setState({ isLocationAvail: false });
    }
  };
  getUserLocation = () => {
    if (this.state.isLocationAvail) {
      navigator.geolocation.getCurrentPosition(function (position) {
        this.setState({
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    } else {
      this.setState({
        userLocation: {
          lat: 40.6726224,
          lng: -73.9422279,
        },
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchBreweries(this.state.searchInput);
    this.displayList();
  };

  displayList = () => {
    this.setState({
      display: "block",
    });
  };

  render() {
    return (
      <>
        <div className="brew-container">
          <Map
            breweries={this.props.breweries}
            userLocation={this.state.userLocation}
            displayList={this.displayList}
          />

          {/* SIDE BAR LIST DISPLAY */}
          {/* displays breweryList when search is submitted */}
          {/* <div style={{display: this.state.display}}>
            < BreweryList breweries={this.state.breweries} listStyle={'brewList-map'}/>
          </div>   */}
        </div>

        <SearchBar
          handleChange={this.handleChange}
          searchInput={this.searchInput}
          handleSubmit={this.handleSubmit}
        />
        <br />

        <div style={{ display: this.state.display }}>
          <BreweryList
            breweries={this.props.breweries}
            listStyle={"brewList"}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  breweries: state.breweryData.breweries,
});

export default connect(mapStateToProps, { fetchBreweries })(BreweryContainer);
