import { ConfigurationReducerAction, ConfigurationState } from "./types";
import * as ActionTypes from '../actions/actionTypes';

// TODO: Find a better way of loading links to make typescript happy
const defaultState = {
  links: {
    user_url: '',
    authentication_url: '',
    registration_url: ''
  }
}

export default (state: ConfigurationState=defaultState, action: ConfigurationReducerAction) => {
  switch(action.type) {
     case ActionTypes.RESOURCE_LINKS:
      return {...state, links: action.links}

    default:
      return state;
  }
}

