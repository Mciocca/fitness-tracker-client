import reducer from '../uiReducer';
import { HIDE_NOTIFICATION } from '../../actions/actionTypes';

describe('UI Reducer', () => {
  it('updates loading state correctly', () => {
    const updatedState  = reducer(undefined, { type:'_BEGIN' });
    expect(updatedState.loading).toBeTruthy();

    const finalState = reducer(updatedState, { type:'_SUCCESS' });
    expect(finalState.loading).toBeFalsy();
  });

  it('updates notifications correctly', () => {
    const notification = { message: 'hello world', severity: 'success' };
    const hiddenNotification = { message: null, severity: 'info' };
    const updateAction = { type: '_SUCCESS', notification };
    const hideAction = { type: HIDE_NOTIFICATION };

    const updatedState = reducer(undefined, updateAction);
    expect(updatedState.notification).toStrictEqual(notification);

    const hiddenState = reducer(updatedState, hideAction);
    expect(hiddenState.notification).toStrictEqual(hiddenNotification);
  });
});
