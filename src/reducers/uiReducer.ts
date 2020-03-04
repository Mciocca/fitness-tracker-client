import { UIState } from "./types";
import * as ActionTypes from '../actions/actionTypes';

let requestCount = 0;
const defaultState: UIState = {
  loading: false,
  notification: {
    message: null,
    severity: 'info'
  }
};

export default (state: UIState=defaultState, action: any): UIState => {
  const { loading } = getLoadingState(state, action);
  const { notification } = getNotificationState(state, action);

  return { loading, notification };
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


const getNotificationState = (state: UIState, action: any) => {
  const validActionType = action.type.endsWith('_BEGIN') || action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAILURE');

  if (validActionType && action.notification) {
    return { notification: action.notification };
  } else if (action.type === ActionTypes.HIDE_NOTIFICATION) {
    return { notification: { message: null, severity: 'info' }};
  }

  return { notification: state.notification };
}


