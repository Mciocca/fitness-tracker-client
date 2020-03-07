import * as actions from './actionTypes';
import { User } from '../reducers/types';
import Request from "../utils/request"

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

export const updateUserAction = (user: User) => {
  return async (dispatch: any) => {
    dispatch({ type: actions.UPDATE_USER_BEGIN });
    try {
      const response = await Request.patch(user.updateUrl, { user });
      dispatch({ type: actions.UPDATE_USER_SUCCESS, user: response, notification: { message: "Update profile succesfully!", severity: 'success'} });
    } catch(errors) {
      dispatch({ type: actions.UPDATE_USER_FAILURE, user, errors: errors.errors, notification: { message: "Error updating your profile", severity: 'error'} });
    }
  }
}
