import axios from "axios";
const API_URL = "http://localhost:3001/api/v1";
// const USER_API_URL = API_URL + '/users';
const LOGIN_API_URL = API_URL + "/login";

// TOKEN used for JWT to persist login
const TOKEN = localStorage.getItem("token");

const DEFAULT_LOCATION = {
  lat: 39.5501,
  lng: -105.7821,
};

export const loginUser = (userInputData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: userInputData,
      }),
    })
      .then((resp) => resp.json())
      .then((user) => {
        if (user.error) {
          dispatch({
            type: "LOGIN_FAILED",
            payload: true,
          });
          return reject(false);
        } else {
          localStorage.setItem("token", user.jwt);
          dispatch({
            type: "LOGIN_USER",
            payload: user.user,
          });
          dispatch({
            type: "CLOSE_WELCOME_MODAL",
          });
          return resolve(true);
        }
      });
  });
};

export const fetchCurrentUser = () => (dispatch) => {
  if (TOKEN) {
    fetch(API_URL + "/profile", {
      method: "GET",
      headers: {
        Authentication: `Bearer ${TOKEN}`,
      },
    })
      .then((resp) => resp.json())
      .then((currentUser) => {
        dispatch({
          type: "FETCH_CURRENT_USER",
          payload: currentUser.user,
        });
        dispatch({
          type: "DISPLAY_WELCOME_PAGE",
          payload: false,
        });
      });
  } else {
    console.log("no token available. manually login");
    dispatch({
      type: "DISPLAY_WELCOME_PAGE",
      payload: true,
    });
  }
};

export const getUserLocation = () => (dispatch) => {
  // CB FOR navigator.geolocation.getCurrentPosition
  const locateSuccess = (position) => {
    console.log("locate success");
    dispatch({
      type: "GET_USER_LOCATION",
      payload: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
  };
  // CB FOR navigator.geolocation.getCurrentPosition
  const locateError = () => {
    console.log("locate error");
    dispatch({
      type: "DEFAULT_LOCATION",
      payload: DEFAULT_LOCATION,
    });
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locateSuccess, locateError);
  } else {
    console.log("Use default location");
    dispatch({
      type: "DEFAULT_LOCATION",
      payload: DEFAULT_LOCATION,
    });
  }
};

export const logOut = (bool) => (dispatch) => {
  dispatch({
    type: "LOGOUT",
    payload: bool,
  });
};

export const setPromptView = (type, bool) => (dispatch) => {
  dispatch({
    type: type,
    payload: bool,
  });
};
