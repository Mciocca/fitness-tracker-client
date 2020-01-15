import { NotificationSeverity } from '../actions/actionTypes';

export interface User {
  id: number,
  name: string,
  profile: Profile,
  firstName: string,
  lastName: string,
  email: string,
  updateUrl: string
}

export interface Profile {
  age?: number,
  startingWeight?: number,
  goal?: string,
  gender?: string,
  height?: number,
  options: {
    gender: string[],
    goals: string[]
  }
}
export interface ConfigurationLinks {
  user_url: string,
  authentication_url: string,
  registration_url: string
}

export interface ConfigurationState {
  links: ConfigurationLinks
}

export interface UserReducerAction {
  type: string,
  user?: User
}

export interface UserState {
  user?: User
}

export interface UIState {
  showLoading: boolean,
  showNotification: boolean,
  notification: {
    message: string,
    severity: NotificationSeverity
  }
}

export interface Store  {
  user: User,
  ui: UIState
  config: ConfigurationState
}
