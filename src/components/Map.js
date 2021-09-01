import React, { useState, useEffect } from 'react';
import BreweryCard from './BreweryCard';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ["places"]
const mapContainerStyle = {
  width: '100vw',
  height: '50vh'
}
const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

const Map = ({breweries, userLocation}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  // const [breweryLocations, setBreweryLocations] = useState([]);
  
  useEffect(() => {

  }, [])

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Map..."
  return (
    <div className='map'>

      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={7} 
        center={userLocation} 
        options={options}
      >
        {breweries.map(brewery => (
          <Marker  
            key={brewery.id}
            position={{ lat: Number(brewery.latitude), lng: Number(brewery.longitude) }} />
          )
        )}

      </GoogleMap>

    </div>
  )
}

export default Map;