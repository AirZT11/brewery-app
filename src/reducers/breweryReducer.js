const initialState = {
  breweries: [],
  loading: false,
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
    default:
      return state;
  }
}
