import React from 'react';
import { mount } from 'enzyme';
import { Profile } from '../Profile';
import { User } from '../../reducers/types';

const user: User = {
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

let updateUser = jest.fn();

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('profile', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    updateUser.mockClear();
  });

  it('dispatches a success notification when updating is succesful', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ user: 'it worked!' }));

    const wrapper = mount(
      <Profile
        user={user}
        updateUser={updateUser}
        loading={0}
      />
    );
    wrapper.find('form').simulate('submit');

    return flushPromises().then(() => {;
      expect(updateUser).toHaveBeenCalledWith(user);
    });
  });
});
