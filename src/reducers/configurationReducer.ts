import { ConfigurationState } from "./types";
import * as ActionTypes from '../actions/actionTypes';

const defaultState: ConfigurationState = {
  links: {
    user_url: '',
    authentication_url: '',
    registration_url: '',
    exercise_url: ''
  }
}
export default (state: ConfigurationState=defaultState, action: ActionTypes.ConfigAction) => {
  switch(action.type) {
     case ActionTypes.CONFIGURATION:
      return {...state, ...action.configuration}

    default:
      return state;
  }
}

