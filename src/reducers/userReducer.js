const initialState = {
  currentUser: null,
  userLocation: { lat: 39.5501, lng: -105.7821 },
  loginFailed: false,
  promptView: false,
  promptMessage: "",
  welcomeView: true,
  signupSuccessful: false,
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
    case "GET_USER_LOCATION":
      return {
        ...state,
        userLocation: action.payload,
      };
    case "DEFAULT_LOCATION":
      return {
        ...state,
        userLocation: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        currentUser: null,
        loginFailed: false,
        promptView: action.payload,
        promptMessage: "Logged Out",
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        loginFailed: action.payload,
      };
    case "LOGGED_IN":
      return {
        ...state,
        promptView: action.payload,
        promptMessage: `Logged In`,
      };
    case "CLOSE_WELCOME_MODAL":
      return {
        ...state,
        welcomeView: false,
      };
    case "SIGNUP_SUCCESSFUL":
      return {
        ...state,
        signupSuccessful: true,
        promptView: action.payload,
        promptMessage: "Sign up successful! Please login",
      };
    default:
      return state;
  }
}
