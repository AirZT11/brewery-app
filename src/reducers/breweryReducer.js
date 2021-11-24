const initialState = {
  breweries: [],
  loading: false,
  userRatedBrews: [],
  mapZoom: 6,
  searchPromptDisplay: "none",
  searchPrompt: "",
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
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SEARCH_REVIEW_PROMPT":
      return {
        ...state,
        searchPromptDisplay: action.payload,
      };
    case "SEARCH_PROMPT":
      return {
        ...state,
        searchPrompt: action.payload,
      };
    default:
      return state;
  }
}
