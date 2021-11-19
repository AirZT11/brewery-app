const initialState = {
  breweries: [],
  loading: false,
  userRatedBrews: [],
  mapZoom: 6,
  searchReviewPrompt: "none",
};

export default function breweryReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_BREWERIES":
      return {
        ...state,
        breweries: action.payload,
        loading: false,
      };
    case "FETCH_USER_LOCATION_BREWS":
      return {
        ...state,
        breweries: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SEARCH_REVIEW_PROMPT":
      return {
        ...state,
        searchReviewPrompt: action.payload,
      };
    default:
      return state;
  }
}
