import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";

import Locate from "./Locate";
// import GoogleSearch from "./GoogleSearch";
import BreweryCard from "./BreweryCard";
import Loading from "./Loading";
import BreweryList from "./containers/BreweryList";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "../mapStyles";
import "../css/Map.css";
import "../css/Loading.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "50vh",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ breweries, userLocation, display, displayList }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selectedBrew, setSelectedBrew] = useState(null);
  const [loadDisplay, setLoadDisplay] = useState("none");

  useEffect(() => {}, []);

  // useRef to retain a ref to the map's instance itself
  // to programmatically move where the map is, to pan and zoom
  // helps retains state without causing a re-render
  const mapRef = useRef();

  // cb function to passed in when the map loads
  // gives us the map which we can then assign to the mapRef for use later
  // eliminates re-renders
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }, zoomAmount) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoomAmount);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Map...";

  return (
    <div className="map-container">
      {/* <GoogleSearch userLocation={userLocation} panTo={panTo} /> */}

      <Loading type="spinningBubbles" />

      <Locate
        panTo={panTo}
        displayList={displayList}
        setLoadDisplay={setLoadDisplay}
      />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={userLocation}
        options={options}
        onLoad={onMapLoad}
      >
        {breweries.map((brewery) => (
          <Marker
            key={brewery.id}
            position={{
              lat: Number(brewery.latitude),
              lng: Number(brewery.longitude),
            }}
            icon={{
              url: "/beerIcon.svg",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelectedBrew(brewery);
            }}
          />
        ))}
        {selectedBrew && (
          <InfoWindow
            position={{
              lat: Number(selectedBrew.latitude),
              lng: Number(selectedBrew.longitude),
            }}
            onCloseClick={() => setSelectedBrew(null)}
          >
            <BreweryCard brewery={selectedBrew} />
          </InfoWindow>
        )}
      </GoogleMap>
      <br />
      <div style={{ display: display }}>
        <BreweryList
          breweries={breweries}
          listStyle={"brewList"}
          panTo={panTo}
          setSelectedBrew={setSelectedBrew}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // breweries: state.breweryData.userLocationBreweries,
});

export default connect(mapStateToProps)(Map);
