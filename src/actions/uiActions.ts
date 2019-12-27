import * as actions from './actionTypes';

export const showLoading = () => {
  return { type: actions.SHOW_LOADING }
}

export const hideLoading = () => {
  return { type: actions.HIDE_LOADING }
}
