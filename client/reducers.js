/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import auth from './modules/Auth/AuthReducer';
import profile from './modules/Profile/ProfileReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  auth,
  profile,
});
