const initialState = {
  breweries: [],
  loading: false,
  userRatedBrews: [],
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
    // case "GET_USER_RATED_BREWS":
    //   return {
    //     ...state,
    //     userRatedBrews: [
    //       ...state.userRatedBrews,
    //       [action.payload.latitude, action.payload.longitude],
    //     ],
    //   };
    default:
      return state;
  }
}
