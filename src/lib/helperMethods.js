import axios from "axios";
import { API_URL } from "../actions/types";

export const getBreweryRatings = (breweryId, stateSetter) => {
  axios
    .request({
      method: "GET",
      url: `${API_URL}/brewery_ratings`,
      params: { brewery_id: breweryId },
    })
    .then((response) => {
      stateSetter(response.data);
    });
};

export const delay = (t, v) => {
  return new Promise(function (resolve) {
    setTimeout(resolve(null, v), t);
  });
};

// export const filterBreweryRatings = (allRatings, breweryId, stateSetter) => {
//   const filteredRatings = allRatings.filter((rating) => {
//     return rating.brewery_id === breweryId;
//   });
//   if (filteredRatings.length > 0) {
//     stateSetter(filteredRatings);
//   }
// };
