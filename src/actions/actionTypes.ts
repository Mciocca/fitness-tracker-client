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
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'
export type NotificationSeverity = 'success' | 'info' | 'error';

export interface ShowNotificationAction {
  type: typeof SHOW_NOTIFICATION,
  message: string,
  severity: NotificationSeverity
}

export interface HideNotificationAction {
  type: typeof HIDE_NOTIFICATION
}

export interface ShowLoadingAction {
  type: typeof SHOW_LOADING
}

export interface HideLoadingAction {
  type: typeof HIDE_LOADING
}

export type UiActionTypes = ShowNotificationAction | HideNotificationAction | ShowLoadingAction | HideLoadingAction;

//user
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const UPDATE_USER = 'UPDATE_USER';
export const USER = 'USER';
