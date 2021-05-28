import React from 'react';

const BreweryCard = ({brewery: {city, country, id, name, postal_code, state, street, website_url}}) => {
  return (
    <div className='brew-card'>
      <strong><p>{name}</p></strong>
      <p>Rating *****</p>
      <p>{city}, {state}</p>
      <p>{country}</p>
      {urlExist(website_url)}
      
    </div>
  )
}

const urlExist = (url) => {
  if (url != null) {
    return <a href={url}>website</a>
  }
}
export default BreweryCard;