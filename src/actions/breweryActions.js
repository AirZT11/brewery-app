import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries',
  headers: {
    'x-rapidapi-key': '0d5f8f8bb8mshdec6240eba9abb8p130b38jsn82704896f6c0',
    'x-rapidapi-host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
  }
};

export const fetchBreweries = dispatch => () => {
  axios.request(options).then(function (response) {
    dispatch({
      type: 'FETCH_BREWERIES',
      payload: response
    });
  }).catch(function (error) {
    console.error(error);
  });
}