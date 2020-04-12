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

export type Gender = 'Male' | 'Female';
export type FitnessGoals = 'Lose weight' | 'Gain weight' | 'Maintain weight';
export interface Profile {
  age?: number,
  startingWeight?: number,
  goal?: FitnessGoals,
  gender?: Gender,
  height?: number,
  options: {
    gender: string[],
    goals: string[]
  }
}
export interface ConfigurationLinks {
  user_url: string,
  authentication_url: string,
  registration_url: string,
  exercise_url: string
}
export interface ConfigurationState {
  links: ConfigurationLinks
}

export interface UserReducerAction {
  type: string,
  user?: User
}

export interface UserState extends User {
  errors: string[]
}

export interface UIState {
  loading: boolean,
  notification: {
    message: string | null,
    severity: NotificationSeverity
  }
}

export interface ExerciseSearchResult {
  value: number,
  label: string,
  muscleGroup: string
}

export interface Store  {
  user: UserState,
  ui: UIState
  config: ConfigurationState
}

