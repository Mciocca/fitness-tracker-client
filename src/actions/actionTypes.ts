// bootstrap
export const CONFIGURATION = 'CONFIGURATION';
export interface ConfigAction {
  type: typeof CONFIGURATION,
  configuration: any
}

export const ERROR = 'ERROR';
// ui
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

//user
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const UPDATE_USER = 'UPDATE_USER';
export const USER = 'USER';
