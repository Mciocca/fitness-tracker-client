import { NotificationSeverity } from '../actions/actionTypes';

export interface User {
  id: number;
  name: string;
  profile: Profile;
  firstName: string;
  lastName: string;
  email: string;
  updateUrl: string;
}

export type Gender = 'Male' | 'Female';
export type FitnessGoals = 'Lose weight' | 'Gain weight' | 'Maintain weight';
export interface Profile {
  age?: number;
  startingWeight?: number;
  goal?: FitnessGoals;
  gender?: Gender;
  height?: number;
  options: {
    gender: string[];
    goals: string[];
  };
}
export interface ConfigurationLinks {
  user_url: string;
  authentication_url: string;
  registration_url: string;
  exercise_url: string;
  workouts_url: string;
}
export interface ConfigurationState {
  links: ConfigurationLinks;
}

export interface UserReducerAction {
  type: string;
  user?: User;
}

export interface UserState extends User {
  errors: string[];
}

export interface UIState {
  loading: boolean;
  notification: {
    message: string | null;
    severity: NotificationSeverity;
  };
}

export interface ExerciseSearchResult {
  id: number;
  name: string;
  muscleGroup: string;
}

export interface Workout {
  date: Date | null;
  title: string;
  notes: string;
  weight?: number;
}

export interface WorkoutSet {
  exceriseId: number;
  reps: number;
  sets: number;
}

export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
}

interface StoreWorkouts extends Workout {
  [key: number]: Workout;
  errors: string[];
}

interface StoreWorkoutSets {
  [key: number]: WorkoutSet;
}

interface StoreExercises {
  [key: number]: Exercise;
}

export interface Store {
  user: UserState;
  ui: UIState;
  config: ConfigurationState;
  workouts: StoreWorkouts;
  workoutSet: StoreWorkoutSets;
  exercise: StoreExercises;
}
