import * as ActionTypes from '../actions/actionTypes';

const defaultState = {
  errors: [],
};

export default (
  state: object = defaultState,
  action: ActionTypes.WorkoutAction
) => {
  switch (action.type) {
    case ActionTypes.CREATE_WORKOUT_SUCCESS:
      return { ...state, ...action.workouts };

    case ActionTypes.CREATE_WORKOUT_FAILURE:
      return { ...state, errors: action.errors };

    case ActionTypes.CLEAR_ERRORS:
      return { ...state, errors: [] };

    default:
      return state;
  }
};
