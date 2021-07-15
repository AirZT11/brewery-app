
const initialState = {
  currentUser: null,
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.payload
      }
    case 'FETCH_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      }
    case 'LOGOUT':
      return initialState
    default:
      return state;
  }
}