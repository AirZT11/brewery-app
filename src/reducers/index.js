import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userData']
}

const rootReducer = combineReducers({
  userData: userReducer,
})

export default persistReducer(persistConfig, rootReducer);