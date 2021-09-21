import axios from "axios";
// import filterBreweryRatings from "../lib/filterBreweryRatings";

const SEARCH_URL = `https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search`;
// const BY_DIST_URL = "https://api.openbrewerydb.org/breweries?by_dist";

function BREW_API(url, input) {
  return {
    method: "GET",
    url: url,
    params: { query: input },
    headers: {
      "x-rapidapi-key": "0d5f8f8bb8mshdec6240eba9abb8p130b38jsn82704896f6c0",
      "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com",
    },
  };
}

export const fetchBreweries = (input) => (dispatch) => {
  axios
    .request(BREW_API(SEARCH_URL, input))
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

export const fetchUserLocationBrews = (lat, lng) => (dispatch) => {
  // console.log("Hello from redux");
  axios
    .request(`https://api.openbrewerydb.org/breweries?by_dist=${lat},${lng}`)
    .then((response) => {
      dispatch({
        type: "FETCH_USER_LOCATION_BREWS",
        payload: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
