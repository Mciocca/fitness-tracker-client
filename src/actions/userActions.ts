import * as actions from './actionTypes';

export const userAuthenticatedAction = () => {
  return {
    type: actions.USER_AUTHENTICATED
  }
}

export const userAction = (user: object) => {
  return {
    user,
    type: actions.USER
  }
}
