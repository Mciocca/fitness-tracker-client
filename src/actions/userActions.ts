import * as actions from './actionTypes';
import { User } from '../reducers/types';


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
