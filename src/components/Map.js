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
          // console.log(b.latitude)
          // console.log(b.longitude)
          < Marker 
            key={b.id}
            latitude={b.latitude}
            longitude={b.longitude}
          >
            <div>beer</div>
            {/* <button>
              <img src="/public/logo192.png" alt='beer'/>
            </button> */}
          </Marker>
        )
        )}
      </ReactMapGL>
    </div>
  )
}

export default Map;