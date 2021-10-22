import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import useToggle from "../hooks/useToggle";

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

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({
  breweries,
  userLocation,
  display,
  displayList,
  mapWidth,
  mapZoom,
  setMapZoom,
  mapCenter,
  handleChange,
  handleSubmit,
  searchInput,
}) => {
  const [selectedBrew, setSelectedBrew] = useState(null);
  const [loadDisplay, setLoadDisplay] = useState("none");
  const [markerView, toggleMarkerView] = useToggle(true);
  const [libraries] = useState(["places"]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapContainerStyle = {
    width: mapWidth,
    height: "100vh",
  };

  // useEffect(() => {
  //   panTo(userLocation, mapZoom);
  // }, [mapZoom]);

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

      {Array.isArray(breweries) && (
        <Locate
          panTo={panTo}
          displayList={displayList}
          setLoadDisplay={setLoadDisplay}
          setMapZoom={setMapZoom}
          mapZoom={mapZoom}
        />
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={mapZoom}
        center={mapCenter}
        options={options}
        onLoad={onMapLoad}
      >
        {/* DISPLAYS MULTIPLE MARKERS IF > 1 BREWERY : (HOME VS BREWERYPAGE) */}
        {Array.isArray(breweries) ? (
          breweries.map((brewery) => (
            <Marker
              key={brewery.id}
              position={{
                lat: Number(brewery.latitude),
                lng: Number(brewery.longitude),
              }}
              icon={{
                url: "/beerIcon.svg",
                scaledSize: new window.google.maps.Size(45, 45),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                setSelectedBrew(brewery);
              }}
            />
          ))
        ) : (
          <Marker
            position={{
              lat: Number(breweries.latitude),
              lng: Number(breweries.longitude),
            }}
            icon={{
              url: "/beerIcon.svg",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        )}

        {/* WHEN CLICKING OUTSIDE OF INFOWINDOW, RERENDER INFOWINDOW */}
        {selectedBrew && markerView && (
          <InfoWindow
            position={{
              lat: Number(selectedBrew.latitude),
              lng: Number(selectedBrew.longitude),
            }}
            onCloseClick={() => setSelectedBrew(null)}
          >
            <BreweryCard
              panTo={panTo}
              setSelectedBrew={setSelectedBrew}
              brewery={selectedBrew}
            />
          </InfoWindow>
        )}
        <Marker
          position={{
            lat: userLocation.lat,
            lng: userLocation.lng,
          }}
        />
      </GoogleMap>

      {Array.isArray(breweries) && (
        <div style={{ display: display }}>
          <BreweryList
            breweries={breweries}
            listStyle={"brewList"}
            panTo={panTo}
            setSelectedBrew={setSelectedBrew}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            searchInput={searchInput}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  // userLocation: state.userData.userLocation,
});

export default connect(mapStateToProps)(Map);
