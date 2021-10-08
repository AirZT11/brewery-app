// import axios from "axios";

const RATINGS_API_URL = "http://localhost:3001/api/v1/ratings";
// const TOKEN = localStorage.getItem("token")

export const postRating = (data) => (dispatch) => {
  // console.log(data);
  fetch(RATINGS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      rating: data.rating,
      user_id: data.userId,
      brewery_id: data.breweryId,
      brewery_name: data.breweryName,
      review: data.review,
    }),
  })
    .then((resp) => resp.json())
    .then((rating) => {
      // console.log(rating);
      if (rating.error) {
        alert(rating.error);
      } else {
        dispatch({
          type: "POST_RATING",
          payload: rating.rating,
        });
      }
    });
};

export const getRatings = () => (dispatch) => {
  fetch(RATINGS_API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((ratings) => {
      if (ratings.error) {
        console.log(ratings.error);
      } else {
        // console.log(ratings)
        dispatch({
          type: "GET_RATINGS",
          payload: ratings,
        });
      }
    });
};
