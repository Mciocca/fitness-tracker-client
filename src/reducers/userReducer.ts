import { UserState } from "./types";
import * as ActionTypes from '../actions/actionTypes';

export default (state: UserState | {}={} , action: ActionTypes.UserActions) => {
  switch(action.type) {
    case ActionTypes.USER:
      return { ...state, ...action.user };

    case ActionTypes.UPDATE_USER_BEGIN:
      return {...state, errors: [] }

    case ActionTypes.UPDATE_USER_SUCCESS:
      return { ...state, ...action.user }

    case ActionTypes.UPDATE_USER_FAILURE:
      return {...state, errors: action.errors }

    case ActionTypes.CLEAR_ERRORS:
      return {...state, errors: []}

    default:
      return state;
  }
}
