import React, { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const Map = ({breweries}) => {
  const [viewport, setviewPort] = useState({
    latitude: 39.6361637,
    longitude: -105.321458,
    width: '100vw',
    height: '75vh',
    zoom: 5
  });
  
  return (
    <div>
      < ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/airzt11/ckoyq05k2288l17nox4ns6ttl'
        onViewportChange={viewport => {
          setviewPort(viewport);
        }}
      >
        {/* {console.log(breweries)} */}
        {breweries.map(b => (
          // console.log(b.latitude, b.longitude)

          < Marker 
            key={b.id}
            latitude={parseInt(b.latitude)}
            longitude={parseInt(b.longitude)}
          >
            <button>
              <img src="/public/beerIcon.svg" alt='beer'/>
            </button>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  )
}

export default Map;