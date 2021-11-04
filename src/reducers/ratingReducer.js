const initialState = {
  ratings: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RATINGS":
      return {
        ...state,
        ratings: action.payload,
      };
    // POST_RATING populates state.ratings, which triggers
    // => getBreweryRatings(brewery.id, setBreweryRatings)
    // in a useEffect({}, [ratings]) so that StarRating can
    // average the ratings, including the submitted rating
    case "POST_RATING":
      return {
        ...state,
        ratings: [...state.ratings, action.payload],
      };
    default:
      return state;
  }
}
