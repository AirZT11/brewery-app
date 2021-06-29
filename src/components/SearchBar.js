import React from 'react';

// Search input should dynamically load a list of breweries that correspond to what is being typed

const SearchBar = ({handleChange, searchInput, handleSubmit}) => {
  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit} >
        <input className='search-text' type='text' value={searchInput} onChange={handleChange} placeholder='Search Breweries...'/>
        <input type='submit' />
      </form>
    </div>
  )
}

export default SearchBar;