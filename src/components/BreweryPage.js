import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMapGL, {Marker} from 'react-map-gl';

const BreweryPage = (props) => {
  // props from brewery link 
  const location = useLocation();
  const brewery = location.state;
  const { fromBrewCard } = brewery
  const { name, city, state, country, website_url, latitude, longitude } = fromBrewCard

  // state for map
  const [viewport, setviewPort] = useState({
    latitude: parseInt(latitude),
    longitude: parseInt(longitude),
    width: '500px',
    height: '500px',
    zoom: 8
  });

  return (
    <div className='brewery-page'>
      <div className='brewpage-description'>
        <h1>{name}</h1>
        <p>Rating *****</p>
        <p className='brew-location'>{city}, {state}</p>
        <p className='brew-location'>{country}</p>
        <a href={website_url} target="_blank" rel="noreferrer">{website_url}</a>
      </div>

      <div className='small-map'>
        < ReactMapGL 
          {...viewport} 
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle='mapbox://styles/airzt11/ckoyq05k2288l17nox4ns6ttl'
          asyncRender={true}
          onViewportChange={viewport => {
            setviewPort(viewport);
          }}>
            < Marker 
              latitude={parseInt(latitude)}
              longitude={parseInt(longitude)}
            >
              <img src="/Lager2.svg" alt='beer'/>
            </Marker>

        </ReactMapGL>     

      </div>
    </div>
  )
}

export default BreweryPage;