import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

// all function that will be call wtih the action called,
// user types to determine which one update
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
