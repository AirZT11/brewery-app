import React from 'react';
import { useLocation } from 'react-router-dom';

const BreweryPage = (props) => {
  const location = useLocation();
  const brewery = location.state;
  const { fromBrewCard } = brewery
  const { name, city, state, country, website_url } = fromBrewCard

  return (
    <div>
      <h1>{name}</h1>
      <p>Rating *****</p>
      <p className='brew-location'>{city}, {state}</p>
      <p className='brew-location'>{country}</p>
      <a href={website_url} target="_blank" rel="noreferrer">{website_url}</a>

      
    </div>
  )
}

export default BreweryPage;