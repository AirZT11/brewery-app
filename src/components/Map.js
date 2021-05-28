import React, { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import BreweryCard from './BreweryCard';

const Map = ({breweries}) => {
  const [viewport, setviewPort] = useState({
    latitude: 39.6361637,
    longitude: -105.321458,
    width: '100%',
    height: '100%',
    zoom: 3
  });
  
  // sets a selected brewery in state
  const [selectedBrew, setSelectedBrew] = React.useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedBrew(null)
      }
    }
    window.addEventListener('keydown', listener)
  }, [])
  return (
    <div className='map'>
      < ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/airzt11/ckoyq05k2288l17nox4ns6ttl'
        asyncRender={true}
        onViewportChange={viewport => {
          setviewPort(viewport);
        }}
      >
        {breweries.map(b => (
          // console.log(b.latitude, b.longitude)
          < Marker 
            key={b.id}
            latitude={parseInt(b.latitude)}
            longitude={parseInt(b.longitude)}
          >
            <button onClick={e => {
              e.preventDefault();
              setSelectedBrew(b);
            }}>
              <img src="/Lager2.svg" alt='beer'/>
            </button>
          </Marker>
        ))}

    {/* Displays brewery info on marker */}
    {selectedBrew ? <Popup latitude={parseInt(selectedBrew.latitude)} longitude={parseInt(selectedBrew.longitude)}
        closeButton={true}
        closeOnClick={false}
        onClose={() => setSelectedBrew(null)}
        anchor="top" >
        < BreweryCard brewery={selectedBrew}/>
      </Popup> : null }
      
      </ReactMapGL>
    </div>
  )
}

export default Map;