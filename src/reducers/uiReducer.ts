import { UIState } from "./types";
import * as ActionTypes from '../actions/actionTypes';

const defaultState: UIState = {
  showLoading: false,
  showNotification: false,
  notification: {
    message: '',
    severity: 'info'
  }
};

export default (state: UIState=defaultState, action: ActionTypes.UiActionTypes) => {
  switch(action.type) {
    case ActionTypes.SHOW_LOADING:
      return { ...state, showLoading: true };

    case ActionTypes.HIDE_LOADING:
      return { ...state, showLoading: false };

    case ActionTypes.SHOW_NOTIFICATION:
      return {
        ...state,
        showNotification: true,
        notification: {
          message: action.message, severity: action.severity
        }
      };

    case ActionTypes.HIDE_NOTIFICATION:
      return { ...state, showNotification: false };

    default:
      return state;
  }
}
