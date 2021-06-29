import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const BreweryCard = ({brewery}) => {

  return (
    <div className='brew-card'>
      {/* {console.log(brewery)} */}
        <Link to={{
          pathname: `brewery/${brewery.id}`,
        }} >
        <strong><p>{brewery.name}</p></strong>
        </Link>

      < StarRating breweryId={brewery.id} breweryName={brewery.name} />
      <p className='brew-location'><i>{brewery.city}</i>, {brewery.state}</p>
      <p className='brew-location'>{brewery.country}</p>
      <p>{urlExist(brewery.website_url)}</p>
      
    </div>
  )
}

const urlExist = (url) => {
  if (url != null) {
    return <a className='brew-website' href={url} target="_blank" rel="noreferrer">link</a>
  }
}
export default BreweryCard;