import { UIState } from "./types";
import * as ActionTypes from '../actions/actionTypes';

let requestCount = 0;
const defaultState: UIState = {
  loading: false,
  notification: {
    message: '',
    severity: 'info'
  }
};

export default (state: UIState=defaultState, action: any): UIState => {
  const { loading } = getLoadingState(state, action);
  return { ...state, loading }
}

const getLoadingState = (state: UIState, action: any) => {
  if (action.type.endsWith('_BEGIN')) {
    requestCount++;
  } else if(action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAILURE')) {
    requestCount--;
  }

  state.loading = requestCount > 0;
  return state;
}
