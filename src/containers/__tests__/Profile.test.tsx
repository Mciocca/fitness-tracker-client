import React from 'react';
import { mount } from 'enzyme';
import { Profile } from '../Profile';

const user = {
  id: 1,
  firstName: 'test',
  lastName: 'user',
  name: 'test user',
  email: 'test@test.com',
  updateUrl: 'fakeurl',
  profile: {
    age: 20,
    startingWeight: 155,
    goal: 'Lose weight',
    gender: 'Male',
    height: 155,
    options: {
     gender: ['Male'],
     goals : ['Lose weight']
    }
  }
}

let showNotificationStub =  jest.fn();
let updateUser = jest.fn();
let showLoading = jest.fn();
let hideLoading = jest.fn();

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('profile', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    showNotificationStub.mockClear();
    updateUser.mockClear();
  });

  it('dispatches a success notification when updating is succesful', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ user: 'it worked!' }));

    const wrapper = mount(
      <Profile
        user={user}
        showNotification={showNotificationStub}
        showLoading={showLoading}
        updateUser={updateUser}
        hideLoading={hideLoading}
        loading={false}
      />
    );
    wrapper.find('form').simulate('submit');

    return flushPromises().then(() => {
      expect(showLoading).toHaveBeenCalled();
      expect(showNotificationStub).toHaveBeenCalledWith('Profile updated!', 'success');
      expect(hideLoading).toHaveBeenCalled();
    });
  });

  // TODO: figure out why I getting error about act() despite enzyme docs saying this should not be an issue
  it('dispatches an error notification when updating fails', () => {
    fetchMock.mockResponseOnce('Bad request', {status: 400});

    const wrapper = mount(
      <Profile
        user={user}
        showNotification={showNotificationStub}
        showLoading={showLoading}
        updateUser={updateUser}
        hideLoading={hideLoading}
        loading={false}
      />
    );

    wrapper.find('form').simulate('submit');

    return flushPromises().then(() => {
      expect(showLoading).toHaveBeenCalled();
      expect(showNotificationStub).toHaveBeenCalledWith('Error updating your profile', 'error');
      expect(hideLoading).toHaveBeenCalled();
    });
  });
});
