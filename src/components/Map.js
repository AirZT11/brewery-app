import React, { useState, useEffect } from 'react';
// import ReactMapGL, {Marker, Popup} from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css'
import BreweryCard from './BreweryCard';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ["places"]
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}
const center = {
  lat: 104.9903,
  lng: 39.7392
}

const Map = ({breweries}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  
  // sets a selected brewery in state
  // const [selectedBrew, setSelectedBrew] = useState(null);

  // useEffect(() => {
  //   const listener = e => {
  //     if (e.key === "Escape") {
  //       setSelectedBrew(null)
  //     }
  //   }
  //   window.addEventListener('keydown', listener)
  // }, [])

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Map..."
  
  return (
    <div /*className='map'*/>
      {/* < ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/airzt11/ckoyq05k2288l17nox4ns6ttl'
        asyncRender={true}
        onViewportChange={viewport => {
          setviewPort(viewport);
        }}
      >
        {breweries.map(b => (
          < Marker 
            key={b.id}
            latitude={parseFloat(b.latitude)}
            longitude={parseFloat(b.longitude)}
          >
            <button onClick={e => {
              e.preventDefault();
              setSelectedBrew(b);
            }}>
              <img src="/Lager2.svg" alt='beer'/>
            </button>
          </Marker>
        ))} */}

        {/* Displays brewery info on marker */}
        {/* {selectedBrew ? <Popup latitude={parseInt(selectedBrew.latitude)} longitude={parseInt(selectedBrew.longitude)}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setSelectedBrew(null)}
          anchor="top" >
          < BreweryCard brewery={selectedBrew}/>
        </Popup> : null }
      
      </ReactMapGL> */}

      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} />

    </div>
  )
}

export default Map;