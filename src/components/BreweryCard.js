import React from 'react';

const BreweryCard = ({brewery: {city, country, id, name, postal_code, state, street, website_url}}) => {
  return (
    <div className='brew-card'>
      <p>{name}</p>
      <p>Rating *****</p>
      <p>{city}, {state}</p>
      <p>{country}</p>
      {urlExist(website_url)}
      
    </div>
  )
}

const urlExist = (url) => {
  if (url != null) {
    return <a href={url}>link</a>
  }
}
export default BreweryCard;