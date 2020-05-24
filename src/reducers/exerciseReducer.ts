import * as ActionTypes from '../actions/actionTypes';

const defaultState = {};

export default (
  state: object = defaultState,
  action: ActionTypes.ExerciseAction
) => {
  switch (action.type) {
    case ActionTypes.CREATE_EXERCISE_SUCCESS:
      return { ...state, ...action.exercises };

    default:
      return state;
  }
};
