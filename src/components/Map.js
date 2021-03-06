import React, { useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import useToggle from "../hooks/useToggle";

import Locate from "./Locate";
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
  mapHeight,
  mapZoom,
  mapCenter,
}) => {
  const [selectedBrew, setSelectedBrew] = useState(null);
  const [markerView, toggleMarkerView] = useToggle(true);
  const [libraries] = useState(["places"]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDeJ-zdqz6pQJQxzhoeXoO3pKCW-j1uK0E",
    libraries,
  });

  const mapContainerStyle = {
    width: mapWidth,
    height: mapHeight,
  };

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
  if (!isLoaded) return <Loading />;

  return (
    <div className="map-container">
      <Loading type="bars" />

      {/* DISPLAY LOCATE ICON IF > 1 BREWERY */}
      {Array.isArray(breweries) && (
        <Locate panTo={panTo} displayList={displayList} />
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
              panBtnView="none"
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
            panTo={panTo}
            setSelectedBrew={setSelectedBrew}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  // mapZoom: state.breweryData.mapZoom,
});

export default connect(mapStateToProps)(Map);
