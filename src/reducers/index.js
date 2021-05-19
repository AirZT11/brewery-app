import { combineReducers } from 'redux';
import breweryReducer from './breweryReducer';

export default combineReducers({
  breweryData: breweryReducer
})