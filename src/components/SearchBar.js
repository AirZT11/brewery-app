import React from 'react';

// Search input should dynamically load a list of breweries that correspond to what is being typed

const SearchBar = ({handleChange, searchInput, handleSubmit}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input type='text' value={searchInput} onChange={handleChange}/>
        <input type='submit' />
      </form>
    </div>
  )
}

export default SearchBar;