import axios from "axios";
import filterBreweryRatings from "../lib/filterBreweryRatings";

function BREW_API(method, input) {
  return {
    method: method,
    url: `https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search`,
    params: { query: input },
    headers: {
      "x-rapidapi-key": "0d5f8f8bb8mshdec6240eba9abb8p130b38jsn82704896f6c0",
      "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com",
    },
  };
}

export const fetchBreweries = (method, input) => (dispatch) => {
  axios
    .request(BREW_API(method, input))
    .then((response) => {
      // function filters all breweries that dont have a latitude point
      let filteredBrews = response.data.filter((brew) => {
        return brew.latitude !== null;
      });
      dispatch({
        type: "FETCH_BREWERIES",
        payload: filteredBrews,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
