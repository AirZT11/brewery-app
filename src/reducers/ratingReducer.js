const initialState = {
  ratings: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RATINGS":
      return {
        ...state,
        ratings: action.payload,
      };
    case "POST_RATING":
      return {
        ...state,
        ratings: [...state.ratings, action.payload],
      };
    default:
      return state;
  }
}
