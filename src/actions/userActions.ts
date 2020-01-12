import * as actions from './actionTypes';
import { User } from '../reducers/types';
import Request from '../utils/request';
import { Dispatch } from 'redux';
import { showLoading, hideLoading } from './uiActions';

export const userAuthenticatedAction = () => {
  return {
    type: actions.USER_AUTHENTICATED
  }
}

export const userAction = (user: User) => {
  return {
    user,
    type: actions.USER
  }
}

export const updateUser = (user: User) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoading());
    try {
      const response = await Request.post(user.updateUrl, { user });
      dispatch({
        user: response.user,
        type: actions.UPDATE_USER
      });
    } catch(error) {
     dispatch({
       error,
       type: actions.ERROR
     });
    } finally {
      dispatch(hideLoading());
    }
  }
}
