import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../Register';
import AlertMessage from '../../../components/AlertMessage';

describe('Register Page', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('redirects to /dashboard when succesfully creating an account', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'it worked!' }));
    const wrapper = shallow(
      <Register registrationLink="test" history={[]} />
    )
    await wrapper.instance().submit({ preventDefault: () => {} });
    expect(wrapper.update().instance().props.history).toContain('/dashboard');
  });

  it('shows errors when it fails to register', async () => {
    const errors = ['Password is required'];
    fetchMock.mockResponseOnce(JSON.stringify({ errors }), { status: 401 });

    const wrapper = shallow(
      <Register registrationLink="test" history={[]} />
    )

    await wrapper.instance().submit({ preventDefault: () => {} });
    expect(wrapper.find(AlertMessage)).toHaveLength(1);
  });
});
