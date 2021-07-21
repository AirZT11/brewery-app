import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import ReactMapGL, {Marker} from 'react-map-gl';
import Reviews from './Reviews';
import StarRating from './StarRating';

// TODO:
  // DONE - Display starRating
  // DONE - Display # of reviews
  // Display Reviews

const BreweryPage = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState({});
  const { name, city, state, country, website_url, latitude, longitude } = brewery
  const [viewport, setviewPort] = useState({});


  useEffect(() => {
    axios.request({
      method: 'GET',
      url: `https://api.openbrewerydb.org/breweries/${id}`,
      headers: {
        'x-rapidapi-key': '0d5f8f8bb8mshdec6240eba9abb8p130b38jsn82704896f6c0',
        'x-rapidapi-host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
      }
    }).then((response) => {
      setBrewery(response.data)
      setviewPort({
        latitude: parseFloat(response.data.latitude),
        longitude: parseFloat(response.data.longitude),
        width: '50vw',
        height: '25vh',
        zoom: 8
    })})
    .catch(error => {
      console.error(error);
    });
  }, [])

  return (
    <div className='brewery-page'>
      <div className='brewpage-description'>
        <h1>{name}</h1>
        < StarRating breweryId={parseInt(id)} />
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
              latitude={parseFloat(latitude)}
              longitude={parseFloat(longitude)}
            >
              <img src="/Lager2.svg" alt='beer'/>
            </Marker>
        </ReactMapGL>
      </div>
      {/* {console.log(brewery)} */}
      
    </div>
  )
}

export default BreweryPage;