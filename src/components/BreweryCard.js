import React from 'react';
import { Link } from 'react-router-dom';

const BreweryCard = ({brewery: {city, country, id, name, postal_code, state, street, website_url}}) => {
  return (
    <div className='brew-card'>
      
        <Link to={`brewery/${name}`} >
        <strong><p>{name}</p></strong>
        </Link>


      <p>Rating *****</p>
      <p className='brew-location'>{city}, {state}</p>
      <p className='brew-location'>{country}</p>
      <p>{urlExist(website_url)}</p>
      
    </div>
  )
}

const urlExist = (url) => {
  if (url != null) {
    return <a className='brew-website' href={url} target="_blank">link</a>
  }
}
export default BreweryCard;