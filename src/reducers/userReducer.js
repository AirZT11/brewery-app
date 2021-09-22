const initialState = {
  currentUser: null,
  locationAvail: false,
  userLocation: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "FETCH_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "IS_LOCATION_AVAIL":
      return {
        ...state,
        locationAvail: "geolocation" in navigator ? true : false,
      };
    case "GET_USER_LOCATION":
      return {
        ...state,
        userLocation: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}
