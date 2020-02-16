import * as actions from './actionTypes';

export const showLoading = (): actions.ShowLoadingAction => {
  return { type: actions.SHOW_LOADING };
}

export const hideLoading = (): actions.HideLoadingAction => {
  return { type: actions.HIDE_LOADING };
}

export const showNotification = (message: string, severity: actions.NotificationSeverity) => {
  return {
    type: actions.SHOW_NOTIFICATION,
    message,
    severity
  };
}

export const hideNotification = () => {
  return {
    type: actions.HIDE_NOTIFICATION
  }
}
