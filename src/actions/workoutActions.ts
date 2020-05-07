import * as actions from './actionTypes';
import Request from '../utils/request';

export const createWorkout = (workoutData: any, url: string) => {
  return async (dispatch: any) => {
    dispatch({ type: actions.CREATE_WORKOUT_BEGIN });
    try {
      const workout = await Request.post(url, { workout: workoutData });
      dispatch({ type: actions.CREATE_WORKOUT_SUCCESS, workout, notification: { message: 'Workout saved', severity: 'success'}});
    } catch (errors) {
      dispatch({ type: actions.CREATE_WORKOUT_FAILURE,  notification: { message: "Error saving workout", severity: 'error'}});
    }
  }
}