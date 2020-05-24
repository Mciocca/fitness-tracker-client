import * as actions from './actionTypes';
import Request from '../utils/request';
import { normalize } from 'normalizr';
import * as schema from './schema';

export const createWorkout = (workoutData: any, url: string) => {
  return async (dispatch: any) => {
    dispatch({ type: actions.CREATE_WORKOUT_BEGIN });
    try {
      const workout = await Request.post(url, { workout: workoutData });
      const normalized = normalize(workout, schema.workout) as any;
      dispatchCreateActions(normalized.entities, dispatch);
    } catch ({ errors }) {
      dispatch({
        type: actions.CREATE_WORKOUT_FAILURE,
        errors,
        notification: { message: 'Error saving workout', severity: 'error' },
      });
    }
  };
};

const dispatchCreateActions = (
  {
    workout,
    workoutSet,
    exercise,
  }: { workout: object; workoutSet: object; exercise: object },
  dispatch: any
) => {
  dispatch({
    type: actions.CREATE_WORKOUT_SUCCESS,
    workouts: workout,
    notification: { message: 'Workout saved', severity: 'success' },
  });
  dispatch({
    type: actions.CREATE_EXERCISE_SUCCESS,
    exercises: exercise,
  });
  dispatch({
    type: actions.CREATE_WORKOUTSET_SUCCESS,
    workoutSets: workoutSet,
  });
};
