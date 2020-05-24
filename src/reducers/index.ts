import ui from './uiReducer';
import user from './userReducer';
import config from './configurationReducer';
import workouts from './workoutReducer';
import exercises from './exerciseReducer';
import workoutSets from './workoutSetReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  ui,
  user,
  config,
  workouts,
  exercises,
  workoutSets,
});
