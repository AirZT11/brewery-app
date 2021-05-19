import React, { useState, useEffect } from 'react';
import axios from "axios";

const BreweryContainer = (props) => {
  const [breweries, setBreweries] = useState([])

  useEffect(() => {
    fetchBreweries()
  })

  let options = {
    method: 'GET',
    url: 'https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries',
    headers: {
      'x-rapidapi-key': '0d5f8f8bb8mshdec6240eba9abb8p130b38jsn82704896f6c0',
      'x-rapidapi-host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
    }
  };

  let fetchBreweries = () => {
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }


  return (
    <div>
      <p>BreweryContainer</p>
    </div>
  )
}

export default BreweryContainer;