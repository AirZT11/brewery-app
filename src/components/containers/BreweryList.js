import React from 'react';
import BreweryCard from '../BreweryCard';

const BreweryList = ({breweries}) => {
  return (
    <div className='brew-list'>
        {breweries.map(b => (
          <div key={b.name}>
            {/* {console.log(b)} */}
            {<BreweryCard brewery={b}/>}
          </div>  
          )
        )}
    </div>
  )
}

export default BreweryList;