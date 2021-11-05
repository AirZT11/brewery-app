const initialState = {
  breweries: [],
  loading: false,
  // autoCompleteBrews: [],
  // searchInput: [],
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
    // case "SEARCH_INPUT":
    //   return {

    //   }
    // case "GET_AUTO_COMPLETE":
    //   return {
    //     ...state,
    //     autoCompleteBrews: action.payload
    //   }
    default:
      return state;
  }
}
