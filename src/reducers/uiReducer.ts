import { UIReducerAction, UIState } from "./types";
import * as ActionTypes from '../actions/actionTypes';

const defaultState: UIState = {
  showLoading: false,
};

export default (state: UIState=defaultState, action: UIReducerAction) => {
  switch(action.type) {
    case ActionTypes.SHOW_LOADING:
      return { ...state, showLoading: true }

    case ActionTypes.HIDE_LOADING:
      return { ...state, showLoading: false }

    default:
      return state;
  }
}
