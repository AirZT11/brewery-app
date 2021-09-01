import React, { useState, useEffect } from 'react';
import BreweryCard from './BreweryCard';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ["places"]
const mapContainerStyle = {
  width: '100vw',
  height: '50vh'
}

const Map = ({breweries, userLocation}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  
  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Map..."
  return (
    <div className='map'>

      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={11} 
        center={userLocation} 
      ></GoogleMap>

    </div>
  )
}

export default Map;