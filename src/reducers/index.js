import { combineReducers } from "redux";
import userReducer from "./userReducer";
import ratingReducer from "./ratingReducer";
import breweryReducer from "./breweryReducer";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: [
// "userData",
// "ratingData"
//   ],
// };

const rootReducer = combineReducers({
  userData: userReducer,
  ratingData: ratingReducer,
  breweryData: breweryReducer,
});

export default rootReducer;
