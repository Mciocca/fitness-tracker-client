import ui from './uiReducer';
import user from './userReducer';
import config from './configurationReducer';
import { combineReducers } from "redux";

export default combineReducers({
  ui,
  user,
  config
});
