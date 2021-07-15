
const API_URL = 'http://localhost:3001/api/v1';
// const USER_API_URL = API_URL + '/users';
const LOGIN_API_URL = API_URL + '/login'

// TOKEN used for JWT to persist login
const TOKEN = localStorage.getItem("token")

export const loginUser = (userInputData) => dispatch => {
  fetch(LOGIN_API_URL, {
    method: "POST",
    headers:  {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      user: userInputData
    })
  })
  .then(resp => resp.json())
  .then(user => { 
    if (user.error) {
      alert(user.error)
      // dispatch({
      //   type: LOGIN_FAILED,
      //   payload: user.error
      // })
    } else {
      localStorage.setItem("token", user.jwt)
      dispatch({
        type: 'LOGIN_USER',
        payload: user
      })
    }
  })
}

export const fetchCurrentUser = () => dispatch => {
  if(TOKEN) {
    fetch(API_URL + '/profile', {
      method: "GET",
      headers: {
        "Authentication": `Bearer ${TOKEN}`
      }
    })
    .then(resp => resp.json())
    .then(user => {
      dispatch({
        type: 'FETCH_CURRENT_USER',
        payload: user
      })
    }) 
  } else {
    console.log('no token available. manually login')
    // dispatch({
    //   type: LOADING_USER
    // })
    // go to sign up page or
    // go to login page and make user sign in
  }
}

export const logOut = () => dispatch => {
  dispatch({
    type: 'LOGOUT'
  })
}