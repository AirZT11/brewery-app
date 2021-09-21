import React, { useState, useEffect, useRef, useCallback } from "react";

import { connect } from "react-redux";

import Locate from "./Locate";
import BreweryCard from "./BreweryCard";
import "../css/Map.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "50vh",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ breweries, userLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selectedBrew, setSelectedBrew] = useState(null);

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

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(11);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Map...";

  return (
    <div>
      <Search userLocation={userLocation} panTo={panTo} />
      <Locate panTo={panTo} />

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
            <div>
              <BreweryCard brewery={selectedBrew} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // breweries: state.breweryData.userLocationBreweries,
});

export default connect(mapStateToProps)(Map);

function Search({ userLocation, panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => userLocation.lat, lng: () => userLocation.lng },
      radius: 500 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  // DISPLAYS SEARCH BAR FOR GOOGLE
  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          handleSelect(address);
        }}
      >
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter in address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
