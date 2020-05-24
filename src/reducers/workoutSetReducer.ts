import * as ActionTypes from '../actions/actionTypes';

const defaultState = {};

export default (
  state: object = defaultState,
  action: ActionTypes.WorkoutSetAction
) => {
  switch (action.type) {
    case ActionTypes.CREATE_WORKOUTSET_SUCCESS:
      return { ...state, ...action.workoutSets };

    default:
      return state;
  }
};
