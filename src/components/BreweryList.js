import React from 'react';
import BreweryCard from './BreweryCard';

const BreweryList = ({breweries}) => {
  return (
    <div>
      <div>
        {breweries.map(b => (
          <div>
            {<BreweryCard brewery={b}/>}
            {console.log(b)}
          </div>  
          )
        )}
      </div>
    </div>
  )
}

export default BreweryList;