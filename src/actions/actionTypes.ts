import { User } from '../reducers/types';

// bootstrap
export const CONFIGURATION = 'CONFIGURATION';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export type ClearErrorsAction = { type: typeof CLEAR_ERRORS };
export interface ConfigAction {
  type: typeof CONFIGURATION;
  configuration: any;
}

export const ERROR = 'ERROR';
// ui
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export type NotificationSeverity = 'success' | 'info' | 'error';

export interface ShowNotificationAction {
  type: typeof SHOW_NOTIFICATION;
  message: string;
  severity: NotificationSeverity;
}

export interface HideNotificationAction {
  type: typeof HIDE_NOTIFICATION;
}

export interface ShowLoadingAction {
  type: typeof SHOW_LOADING;
}

export interface HideLoadingAction {
  type: typeof HIDE_LOADING;
}

export type UiActionTypes =
  | ShowNotificationAction
  | HideNotificationAction
  | ShowLoadingAction
  | HideLoadingAction;

//user
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER = 'USER';
export const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export interface UpdateUserAction {
  type:
    | typeof UPDATE_USER_BEGIN
    | typeof UPDATE_USER_SUCCESS
    | typeof UPDATE_USER_FAILURE;
  user: User;
  errors?: string[];
}

export interface UserAction {
  type: typeof USER;
  user: User;
}
export type UserActions = UpdateUserAction | UserAction | ClearErrorsAction;

// workout
export const CREATE_WORKOUT_BEGIN = 'CREATE_WORKOUT_BEGIN';
export const CREATE_WORKOUT_SUCCESS = 'CREATE_WORKOUT_SUCCESS';
export const CREATE_WORKOUT_FAILURE = 'CREATE_WORKOUT_FAILURE';

export interface workoutAction {}

//exercise
export const CREATE_EXERCISE_SUCCESS = 'CREATE_EXERCISE_SUCCESS';

//workoutSet
export const CREATE_WORKOUTSET_SUCCESS = 'CREATE_WORKOUTSET_SUCCESS';
