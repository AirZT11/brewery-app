import axios from "axios";

export const getBreweryRatings = (breweryId, stateSetter) => {
  axios
    .request({
      method: "GET",
      url: `http://localhost:3001/api/v1/brewery_ratings`,
      params: { brewery_id: breweryId },
    })
    .then((response) => {
      // console.log(response.data);
      stateSetter(response.data);
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
