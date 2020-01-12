import { UserState, UserReducerAction } from "./types";
import * as ActionTypes from '../actions/actionTypes';

export default (state: UserState={} , action: UserReducerAction) => {
  switch(action.type) {
    case ActionTypes.USER:
      return { ...state, ...action.user };

    case ActionTypes.UPDATE_USER:
      return { ...state, ...action.user }

    default:
      return state;
  }
}
