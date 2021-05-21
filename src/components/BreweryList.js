import React from 'react';
import BreweryCard from './BreweryCard';

const BreweryList = ({breweries}) => {
  return (
    <div>
      <div>
        {breweries.map(b => (
          <div>
            {/* {console.log(b)} */}
            {/* {<BreweryCard brewery={b}/>} */}
          </div>  
          )
        )}
      </div>

    </div>
  )
}

export default BreweryList;