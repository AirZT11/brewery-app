import axios from "axios";
const API_URL = "http://localhost:3001/api/v1";
// const USER_API_URL = API_URL + '/users';
const LOGIN_API_URL = API_URL + "/login";

// TOKEN used for JWT to persist login
const TOKEN = localStorage.getItem("token");

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
            payload: user,
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
      .then((user) => {
        dispatch({
          type: "FETCH_CURRENT_USER",
          payload: user,
        });
      });
  } else {
    console.log("no token available. manually login");
    // dispatch({
    //   type: LOADING_USER
    // })
    // go to sign up page or
    // go to login page and make user sign in
  }
};

export const getUserLocation = (locationAvail) => (dispatch) => {
  if (locationAvail) {
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch({
        type: "GET_USER_LOCATION",
        payload: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    });
  } else {
    dispatch({
      type: "GET_USER_LOCATION",
      payload: {
        lat: 39.5501,
        lng: -105.7821,
      },
    });
  }
};

export const logOut = () => (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};

// CAN'T USE STORE FOR LOGINVIEW AS IT APPLIES IT TO EVERY STARRATING COMPONENT...
// export const setLoginView = (boolean) => (dispatch) => {
//   dispatch({
//     type: "SET_LOGIN_VIEW",
//     payload: boolean,
//   });
// };
