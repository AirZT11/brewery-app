

const initialState = {
  breweries: [],
}

export default function breweryReducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_BREWERIES':
      return {
        ...state,
        breweries: action.payload
      }
    default: return initialState
  }
}