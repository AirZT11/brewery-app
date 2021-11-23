import axios from "axios";

const SEARCH_URL = `https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search`;
// const SEARCH_URL = `http://localhost:3001/api/v1/search`;

const alpabetize = (a, b) => {
  return a.id.localeCompare(b.id);
};

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
      let sortedBrews = filteredBrews.sort(alpabetize);
      dispatch({
        type: "FETCH_BREWERIES",
        payload: sortedBrews,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchUserLocationBrews = (lat, lng) => (dispatch) => {
  axios
    .request(`https://api.openbrewerydb.org/breweries?by_dist=${lat},${lng}`)
    .then((response) => {
      let sortedBrews = response.data.sort(alpabetize);
      dispatch({
        type: "FETCH_USER_LOCATION_BREWS",
        payload: sortedBrews,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getUserRatedBrews = (ratings) => (dispatch) => {
  Promise.all(
    ratings.map(async (rating) => {
      const b = await axios.get(
        `https://api.openbrewerydb.org/breweries/${rating.brewery_id}`
      );
      return b;
    })
  ).then((breweries) =>
    dispatch({
      type: "FETCH_BREWERIES",
      payload: breweries.map((b) => b.data).sort(alpabetize),
    })
  );
};
