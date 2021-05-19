import React from 'react';
import BreweryCard from './BreweryCard';

const BreweryList = ({breweries}) => {
  return (
    <div>
      <ul>
        {breweries.map(b => (
          <li>
            {<BreweryCard brewery={b}/>}
            {console.log(b)}
          </li>  
        )
        )}
      </ul>
    </div>
  )
}

export default BreweryList;