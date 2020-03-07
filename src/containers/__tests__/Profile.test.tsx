import React from 'react';
import { shallow } from 'enzyme';
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

describe('profile', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    updateUser.mockClear();
  });

  it('dispatches a success notification when updating is succesful', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ user: 'it worked!' }));

    const wrapper = shallow(
      <Profile
        user={user}
        errors={[]}
        updateUser={updateUser}
        loading={false}
      />
    );
    wrapper.find('form').simulate('submit', { preventDefault: () => {}});

    expect(updateUser).toHaveBeenCalledWith(user);
  });
});
